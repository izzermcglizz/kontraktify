# Setup OAuth Login (Google & Facebook) - Kontraktify

Panduan lengkap untuk setup login dengan Google dan Facebook di Supabase.

## 📋 Prerequisites

- Akun Supabase dengan project yang sudah dibuat
- Akun Google (untuk Google OAuth)
- Akun Facebook Developer (untuk Facebook OAuth)

---

## 🔵 1. Setup Google OAuth

### Step 1: Buat OAuth Credentials di Google Cloud Console

1. **Buka Google Cloud Console**
   - Kunjungi: https://console.cloud.google.com/
   - Login dengan akun Google Anda

2. **Buat atau Pilih Project**
   - Klik dropdown project di atas
   - Klik **"New Project"** atau pilih project yang sudah ada
   - Beri nama project (contoh: "Kontraktify OAuth")
   - Klik **"Create"**

3. **Enable Google+ API**
   - Di sidebar, buka **"APIs & Services"** → **"Library"**
   - Cari **"Google+ API"** atau **"Google Identity"**
   - Klik dan pilih **"Enable"**

4. **Buat OAuth 2.0 Credentials**
   - Buka **"APIs & Services"** → **"Credentials"**
   - Klik **"+ CREATE CREDENTIALS"** → **"OAuth client ID"**
   - Jika diminta, pilih **"Configure consent screen"**:
     - **User Type**: Pilih **"External"** (kecuali punya Google Workspace)
     - Klik **"Create"**
     - **App name**: "Kontraktify" (atau nama aplikasi Anda)
     - **User support email**: Email Anda
     - **Developer contact information**: Email Anda
     - Klik **"Save and Continue"**
     - **Scopes**: Klik **"Save and Continue"** (default sudah cukup)
     - **Test users**: Skip untuk sekarang, klik **"Save and Continue"**
     - Klik **"Back to Dashboard"**

5. **Buat OAuth Client ID**
   - Kembali ke **"Credentials"** → **"+ CREATE CREDENTIALS"** → **"OAuth client ID"**
   - **Application type**: Pilih **"Web application"**
   - **Name**: "Kontraktify Web Client"
   - **Authorized JavaScript origins**: Tambahkan:
     ```
     https://[YOUR-SUPABASE-PROJECT-REF].supabase.co
     ```
     (Ganti `[YOUR-SUPABASE-PROJECT-REF]` dengan project reference Anda)
     - Contoh: `https://pkujwqglpqbfpmspzwhw.supabase.co`
   
   - **Authorized redirect URIs**: Tambahkan:
     ```
     https://[YOUR-SUPABASE-PROJECT-REF].supabase.co/auth/v1/callback
     ```
     - Contoh: `https://pkujwqglpqbfpmspzwhw.supabase.co/auth/v1/callback`
   
   - Klik **"Create"**
   - **Copy Client ID dan Client Secret** (simpan dengan aman!)

### Step 2: Setup di Supabase Dashboard

1. **Buka Supabase Dashboard**
   - Login ke: https://supabase.com/dashboard
   - Pilih project Anda

2. **Enable Google Provider**
   - Buka **"Authentication"** → **"Providers"**
   - Scroll ke **"Google"**
   - Toggle **"Enable Google provider"** menjadi **ON**

3. **Masukkan Credentials**
   - **Client ID (for OAuth)**: Paste Client ID dari Google Cloud Console
   - **Client Secret (for OAuth)**: Paste Client Secret dari Google Cloud Console
   - Klik **"Save"**

4. **Test Google Login**
   - Buka aplikasi Anda
   - Klik tombol "Login with Google"
   - Seharusnya redirect ke Google login page
   - Setelah login, redirect kembali ke aplikasi

---

## 🔵 2. Setup Facebook OAuth

### Step 1: Buat Facebook App

1. **Buka Facebook Developers**
   - Kunjungi: https://developers.facebook.com/
   - Login dengan akun Facebook Anda

2. **Buat App Baru**
   - Klik **"My Apps"** → **"Create App"**
   - Pilih **"Consumer"** sebagai app type
   - Klik **"Next"**
   - **App Name**: "Kontraktify" (atau nama aplikasi Anda)
   - **App Contact Email**: Email Anda
   - **Business Account**: (Opsional, bisa skip)
   - Klik **"Create App"**

3. **Add Facebook Login Product**
   - Di dashboard app, cari **"Facebook Login"**
   - Klik **"Set Up"**
   - Pilih **"Web"** sebagai platform
   - **Site URL**: 
     ```
     https://[YOUR-SUPABASE-PROJECT-REF].supabase.co
     ```
     - Contoh: `https://pkujwqglpqbfpmspzwhw.supabase.co`
   - Klik **"Save"**

4. **Configure Settings**
   - Di sidebar, buka **"Settings"** → **"Basic"**
   - **App Domains**: Tambahkan:
     ```
     supabase.co
     ```
   - **Privacy Policy URL**: (URL privacy policy Anda, atau bisa dummy dulu)
     ```
     https://yourdomain.com/privacy
     ```
   - **Terms of Service URL**: (URL terms Anda, atau bisa dummy dulu)
     ```
     https://yourdomain.com/terms
     ```
   - **User Data Deletion**: (Opsional)
   - Klik **"Save Changes"**

