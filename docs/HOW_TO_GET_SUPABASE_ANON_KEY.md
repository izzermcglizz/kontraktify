# Cara Mendapatkan Supabase Anon Key

## Langkah-langkah:

### 1. Buka Supabase Dashboard
- Login ke https://supabase.com/dashboard
- Pilih project Anda (yang URL-nya `rcjwcgztmlygmnftklge.supabase.co`)

### 2. Masuk ke Settings → API
- Klik **Settings** (ikon gear) di sidebar kiri
- Pilih **API** dari menu Settings

### 3. Cari "Project API keys"
- Scroll ke bagian **Project API keys**
- Anda akan melihat beberapa key:
  - **anon** `public` - Ini yang Anda butuhkan untuk frontend
  - **service_role** `secret` - Jangan pakai ini di frontend (terlalu berbahaya)

### 4. Copy "anon" key
- Klik tombol **Copy** di sebelah key **anon** `public`
- Key akan terlihat seperti: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJjan...`
- Panjangnya biasanya sekitar 200+ karakter

### 5. Update di payment.js
- Buka file `tools/templates/forms/payment.js`
- Cari baris: `const SUPABASE_ANON_KEY = "..."`
- Paste anon key yang sudah di-copy
- Simpan file

## Catatan Penting:

- **anon key** = untuk frontend (aman dipakai di browser)
- **service_role key** = hanya untuk backend (jangan dipakai di frontend!)
- **publishable key** = biasanya untuk Supabase Auth, bukan untuk Edge Functions

## Alternatif: Nonaktifkan Auth Requirement

Jika tidak ingin pakai anon key, Anda bisa nonaktifkan auth requirement:

1. Buka Supabase Dashboard → Edge Functions
2. Pilih function `dynamic-service`
3. Klik **Settings**
4. Nonaktifkan **"Require Authorization"**
5. Deploy ulang function

## Troubleshooting:

### Jika masih error 401:
1. Pastikan anon key sudah di-copy dengan lengkap (tidak terpotong)
2. Pastikan tidak ada spasi di awal/akhir key
3. Cek console browser (F12) - lihat apakah header `apikey` dikirim
4. Pastikan Edge Function sudah di-deploy dengan benar

### Cek apakah key benar:
- Anon key biasanya dimulai dengan `eyJ...` (JWT format)
- Panjangnya sekitar 200+ karakter
- Bukan `sb_publishable_...` atau `sb_secret_...`

