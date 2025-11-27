# Setup Checklist - Kontraktify

Daftar lengkap hal-hal yang perlu dilakukan untuk setup Kontraktify, terutama di Supabase.

## 📋 1. Database Setup (Supabase)

### 1.1 Jalankan SQL Scripts (Urutan Penting!)

Jalankan script berikut di **Supabase SQL Editor** (Dashboard → SQL Editor) **dalam urutan ini**:

#### Step 1: User ID Column untuk E-Signature
```sql
-- File: sign/add-user-id-column.sql
```
**Apa yang dilakukan:** Menambahkan kolom `user_id` ke tabel `envelopes` dan setup RLS policies untuk user-based access.

#### Step 2: Signature Data Columns
```sql
-- File: sign/add-signature-data-column.sql
```
**Apa yang dilakukan:** Menambahkan kolom untuk menyimpan signature data dan final PDF URLs.

#### Step 3: Unified Dashboard Schema
```sql
-- File: sign/database-unified-schema.sql
```
**Apa yang dilakukan:** Membuat tabel `template_purchases` dan `compare_history` untuk tracking semua aktivitas user.

#### Step 4: Fix RLS Policies (Jika ada masalah)
```sql
-- File: sign/fix-rls-policies-aggressive.sql
```
**Apa yang dilakukan:** Memastikan semua RLS policies bekerja dengan benar. **Jalankan ini hanya jika ada error "row-level security policy"**.

---

## 🔐 2. Authentication Setup (Supabase)

### 2.1 Enable Email/Password Auth
1. Buka **Supabase Dashboard** → **Authentication** → **Providers**
2. Pastikan **Email** provider sudah **Enabled**
3. **Settings:**
   - ✅ Enable email confirmations: **OFF** (untuk development) atau **ON** (untuk production)
   - ✅ Secure email change: Sesuai kebutuhan

### 2.2 Setup OAuth Providers (Optional - untuk Google/Facebook Login)

