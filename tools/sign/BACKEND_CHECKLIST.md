# Backend Setup Checklist - Post SQL Update

Setelah menjalankan `update-draft-support.sql`, cek hal-hal berikut:

## ✅ 1. Database (Sudah Selesai)
- [x] SQL script berhasil dijalankan
- [x] Kolom `user_id`, `status`, `updated_at`, `title`, `track_token` sudah ada
- [x] RLS policies sudah dibuat
- [x] Indexes sudah dibuat

## 🔍 2. Verifikasi Storage Bucket

### Cek di Supabase Dashboard:
1. Buka **Storage** → **Buckets**
2. Pastikan bucket **`documents`** ada
3. Jika belum ada, script sudah membuatnya otomatis
4. Cek **Policies** tab untuk bucket `documents`:
   - ✅ INSERT policy untuk authenticated users
   - ✅ SELECT policy untuk authenticated users
   - ✅ UPDATE policy untuk authenticated users
   - ✅ DELETE policy untuk authenticated users

**Jika policies belum ada**, jalankan bagian storage policies dari script lagi, atau buat manual di Dashboard.

## 📧 3. Email Setup (Optional tapi Recommended)

Untuk fitur "Send for Signature" yang mengirim email otomatis:

### Option A: Setup Resend (Recommended)
1. **Daftar di Resend**: https://resend.com
2. **Dapatkan API Key** dari dashboard
3. **Install Supabase CLI** (jika belum):
   ```bash
   npm install -g supabase
   ```
4. **Login & Link project**:
   ```bash
   supabase login
   supabase link --project-ref YOUR_PROJECT_REF
   ```
   (Project ref bisa dilihat di Supabase Dashboard → Settings → General)
5. **Set API Key**:
   ```bash
   supabase secrets set RESEND_API_KEY=your_resend_api_key_here
   ```
6. **Deploy Edge Function**:
   ```bash
   supabase functions deploy send-email
   ```

### Option B: Skip Email (Fallback)
- Jika tidak setup email, sistem akan menggunakan `mailto:` link sebagai fallback
- User akan mendapat link yang bisa di-copy manual

## 🔐 4. Authentication (Sudah Setup?)

Pastikan:
- [ ] Email/Password auth sudah enabled di Supabase Dashboard → Authentication → Providers
- [ ] OAuth (Google/Facebook) sudah setup jika ingin digunakan (optional)

## 🧪 5. Testing

Setelah semua setup, test:

### Test Draft Functionality:
1. [ ] Login ke aplikasi
2. [ ] Klik "New eSign" di eSign dashboard
3. [ ] Upload PDF dan add recipients
4. [ ] Klik "Next: Add fields"
5. [ ] Add beberapa fields ke dokumen
6. [ ] Klik "Save as Draft"
7. [ ] Cek apakah draft muncul di dashboard dengan status "Draft"
8. [ ] Klik draft untuk melanjutkan editing

### Test Send for Signature:
1. [ ] Setelah add fields, klik "Review & Send"
2. [ ] Klik "Send for Signature"
3. [ ] Cek apakah:
   - Document status berubah jadi "Sent"
   - Email terkirim (jika setup) atau link bisa di-copy
   - Document muncul di "Waiting for signature" di dashboard

## ⚠️ Troubleshooting

### Issue: "Permission denied" saat upload PDF
**Fix**: Cek storage policies untuk bucket `documents`. Pastikan INSERT policy ada untuk authenticated users.

### Issue: Draft tidak muncul di dashboard
**Fix**: 
- Cek apakah `status = 'draft'` di database
- Cek RLS policies untuk SELECT
- Cek browser console untuk error

### Issue: Email tidak terkirim
**Fix**: 
- Cek apakah Edge Function sudah deployed
- Cek apakah `RESEND_API_KEY` sudah di-set
- Cek Supabase Dashboard → Edge Functions → Logs untuk error

### Issue: "user_id is null" error
**Fix**: Pastikan user sudah login sebelum membuat draft. Cek `auth.uid()` di browser console.

## 📝 Quick Verification Query

Jalankan query ini di Supabase SQL Editor untuk verifikasi:

```sql
-- Check columns
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'envelopes'
ORDER BY ordinal_position;

-- Check RLS policies
SELECT tablename, policyname, cmd, roles
FROM pg_policies
WHERE tablename IN ('envelopes', 'recipients', 'signature_fields')
ORDER BY tablename, policyname;

-- Check storage bucket
SELECT name, public, file_size_limit, allowed_mime_types
FROM storage.buckets
WHERE name = 'documents';
```

## ✅ Summary

**Minimum untuk draft functionality:**
- ✅ Database schema (sudah selesai)
- ✅ Storage bucket & policies
- ✅ Authentication enabled

**Optional tapi recommended:**
- 📧 Email sending (Edge Function + Resend)
- 🔐 OAuth providers (Google/Facebook)

Jika semua checklist di atas sudah ✅, backend siap digunakan!

