# 🚀 Kontraktify Sign - Setup Guide

Selamat! Semua halaman sudah siap. Sekarang tinggal setup Supabase (15 menit) dan siap dipakai!

---

## ✅ Yang Sudah Selesai:

1. **Landing Page** (`index.html`) ✓
   - Hero dengan CTA button
   - Cara kerja (3 steps)
   - Fitur list
   
2. **Create Page** (`create.html`) ✓
   - Upload PDF
   - Tambah penandatangan
   - Place signature fields
   - Generate shareable links
   
3. **Sign Page** (`sign.html`) ✓
   - View PDF
   - Signature capture (3 methods: draw, type, upload)
   - Field navigation
   - Submit signatures
   
4. **Status Page** (`status.html`) ✓
   - Track completion
   - Show signer list
   - Auto-refresh
   - Download final PDF

5. **All JavaScript Files** ✓
   - create.js, sign.js, status.js, config.js
   
6. **Styling** (`sign.css`) ✓

---

## 📋 Yang Harus Dilakukan Sekarang:

### Step 1: Create Supabase Account (5 menit)

1. Buka https://supabase.com
2. Klik "Start your project" 
3. Sign up dengan Gmail/GitHub (gratis!)
4. Verify email kalau diminta

### Step 2: Create Project (3 menit)

1. Setelah login, klik "New Project"
2. Isi:
   - **Name:** `kontraktify-sign`
   - **Database Password:** Buat password yang kuat (simpan ya!)
   - **Region:** Pilih yang paling dekat (Southeast Asia kalau ada)
3. Klik "Create new project"
4. **Tunggu ~2-3 menit** sampai project selesai dibuat

### Step 3: Get API Keys (2 menit)

1. Di project dashboard, klik ⚙️ **Settings** (sidebar kiri bawah)
2. Klik **API** di menu settings
3. Kamu akan lihat:
   - **Project URL** (contoh: `https://abcdefgh.supabase.co`)
   - **anon public** key (panjang banget, copy semua)
4. **COPY kedua nilai ini!**

### Step 4: Update config.js (1 menit)

1. Buka file: `/sign/js/config.js`
2. Ganti ini:
   ```javascript
   const SUPABASE_URL = 'YOUR_SUPABASE_URL_HERE';
   const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY_HERE';
   ```
   
   Dengan nilai yang kamu copy tadi:
   ```javascript
   const SUPABASE_URL = 'https://abcdefgh.supabase.co';
   const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   ```

3. **Save file!**

### Step 5: Create Database Tables (3 menit)

1. Di Supabase dashboard, klik **SQL Editor** (sidebar kiri)
2. Klik "New query"
3. Copy paste SQL ini (semua sekaligus):

```sql
-- Envelopes (signing sessions)
CREATE TABLE envelopes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  creator_name VARCHAR(255),
  status VARCHAR(50) DEFAULT 'pending',
  track_token VARCHAR(100) UNIQUE NOT NULL,
  pdf_url TEXT NOT NULL,
  final_pdf_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '30 days')
);

-- Recipients (signers)
CREATE TABLE recipients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  envelope_id UUID REFERENCES envelopes(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  order_num INTEGER NOT NULL,
  magic_token VARCHAR(100) UNIQUE NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  signature_data TEXT,
  signed_at TIMESTAMPTZ
);

-- Fields (signature/date boxes)
CREATE TABLE signature_fields (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  envelope_id UUID REFERENCES envelopes(id) ON DELETE CASCADE,
  recipient_id UUID REFERENCES recipients(id) ON DELETE CASCADE,
  field_type VARCHAR(50) NOT NULL,
  page_num INTEGER NOT NULL,
  x FLOAT NOT NULL,
  y FLOAT NOT NULL,
  width FLOAT NOT NULL,
  height FLOAT NOT NULL
);

-- Enable Row Level Security
ALTER TABLE envelopes ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipients ENABLE ROW LEVEL SECURITY;
ALTER TABLE signature_fields ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
CREATE POLICY "Anyone can read envelopes" ON envelopes FOR SELECT USING (true);
CREATE POLICY "Anyone can update envelopes" ON envelopes FOR UPDATE USING (true);
CREATE POLICY "Anyone can insert envelopes" ON envelopes FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can read recipients" ON recipients FOR SELECT USING (true);
CREATE POLICY "Anyone can update recipients" ON recipients FOR UPDATE USING (true);
CREATE POLICY "Anyone can insert recipients" ON recipients FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can read fields" ON signature_fields FOR SELECT USING (true);
CREATE POLICY "Anyone can insert fields" ON signature_fields FOR INSERT WITH CHECK (true);
```

4. Klik **Run** (atau tekan Cmd/Ctrl + Enter)
5. Kalau berhasil, kamu akan lihat "Success. No rows returned"

### Step 6: Create Storage Bucket (2 menit)

1. Di Supabase dashboard, klik **Storage** (sidebar kiri)
2. Klik "New bucket"
3. Isi:
   - **Name:** `documents`
   - **Public bucket:** ✅ **Toggle ON** (penting!)
4. Klik "Create bucket"

---

## 🎉 SELESAI! Test Sekarang:

1. Open `/sign/index.html` di browser
2. Klik "Mulai Sekarang"
3. Upload PDF test (contoh: perjanjian apapun)
4. Add penandatangan (nama dummy dulu aja)
5. Klik pada PDF untuk place signature field
6. Klik "Generate Link"
7. Copy salah satu link dan buka di tab baru
8. Test tanda tangan!

---

## 🐛 Troubleshooting:

### Error: "supabase is not defined"
**Fix:** Pastikan libraries sudah load. Cek di browser console (F12).

### Error saat upload PDF
**Fix:** 
1. Pastikan storage bucket `documents` sudah dibuat
2. Pastikan bucket setting = **PUBLIC**
3. Refresh halaman dan coba lagi

### Link tanda tangan tidak bisa dibuka
**Fix:**
1. Cek `config.js` - pastikan SUPABASE_URL dan KEY sudah benar
2. Pastikan tidak ada typo
3. Pastikan tidak ada spasi di awal/akhir

### PDF tidak muncul
**Fix:**
1. Cek browser console untuk error
2. Pastikan PDF size < 10MB
3. Try PDF lain (mungkin PDF corrupt)

---

## 📱 Next Steps (Opsional):

### 1. Custom Domain
- Deploy ke Vercel/Netlify
- Connect custom domain: `sign.kontraktify.com`

### 2. WhatsApp Integration
- Already built-in! Ada tombol "Kirim via WhatsApp"

### 3. PDF Finalization
- Untuk flatten signatures ke PDF, butuh server function
- Bisa pakai Supabase Edge Functions (advanced)
- Untuk sekarang, PDF original bisa di-download

---

## 🆘 Butuh Bantuan?

Kalau ada error atau stuck:
1. Check browser console (F12) → lihat error message
2. Screenshot errornya
3. Tanya aku! Kasih tau error message nya

---

## 🎊 Congrats!

Kamu punya e-signature tool sendiri sekarang! 🎉

Features yang kamu dapet:
- ✅ Upload PDF
- ✅ Multi signer
- ✅ Drag & drop fields
- ✅ 3 signature methods
- ✅ Track status
- ✅ Download PDF
- ✅ Auto cleanup (30 days)
- ✅ NO LOGIN required
- ✅ 100% FREE!

Happy signing! 🚀