#### Google OAuth:
1. **Buat Google OAuth Credentials:**
   - Buka [Google Cloud Console](https://console.cloud.google.com/)
   - Buat project baru atau pilih project yang ada
   - Buka **APIs & Services** → **Credentials**
   - Klik **Create Credentials** → **OAuth client ID**
   - Pilih **Web application**
   - Tambahkan **Authorized redirect URIs:**
     ```
     https://[YOUR-SUPABASE-PROJECT-REF].supabase.co/auth/v1/callback
     ```
     (Ganti `[YOUR-SUPABASE-PROJECT-REF]` dengan project reference Anda)
   - Copy **Client ID** dan **Client Secret**

2. **Setup di Supabase:**
   - Buka Supabase Dashboard → **Authentication** → **Providers**
   - Enable **Google** provider
   - Paste **Client ID** dan **Client Secret**
   - Save

#### Facebook OAuth:
1. **Buat Facebook App:**
   - Buka [Facebook Developers](https://developers.facebook.com/)
   - Klik **My Apps** → **Create App**
   - Pilih **Consumer** sebagai app type
   - Tambahkan **Facebook Login** product
   - Di **Settings** → **Basic**, tambahkan:
     - **App Domains**: `supabase.co`
     - **Privacy Policy URL**: (URL privacy policy Anda)
     - **Terms of Service URL**: (URL terms Anda)
   - Di **Settings** → **Facebook Login** → **Settings**, tambahkan:
     - **Valid OAuth Redirect URIs**:
       ```
       https://[YOUR-SUPABASE-PROJECT-REF].supabase.co/auth/v1/callback
       ```
   - Copy **App ID** dan **App Secret**

2. **Setup di Supabase:**
   - Buka Supabase Dashboard → **Authentication** → **Providers**
   - Enable **Facebook** provider
   - Paste **App ID** dan **App Secret**
   - Save

---

## 📧 3. Email Setup (Supabase Edge Functions)

### 3.1 Install Supabase CLI
```bash
npm install -g supabase
```

### 3.2 Login ke Supabase
```bash
supabase login
```

### 3.3 Link Project
```bash
cd kontraktify/sign
supabase link --project-ref [YOUR-PROJECT-REF]
```

### 3.4 Setup Resend API Key
1. Daftar di [Resend](https://resend.com/) dan dapatkan API Key
2. Set environment variable:
```bash
supabase secrets set RESEND_API_KEY=your_resend_api_key_here
```

### 3.5 Deploy Edge Function
```bash
supabase functions deploy send-email
```

**File yang digunakan:** `sign/supabase/functions/send-email/index.ts`

**Detail lengkap:** Lihat file `sign/EMAIL_SETUP.md`

---

## 🗄️ 4. Storage Setup (Supabase)

### 4.1 Buat Storage Bucket
1. Buka **Supabase Dashboard** → **Storage**
2. Klik **New bucket**
3. Buat bucket dengan nama: **`documents`**
4. **Settings:**
   - ✅ Public bucket: **OFF** (private)
   - ✅ File size limit: Sesuai kebutuhan (default: 50MB)
   - ✅ Allowed MIME types: `application/pdf`, `image/*`

### 4.2 Setup Storage Policies
Jalankan di **SQL Editor**:

```sql
-- Allow authenticated users to upload files
CREATE POLICY "Users can upload their own files"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Allow users to read their own files
CREATE POLICY "Users can read their own files"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Allow users to update their own files
CREATE POLICY "Users can update their own files"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Allow users to delete their own files
CREATE POLICY "Users can delete their own files"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);
```

---

## 🔧 5. Environment Variables

### 5.1 Supabase Config
Pastikan file `sign/js/config.js` sudah benar:

```javascript
const SUPABASE_URL = 'https://[YOUR-PROJECT-REF].supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key-here';
```

**Cara mendapatkan:**
1. Buka **Supabase Dashboard** → **Settings** → **API**
2. Copy **Project URL** → paste ke `SUPABASE_URL`
3. Copy **anon/public key** → paste ke `SUPABASE_ANON_KEY`

---

## ✅ 6. Testing Checklist

Setelah semua setup selesai, test hal berikut:

### 6.1 Authentication
- [ ] User bisa register dengan email/password
- [ ] User bisa login dengan email/password
- [ ] User bisa login dengan Google (jika sudah setup)
- [ ] User bisa login dengan Facebook (jika sudah setup)
- [ ] User bisa logout
- [ ] Navigation menampilkan "Dashboard" saat sudah login
- [ ] Navigation menampilkan "Log In" saat belum login

### 6.2 E-Signature
- [ ] User bisa upload PDF di `create.html`
- [ ] User bisa menambahkan signers
- [ ] User bisa menambahkan signature fields
- [ ] User bisa generate links
- [ ] Email terkirim dengan links (jika email sudah setup)
- [ ] Signer bisa sign dokumen
- [ ] Signature muncul di PDF
- [ ] PDF bisa di-download dengan signature yang sudah di-flatten
- [ ] Dashboard menampilkan e-signature documents

### 6.3 Templates
- [ ] User bisa browse templates
- [ ] User bisa purchase template (simpan ke `template_purchases`)
- [ ] Dashboard menampilkan template purchases

### 6.4 Compare
- [ ] User bisa compare 2 dokumen
- [ ] Hasil compare tersimpan ke `compare_history`
- [ ] Dashboard menampilkan compare history

---

## 🐛 7. Troubleshooting

### Error: "new row violates row-level security policy"
**Solusi:** Jalankan `sign/fix-rls-policies-aggressive.sql`

### Error: "relation 'template_purchases' does not exist"
**Solusi:** Jalankan `sign/database-unified-schema.sql`

### Error: "relation 'history_tokens' does not exist"
**Solusi:** Pastikan sudah menjalankan semua SQL scripts dalam urutan yang benar

### Email tidak terkirim
**Solusi:** 
1. Pastikan Edge Function sudah di-deploy
2. Pastikan `RESEND_API_KEY` sudah di-set
3. Check logs di Supabase Dashboard → Edge Functions → send-email → Logs

### Upload file gagal
**Solusi:**
1. Pastikan storage bucket sudah dibuat
2. Pastikan storage policies sudah di-setup
3. Check browser console untuk error details

---

## 📝 8. Next Steps (Untuk Developer)

Setelah semua setup selesai, perlu integrasi:

1. **Template Purchase Integration:**
   - Saat user membeli template, simpan ke `template_purchases` table
   - Gunakan `user_id` dari session

2. **Compare History Integration:**
   - Saat user compare dokumen, simpan ke `compare_history` table
   - Gunakan `user_id` dari session

3. **Email Notifications:**
   - Pastikan email terkirim saat:
     - Document links generated
     - Document signed
     - Document completed

---

## 📚 File References

- Database Schema: `sign/database-unified-schema.sql`
- User ID Setup: `sign/add-user-id-column.sql`
- Signature Data: `sign/add-signature-data-column.sql`
- RLS Fix: `sign/fix-rls-policies-aggressive.sql`
- Email Setup: `sign/EMAIL_SETUP.md`
- OAuth Setup: `sign/OAUTH_SETUP.md`

---

**Catatan:** 
- Ganti semua `[YOUR-PROJECT-REF]` dengan project reference Supabase Anda
- Ganti semua `[YOUR-SUPABASE-PROJECT-REF]` dengan project reference Supabase Anda
- Untuk production, pastikan semua security settings sudah benar

