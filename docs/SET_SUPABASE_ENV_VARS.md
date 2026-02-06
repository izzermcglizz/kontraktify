# Cara Set Environment Variables di Supabase Edge Function

## Error yang Terjadi
```
Error: Environment variables not set
```

Ini berarti Edge Function tidak bisa membaca environment variables yang diperlukan.

## Environment Variables yang Diperlukan

Edge Function `dynamic-service` memerlukan 3 environment variables:

1. **IPAYMU_VA** - Virtual Account number dari iPaymu
2. **IPAYMU_API_KEY** - API Key dari iPaymu
3. **BASE_URL** - Base URL untuk returnUrl dan cancelUrl (opsional, default: https://www.kontraktify.com)

## Cara Set Environment Variables

### Opsi 1: Via Supabase Dashboard (Paling Mudah)

1. **Buka Supabase Dashboard**
   - Login ke https://supabase.com/dashboard
   - Pilih project Anda (`rcjwcgztmlygmnftklge`)

2. **Masuk ke Edge Functions → Settings**
   - Klik **Edge Functions** di sidebar kiri
   - Klik **Settings** (ikon gear)

3. **Tambahkan Secrets**
   - Scroll ke bagian **Secrets**
   - Klik **Add new secret**
   - Tambahkan satu per satu:

   **Secret 1:**
   - Name: `IPAYMU_VA`
   - Value: `1179005776604685`
   - Klik **Add secret**

   **Secret 2:**
   - Name: `IPAYMU_API_KEY`
   - Value: `7FEE44DD-2DFF-42D5-B2CA-81015709A143`
   - Klik **Add secret**

   **Secret 3 (Opsional):**
   - Name: `BASE_URL`
   - Value: `https://www.kontraktify.com`
   - Klik **Add secret**

4. **Deploy Ulang Function**
   - Setelah semua secrets ditambahkan, deploy ulang function:
   - Klik **Edge Functions** → Pilih `dynamic-service`
   - Klik **Deploy** atau **Redeploy**

### Opsi 2: Via Supabase CLI

Jika Anda menggunakan Supabase CLI:

```bash
# Set secrets
supabase secrets set IPAYMU_VA=1179005776604685
supabase secrets set IPAYMU_API_KEY=7FEE44DD-2DFF-42D5-B2CA-81015709A143
supabase secrets set BASE_URL=https://www.kontraktify.com

# Deploy function
supabase functions deploy dynamic-service
```

## Verifikasi

Setelah set environment variables, test lagi payment flow. Error "Environment variables not set" seharusnya sudah hilang.

## Troubleshooting

### Jika masih error:
1. Pastikan semua secrets sudah ditambahkan dengan nama yang benar (case-sensitive)
2. Pastikan function sudah di-deploy ulang setelah set secrets
3. Cek logs di Supabase Dashboard → Edge Functions → Logs untuk detail error

### Cek apakah secrets sudah ter-set:
1. Buka Supabase Dashboard → Edge Functions → Settings
2. Scroll ke bagian **Secrets**
3. Pastikan `IPAYMU_VA`, `IPAYMU_API_KEY`, dan `BASE_URL` sudah ada di list

