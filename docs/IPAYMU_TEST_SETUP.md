# Setup Test Payment untuk Verifikasi iPaymu

## 🎯 Tujuan
Halaman ini membantu Anda melakukan test transaksi untuk verifikasi iPaymu.

---

## ✅ Checklist Verifikasi iPaymu

Berdasarkan requirement dari iPaymu:

- [x] Website wajib terintegrasi dengan iPaymu
- [x] Website memiliki produk dan bisa melakukan test transaksi
- [x] Website sudah melengkapi:
  - [x] Syarat & Ketentuan → `/terms.html`
  - [x] Kebijakan Refund → `/refund-policy.html`
  - [x] FAQ → `/faq.html`
- [ ] **IP Website diisi** (optional untuk serverless)
- [ ] **Test transaksi berhasil**

---

## 📋 Step-by-Step Setup

### 1. Set Environment Variables di Supabase

Anda perlu mengisi credentials iPaymu di Supabase Edge Functions:

#### Cara Mengisi:

1. **Login ke Supabase Dashboard**: https://supabase.com/dashboard
2. **Pilih Project**: `rcjwcgztmlygmnftklge` (atau project Kontraktify Anda)
3. **Go to**: Settings → Edge Functions → Secrets/Environment Variables
4. **Tambahkan 3 environment variables berikut**:

```
IPAYMU_VA = 1179005776604685
IPAYMU_API_KEY = 7FEE44DD-2DFF-42D5-B2CA-810157009A143
BASE_URL = https://www.kontraktify.com
```

> ⚠️ **PENTING**: Ganti dengan credentials PRODUCTION iPaymu Anda (bukan sandbox)

#### Screenshot Guide:
```
Supabase Dashboard
└── Settings
    └── Edge Functions
        └── Add Secret
            ├── Name: IPAYMU_VA
            └── Value: [VA dari iPaymu]
```

---

### 2. Deploy Edge Functions

Pastikan Edge Functions sudah di-deploy:

```bash
# Login ke Supabase
npx supabase login

# Link project
npx supabase link --project-ref rcjwcgztmlygmnftklge

# Deploy Edge Functions
npx supabase functions deploy createpayment
npx supabase functions deploy ipaymu-webhook
```

Atau bisa manual deploy melalui:
- **Supabase Dashboard** → Functions → Deploy

---

### 3. Test Payment

Setelah setup selesai, akses halaman test payment:

🔗 **URL**: https://www.kontraktify.com/test-payment.html

#### Test Flow:
1. Buka halaman test payment
2. Isi form (sudah ada default values):
   - Nama: Test Customer
   - Email: test@kontraktify.com
   - Phone: 081234567890
3. Klik "Lanjut ke Pembayaran"
4. Akan redirect ke halaman iPaymu
5. Pilih metode pembayaran (QRIS/Transfer Bank/E-Wallet)
6. Lakukan pembayaran test (Rp 10.000)

---

## 🧪 Cara Verifikasi iPaymu Test Transaksi

### Option 1: Pembayaran Real (Recommended)
- Bayar Rp 10.000 menggunakan QRIS atau e-wallet
- iPaymu akan melihat transaksi sukses di dashboard mereka
- Verifikasi akan disetujui lebih cepat

### Option 2: Screenshot Flow
Jika tidak ingin bayar real, minimal screenshot:
1. Halaman form test payment
2. Halaman redirect ke iPaymu (payment page)
3. Kirim screenshot ke support iPaymu untuk verifikasi

---

## 🔍 Troubleshooting

### Error: "Environment variables not set"
**Solusi:**
- Pastikan IPAYMU_VA dan IPAYMU_API_KEY sudah diisi di Supabase Secrets
- Re-deploy Edge Function setelah menambah environment variables
- Tunggu 1-2 menit setelah deploy

### Error: "Failed to connect to iPaymu"
**Solusi:**
- Check credentials iPaymu (VA & API Key) benar
- Pastikan menggunakan Production credentials (bukan sandbox)
- Cek di iPaymu Dashboard apakah API Key aktif

### Error: "Payment URL not found"
**Solusi:**
- Check logs di Supabase Dashboard → Functions → Logs
- Lihat response dari iPaymu API
- Pastikan semua field required terisi (product, price, buyer email)

### Tidak redirect ke pembayaran
**Solusi:**
1. Buka browser console (F12)
2. Lihat error message di tab Console
3. Check tab Network untuk melihat request/response
4. Screenshot error dan kirim ke support

---

## 📞 Kontak Support

Jika masih ada masalah:

**iPaymu Support:**
- Email: support@ipaymu.com
- WhatsApp: +6281936972473
- Dashboard: https://my.ipaymu.com

**Kontraktify:**
- Check console log di browser (F12)
- Check Supabase Edge Function logs
- Check iPaymu Dashboard → Transactions

---

## 🎉 Setelah Verifikasi Disetujui

Setelah iPaymu menyetujui akun Anda:

1. ✅ Anda bisa menggunakan iPaymu di production
2. ✅ Integrasi sudah siap untuk customer real
3. ⚠️ **Opsional**: Hapus atau hide halaman `/test-payment.html`
4. ✅ Payment sudah terintegrasi di:
   - Template marketplace (`/tools/templates/`)
   - Form-form yang ada

---

## 🔐 Security Notes

⚠️ **JANGAN commit credentials ke Git!**

Credentials hanya disimpan di:
- Supabase Environment Variables (aman ✅)
- File config dengan encoding base64 (kurang aman, sebaiknya pindah ke Supabase Secrets)

Setelah verifikasi selesai:
- Rotate API Key secara berkala
- Monitor transaksi di iPaymu Dashboard
- Setup webhook alerts

---

## 📝 Catatan Penting

1. **Halaman test-payment.html** dibuat khusus untuk verifikasi iPaymu
2. Setelah verifikasi selesai, bisa dihapus atau disembunyikan
3. Payment integration sudah ada di halaman template marketplace
4. Webhook sudah di-setup untuk handle payment notifications
5. Proses verifikasi iPaymu: **2 hari kerja**

---

## ✨ Next Steps

Setelah test payment berhasil:

1. 📧 Cek email dari iPaymu untuk konfirmasi verifikasi
2. 📱 Jika 2 hari tidak ada kabar, hubungi support iPaymu
3. 🎯 Setelah approved, test real payment di template marketplace
4. 🚀 Launch! Payment gateway siap digunakan

Good luck! 🚀

