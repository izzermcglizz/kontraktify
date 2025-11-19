# 💳 iPaymu Payment Setup

Kamu sudah punya API key iPaymu - Perfect! Tinggal setup aja!

---

## What You Need from iPaymu Dashboard:

Login ke https://my.ipaymu.com, lalu ambil:

1. **VA Number** (Virtual Account)
   - Dashboard → Settings → Profile
   - Copy "VA Number"

2. **API Key**
   - Dashboard → Settings → API Key
   - Copy "Production Key" atau "Sandbox Key" (kalau testing)

---

## Step 1: Update config.js (2 menit)

Open `/sign/js/config.js`:

```javascript
// iPaymu Configuration
const IPAYMU_VA = '1179001522299840'; // Paste VA Number kamu
const IPAYMU_API_KEY = 'QbGcoO0Kp...'; // Paste API Key kamu
```

Replace dengan nilai yang kamu punya!

---

## Step 2: Deploy Edge Function (5 menit)

### 2.1 Install Supabase CLI (one time)

**Mac:**
```bash
brew install supabase/tap/supabase
```

**Windows:**
Download from: https://github.com/supabase/cli/releases

### 2.2 Login
```bash
supabase login
```

### 2.3 Get Project Ref
1. Go to Supabase Dashboard
2. Settings → General
3. Copy "Reference ID" (e.g., `abcdefgh`)

### 2.4 Link Project
```bash
cd /Users/jessicaferine/kontraktify/sign
supabase link --project-ref YOUR_PROJECT_REF
```

### 2.5 Set Secrets
```bash
supabase secrets set IPAYMU_VA=your_va_number
supabase secrets set IPAYMU_API_KEY=your_api_key
```

### 2.6 Deploy Function
```bash
supabase functions deploy create-payment
```

Done! Function is live! ✅

---

## How iPaymu Payment Works:

1. User click "Lanjut ke Pembayaran"
2. Payment modal shows Rp 50,000
3. User click "Bayar Sekarang"
4. **Redirect** ke iPaymu payment page
5. User pilih payment method:
   - Bank Transfer (BCA, Mandiri, BNI, BRI)
   - QRIS
   - E-Wallet
   - Credit Card
6. User complete payment
7. **Auto redirect back** ke Kontraktify
8. Links generated automatically!

---

## Testing (Sandbox Mode)

iPaymu has sandbox mode for testing:

### Test Payment:
1. Use sandbox API key
2. Make payment
3. iPaymu will show test instructions
4. Or manually mark as "Paid" di iPaymu dashboard → Transactions

---

## Production Mode:

When ready to accept real payments:

1. **Verify Account** (if not yet)
   - Complete profile di iPaymu
   - Upload KTP, NPWP
   - Add bank account
   
2. **Switch to Production**
   - Use Production API Key (not sandbox)
   - Update config.js
   - Redeploy edge function

---

## iPaymu Fees:

**Per Transaction:**
- Bank Transfer: Rp 3,500 flat
- QRIS: 0.7% 
- E-Wallet: varies (0.7% - 2%)
- Credit Card: 2.9%

**Your profit per document:**
- Price: Rp 50,000
- iPaymu fee: ~Rp 3,500 (average)
- **Your net: ~Rp 46,500** 💰

---

## Settlement (Terima Uang):

- **Auto-transfer** ke rekening bank kamu
- **T+1 settlement** (1 hari kerja after payment)
- Bisa set jadwal transfer (daily/weekly)

---

## Callback (Optional - untuk auto-update status):

iPaymu bisa kirim callback notification saat payment success.

**Setup:**
1. iPaymu Dashboard → Settings → Callback URL
2. Set to: `https://YOUR_PROJECT.supabase.co/functions/v1/ipaymu-callback`

3. Create callback function:
```bash
supabase functions deploy ipaymu-callback
```

---

## Support:

**iPaymu Customer Service:**
- WhatsApp: 0822-2586-2586
- Email: cs@ipaymu.com
- Docs: https://ipaymu.com/en/api-documentation/

---

## Testing Checklist:

- [ ] Add VA & API Key to config.js
- [ ] Set secrets in Supabase
- [ ] Deploy edge function
- [ ] Test payment flow
- [ ] Verify redirect back works
- [ ] Check links generated
- [ ] Verify payment shows in iPaymu dashboard

---

## 🎉 That's It!

iPaymu setup is simpler than Midtrans!

**Flow:**
1. User prepares document
2. Click payment → Redirect to iPaymu
3. Pay → Redirect back
4. Links generated!

Easy! 🚀