5. **Configure Facebook Login Settings**
   - Di sidebar, buka **"Facebook Login"** → **"Settings"**
   - **Valid OAuth Redirect URIs**: Tambahkan:
     ```
     https://[YOUR-SUPABASE-PROJECT-REF].supabase.co/auth/v1/callback
     ```
     - Contoh: `https://pkujwqglpqbfpmspzwhw.supabase.co/auth/v1/callback`
   - Klik **"Save Changes"**

6. **Get App ID dan App Secret**
   - Di **"Settings"** → **"Basic"**
   - **App ID**: Copy (ini adalah Client ID)
   - **App Secret**: Klik **"Show"** dan copy (ini adalah Client Secret)
   - Simpan dengan aman!

### Step 2: Setup di Supabase Dashboard

1. **Buka Supabase Dashboard**
   - Login ke: https://supabase.com/dashboard
   - Pilih project Anda

2. **Enable Facebook Provider**
   - Buka **"Authentication"** → **"Providers"**
   - Scroll ke **"Facebook"**
   - Toggle **"Enable Facebook provider"** menjadi **ON**

3. **Masukkan Credentials**
   - **Client ID (for OAuth)**: Paste App ID dari Facebook
   - **Client Secret (for OAuth)**: Paste App Secret dari Facebook
   - Klik **"Save"**

4. **Test Facebook Login**
   - Buka aplikasi Anda
   - Klik tombol "Login with Facebook"
   - Seharusnya redirect ke Facebook login page
   - Setelah login, redirect kembali ke aplikasi

---

## 🔍 Cara Cari Project Reference Supabase

Project reference ada di:
1. Buka Supabase Dashboard
2. Pilih project Anda
3. Buka **"Settings"** → **"General"**
4. Lihat **"Reference ID"** (contoh: `pkujwqglpqbfpmspzwhw`)

Atau lihat di URL:
```
https://supabase.com/dashboard/project/[PROJECT-REF]
```

---

## ✅ Verifikasi Setup

### Test di Aplikasi:

1. **Google Login**:
   - Buka halaman login
   - Klik "Login with Google"
   - Seharusnya redirect ke Google
   - Setelah login, kembali ke aplikasi dengan user ter-authenticate

2. **Facebook Login**:
   - Buka halaman login
   - Klik "Login with Facebook"
   - Seharusnya redirect ke Facebook
   - Setelah login, kembali ke aplikasi dengan user ter-authenticate

### Troubleshooting:

#### Error: "redirect_uri_mismatch"
**Fix**: 
- Pastikan redirect URI di Google/Facebook **sama persis** dengan:
  ```
  https://[PROJECT-REF].supabase.co/auth/v1/callback
  ```
- Pastikan tidak ada trailing slash atau spasi

#### Error: "App Not Setup"
**Fix (Facebook)**:
- Pastikan Facebook Login product sudah ditambahkan
- Pastikan app sudah dalam mode "Live" atau "Development"
- Untuk development, tambahkan test users di App Dashboard → Roles → Test Users

#### Error: "Invalid Client"
**Fix**:
- Double-check Client ID dan Client Secret
- Pastikan sudah di-copy dengan benar (tidak ada spasi)
- Pastikan credentials sudah di-save di Supabase Dashboard

#### Google: "Error 400: redirect_uri_mismatch"
**Fix**:
- Pastikan Authorized redirect URIs di Google Cloud Console sudah benar
- Format harus: `https://[PROJECT-REF].supabase.co/auth/v1/callback`
- Pastikan tidak ada typo

#### Facebook: "Invalid OAuth Access Token"
**Fix**:
- Pastikan App ID dan App Secret sudah benar
- Pastikan app sudah dalam mode Development atau Live
- Cek apakah Facebook Login product sudah enabled

---

## 🔒 Security Notes

1. **Jangan commit credentials ke Git**
   - Client ID dan Secret hanya di-set di Supabase Dashboard
   - Jangan hardcode di frontend code

2. **Production Setup**
   - Untuk production, pastikan:
     - App sudah verified (Facebook)
     - Domain sudah verified (Google)
     - Privacy Policy dan Terms of Service sudah ada

3. **Test Users (Facebook)**
   - Untuk development, tambahkan test users di Facebook App Dashboard
   - Test users bisa login tanpa app review

---

## 📝 Quick Checklist

### Google OAuth:
- [ ] Project dibuat di Google Cloud Console
- [ ] Google+ API enabled
- [ ] OAuth consent screen configured
- [ ] OAuth client ID dibuat (Web application)
- [ ] Authorized redirect URI ditambahkan
- [ ] Client ID & Secret di-set di Supabase Dashboard
- [ ] Google provider enabled di Supabase

### Facebook OAuth:
- [ ] Facebook App dibuat
- [ ] Facebook Login product ditambahkan
- [ ] App domains & redirect URIs configured
- [ ] Privacy Policy & Terms URLs ditambahkan
- [ ] App ID & Secret di-set di Supabase Dashboard
- [ ] Facebook provider enabled di Supabase

---

## 🎉 Selesai!

Setelah setup, user bisa login dengan:
- ✅ Email/Password
- ✅ Google
- ✅ Facebook

Semua akan tersimpan di Supabase Auth dengan user ID yang sama, jadi data user akan ter-consolidate di satu account!
