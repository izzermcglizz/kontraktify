# 💳 Midtrans Payment Setup (Rp 50,000 per document)

---

## Part 1: Create Midtrans Account (10 menit)

### Step 1: Sign Up
1. Go to https://midtrans.com
2. Click "Daftar" (top right)
3. Pilih "Daftar Sekarang" 
4. Fill form:
   - Nama bisnis: **Kontraktify**
   - Email: (email kamu)
   - Phone: (nomor HP kamu)
   - Password: (bikin password)
5. Verify email
6. Login ke dashboard

### Step 2: Complete Profile (Bisa skip dulu for testing)
- Untuk production nanti perlu lengkapin:
  - KTP
  - NPWP  
  - Informasi bank (buat terima uang)

---

## Part 2: Get Sandbox Keys (Testing Mode)

### Step 1: Login to Dashboard
1. Login di https://dashboard.midtrans.com
2. Kamu akan lihat dashboard merchant

### Step 2: Switch to Sandbox
1. Top right, ada toggle **Production** / **Sandbox**
2. Klik switch ke **Sandbox** (untuk testing dulu)
3. Sandbox = fake money, buat testing doang

### Step 3: Get Keys
1. Go to **Settings** → **Access Keys**
2. Kamu akan lihat 2 keys:
   - **Client Key:** `SB-Mid-client-xxxxx` (untuk frontend)
   - **Server Key:** `SB-Mid-server-xxxxx` (untuk backend)
3. **Copy kedua keys ini!**

---

## Part 3: Update Code

### 3.1 Update config.js

Open `/sign/js/config.js`, tambahkan Midtrans Client Key:

```javascript
const MIDTRANS_CLIENT_KEY = 'SB-Mid-client-xxxxx'; // Paste your key here
```

### 3.2 Add Server Key to Supabase

1. Go to Supabase Dashboard
2. Click **Project Settings** → **Edge Functions**
3. Click **Manage secrets**
4. Add new secret:
   - Name: `MIDTRANS_SERVER_KEY`
   - Value: `SB-Mid-server-xxxxx` (your server key)
5. Save

---

## Part 4: Deploy Supabase Edge Function

### Step 1: Install Supabase CLI (one time only)

**Mac:**
```bash
brew install supabase/tap/supabase
```

**Windows:**
```bash
npm install -g supabase
```

### Step 2: Login to Supabase
```bash
supabase login
```
- Follow instructions (will open browser)

### Step 3: Link to Your Project
```bash
cd /Users/jessicaferine/kontraktify/sign
supabase link --project-ref YOUR_PROJECT_REF
```

Get `YOUR_PROJECT_REF` from:
- Supabase Dashboard → Settings → General → Reference ID

### Step 4: Deploy Function
```bash
supabase functions deploy get-snap-token
```

Done! Function is now live.

---

## Part 5: Add Payments Table to Database

Go to Supabase SQL Editor, run this:

```sql
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  envelope_id UUID REFERENCES envelopes(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  midtrans_order_id VARCHAR(255) UNIQUE,
  midtrans_transaction_id VARCHAR(255),
  payment_type VARCHAR(100),
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read payments" ON payments FOR SELECT USING (true);
CREATE POLICY "Anyone can insert payments" ON payments FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update payments" ON payments FOR UPDATE USING (true);

-- Add payment_status column to envelopes
ALTER TABLE envelopes ADD COLUMN payment_status VARCHAR(50) DEFAULT 'unpaid';
```

---

## Part 6: Testing Payment

### Test Credit Card (Sandbox)
- Card Number: **4811 1111 1111 1114**
- CVV: **123**
- Expiry: Any future date (e.g., 12/25)
- 3D Secure OTP: **112233**

### Test Bank Transfer (Sandbox)
- Select bank (e.g., BCA)
- Will show VA number
- Use "Simulator" in Midtrans dashboard to simulate payment

### Test E-Wallet (Sandbox)
- Select GoPay/OVO
- Will show QR code
- Click "Simulator" to complete

---

## Production (When Ready)

### Step 1: Complete Merchant Verification
1. Upload KTP, NPWP
2. Bank account details
3. Business documents
4. Wait for approval (~1-3 days)

### Step 2: Switch to Production
1. In Midtrans dashboard, switch to **Production**
2. Get new production keys
3. Update config.js with production Client Key
4. Update Supabase secret with production Server Key
5. In create.html, change Snap URL:
   ```javascript
   script.src = 'https://app.midtrans.com/snap/snap.js'; // Remove 'sandbox'
   ```
6. In edge function, change:
   ```typescript
   const MIDTRANS_API_URL = 'https://app.midtrans.com/snap/v1/transactions'
   ```

---

## Pricing Breakdown

**Per Dokumen: Rp 50,000**
- Midtrans Fee: ~2.9% + Rp 2,000 = **Rp 3,450**
- **Your Profit: Rp 46,550** (93.1%)

Payment methods have different fees:
- Credit/Debit Card: 2.9% + Rp 2,000
- Bank Transfer: Rp 4,000 flat
- GoPay/QRIS: 2%
- OVO: 1.5%

Midtrans auto-deducts fees before transferring to your bank.

---

## Settlement (Terima Uang)

- **T+1 settlement**: Bayaran masuk ke rekening kamu 1 hari kerja setelah customer bayar
- Auto-transfer ke rekening bank yang kamu daftarkan
- Bisa set minimum payout amount

---

## Support

**Midtrans Support:**
- Email: support@midtrans.com
- WhatsApp: +62 21 2925 0888
- Docs: https://docs.midtrans.com

**Testing:**
- Use Sandbox mode first
- Test all payment methods
- Check settlement appears in dashboard
- Then switch to production

---

## 🎉 That's It!

After setup:
1. User upload PDF → add signers
2. Click "Lanjut ke Pembayaran"
3. Payment modal shows Rp 50,000
4. User pays via Midtrans (choose payment method)
5. After success → Links generated automatically
6. User copy & share links

Ka-ching! 💰

