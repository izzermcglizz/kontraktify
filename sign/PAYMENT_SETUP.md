# 💰 Monetization - Payment Integration

## How It Works:

1. User upload PDF + add signers + place fields
2. Click "Generate Link" → **PAYMENT MODAL** muncul
3. User bayar Rp 50,000 via Midtrans (BCA, Mandiri, GoPay, OVO, QRIS, dll)
4. After payment success → Generate links
5. Track payment status di database

---

## Setup Midtrans (15 menit)

### Step 1: Create Midtrans Account

1. Go to https://midtrans.com
2. Click "Daftar Sekarang"
3. Fill form:
   - Nama Bisnis: Kontraktify
   - Email bisnis
   - Phone number
4. Verify email
5. Complete merchant profile

### Step 2: Get Sandbox Keys (for Testing)

1. Login to Midtrans Dashboard
2. Go to **Settings** → **Access Keys**
3. Switch to **Sandbox** mode (for testing)
4. Copy:
   - **Client Key** (starts with `SB-Mid-client-`)
   - **Server Key** (starts with `SB-Mid-server-`)

### Step 3: Production Keys (when ready to go live)

1. Complete merchant verification (need: KTP, NPWP, business docs)
2. Switch to **Production** mode
3. Copy production keys

---

## Payment Methods Available:

With Midtrans, users can pay with:
- 💳 Credit/Debit Card (Visa, Mastercard)
- 🏦 Bank Transfer (BCA, Mandiri, BNI, BRI, Permata)
- 📱 E-Wallet (GoPay, OVO, ShopeePay, DANA)
- 🏪 Convenience Store (Alfamart, Indomaret)
- 📊 QRIS
- 💸 Kredivo, Akulaku (installment)

---

## Database Changes Needed:

Add `payments` table:

```sql
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  envelope_id UUID REFERENCES envelopes(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  status VARCHAR(50) DEFAULT 'pending', -- pending, success, failed
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

-- Add payment status to envelopes
ALTER TABLE envelopes ADD COLUMN payment_status VARCHAR(50) DEFAULT 'unpaid';
```

---

## Implementation Notes:

### Frontend Flow:
1. User clicks "Generate Link"
2. Show payment modal with Midtrans Snap
3. User chooses payment method
4. After payment success → Create envelope + recipients + fields
5. Show links modal

### Midtrans Snap (Easiest):
- Pre-built payment UI
- Handles all payment methods
- Mobile responsive
- Just popup modal

### Pricing:
- Price per document: **Rp 50,000**
- Midtrans fee: ~2.9% + Rp 2,000 = ~Rp 3,450
- Your profit: ~Rp 46,550 per document

---

## Testing (Sandbox):

Use these test numbers in sandbox:
- **Credit Card:** 4811 1111 1111 1114
- **CVV:** 123
- **Expiry:** Any future date
- **OTP:** 112233

For other methods, Midtrans will show test instructions.

---

## Security:

1. **Server Key** → NEVER expose to frontend! 
   - Use Supabase Edge Function or backend
2. **Client Key** → OK to use in frontend
3. Always verify payment on backend before generating links

---

## Next Steps:

I'll create:
1. Payment modal component
2. Midtrans Snap integration
3. Payment verification logic
4. Updated create.js with payment flow

Ready to add payment? Let me know and I'll update the code! 💳

