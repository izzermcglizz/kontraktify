# OAuth Setup Guide (Google & Facebook Login)

Untuk mengaktifkan login dengan Google dan Facebook, Anda perlu setup OAuth providers di Supabase.

## Setup Google OAuth

1. **Buat Google OAuth Credentials:**
   - Buka [Google Cloud Console](https://console.cloud.google.com/)
   - Buat project baru atau pilih project yang ada
   - Buka **APIs & Services** → **Credentials**
   - Klik **Create Credentials** → **OAuth client ID**
   - Pilih **Web application**
   - Tambahkan **Authorized redirect URIs**:
     ```
     https://pkujwqglpqbfpmspzwhw.supabase.co/auth/v1/callback
     ```
   - Copy **Client ID** dan **Client Secret**

2. **Setup di Supabase:**
   - Buka Supabase Dashboard → **Authentication** → **Providers**
   - Enable **Google** provider
   - Paste **Client ID** dan **Client Secret** dari Google Cloud Console
   - Save

## Setup Facebook OAuth

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
       https://pkujwqglpqbfpmspzwhw.supabase.co/auth/v1/callback
       ```
   - Copy **App ID** dan **App Secret**

2. **Setup di Supabase:**
   - Buka Supabase Dashboard → **Authentication** → **Providers**
   - Enable **Facebook** provider
   - Paste **App ID** dan **App Secret** dari Facebook Developers
   - Save

## Testing

Setelah setup, test dengan:
1. Buka `sign/login.html`
2. Klik "Continue with Google" atau "Continue with Facebook"
3. Login dengan akun Google/Facebook Anda
4. Akan redirect ke dashboard setelah login berhasil

## Notes

- Pastikan redirect URI di Google/Facebook sama persis dengan yang di Supabase
- Untuk production, update redirect URI ke domain production Anda
- OAuth akan otomatis create user account jika belum ada

