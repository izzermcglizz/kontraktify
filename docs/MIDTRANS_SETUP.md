# Midtrans Payment Integration Setup

Panduan lengkap untuk mengintegrasikan Midtrans sebagai payment gateway Kontraktify.

## 📋 Prerequisites

1. Akun Midtrans (Sandbox atau Production)
2. Supabase Project dengan Edge Functions enabled
3. Database table untuk menyimpan payment records

---

## 1️⃣ Daftar Midtrans Account

### Sandbox (Testing)
1. Buka https://dashboard.sandbox.midtrans.com/register
2. Daftar dengan email
3. Verifikasi email dan login

### Production (Live)
1. Buka https://dashboard.midtrans.com/register
2. Lengkapi informasi bisnis
3. Submit dokumen verifikasi (KTP, NPWP, dll)
4. Tunggu approval (1-3 hari kerja)

---

## 2️⃣ Dapatkan API Credentials

1. Login ke Midtrans Dashboard
2. Navigate to **Settings** → **Access Keys**
3. Copy credentials:
   - **Server Key** (untuk backend/Supabase)
   - **Client Key** (untuk frontend)

**⚠️ IMPORTANT:** 
- **Server Key** = RAHASIA! Jangan expose di frontend
- **Client Key** = Boleh public di HTML

---

## 3️⃣ Setup Environment Variables

### Supabase Edge Functions

Buka Supabase Dashboard → Project Settings → Edge Functions → Add secret:

```bash
# Midtrans Credentials
MIDTRANS_SERVER_KEY=SB-Mid-server-xxxxxxxxxxxxx  # Sandbox
# MIDTRANS_SERVER_KEY=Mid-server-xxxxxxxxxxxxx   # Production

MIDTRANS_IS_PRODUCTION=false  # Set to 'true' for production

# Base URL (untuk redirect)
BASE_URL=https://www.kontraktify.com

# Supabase credentials (biasanya sudah auto-set)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### Local Config File

Update `/shared/config/payment.js`:

```javascript
const MIDTRANS_SERVER_KEY = getConfigValue('BASE64_ENCODED_SERVER_KEY');
const MIDTRANS_CLIENT_KEY = 'Mid-client-xxxxxxxxxxxxx'; // Or SB-Mid-client-xxx for sandbox
const MIDTRANS_IS_PRODUCTION = false;
```

**Cara encode Server Key:**
```javascript
btoa('SB-Mid-server-xxxxxxxxxxxxx') // Returns base64 string
```

---

## 4️⃣ Deploy Supabase Edge Functions

### Deploy Create Payment Function

```bash
cd /Users/jessicaferine/kontraktify
supabase functions deploy createpayment
```

### Deploy Webhook Handler

```bash
supabase functions deploy midtrans-webhook
```

### Verify Deployment

```bash
supabase functions list
```

Output harus menunjukkan:
- ✅ `createpayment`
- ✅ `midtrans-webhook`

---

## 5️⃣ Setup Midtrans Webhook

1. Login ke Midtrans Dashboard
2. Navigate to **Settings** → **Configuration** → **Notification**
3. Set **Payment Notification URL**:

```
https://YOUR_PROJECT_REF.supabase.co/functions/v1/midtrans-webhook
```

**Example:**
```
https://rcjwcgztmlygmnftklge.supabase.co/functions/v1/midtrans-webhook
```

4. Set **Finish Redirect URL** (optional):
```
https://www.kontraktify.com/payment/finish
```

5. Klik **Update**

---

## 6️⃣ Setup Database Table

Create table `payments` di Supabase:

```sql
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_email VARCHAR(255) NOT NULL,
  amount INTEGER NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  order_id VARCHAR(255) UNIQUE NOT NULL,
  transaction_id VARCHAR(255),
  payment_type VARCHAR(100),
  tool_type VARCHAR(50),
  reference_id VARCHAR(255),
  transaction_time TIMESTAMP,
  settlement_time TIMESTAMP,
  fraud_status VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Index untuk query performance
CREATE INDEX idx_payments_order_id ON payments(order_id);
CREATE INDEX idx_payments_email ON payments(user_email);
CREATE INDEX idx_payments_status ON payments(status);
```

---

## 7️⃣ Test Payment Flow

### Sandbox Testing

1. Open test payment page
2. Isi form dengan data test:
   - **Email**: test@example.com
   - **Name**: Test User
   - **Phone**: 081234567890
3. Click **Bayar Sekarang**
4. Akan muncul Midtrans Snap popup
5. Gunakan test credentials:

| Payment Method | Test Number | CVV | Status |
|---------------|-------------|-----|--------|
| Credit Card | `4811 1111 1111 1114` | 123 | Success |
| Credit Card | `4911 1111 1111 1113` | 123 | Failure |
| GoPay | Any number | - | Success |

6. Cek database untuk verify payment record updated

### Check Webhook Logs

```bash
supabase functions logs midtrans-webhook --tail
```

---

## 8️⃣ Go Live (Production)

### Prerequisites:
- ✅ Midtrans account approved
- ✅ Production credentials obtained
- ✅ Testing completed successfully

### Steps:

1. **Update Environment Variables:**
```bash
MIDTRANS_SERVER_KEY=Mid-server-PRODUCTION-xxxxx
MIDTRANS_IS_PRODUCTION=true
```

2. **Update Config File:**
```javascript
const MIDTRANS_IS_PRODUCTION = true;
const MIDTRANS_CLIENT_KEY = 'Mid-client-PRODUCTION-xxxxx';
```

3. **Re-deploy Functions:**
```bash
supabase functions deploy createpayment
supabase functions deploy midtrans-webhook
```

4. **Update Midtrans Dashboard:**
   - Switch to Production environment
   - Update Notification URL (if changed)
   - Verify redirect URLs

5. **Test with Real Payment:**
   - Use small amount (Rp 10.000)
   - Verify payment flows correctly
   - Check webhook receives notification
   - Confirm database updates

---

## 🔍 Troubleshooting

### Payment Creation Fails

**Check:**
1. Server Key correct?
```bash
# Test in Supabase logs
supabase functions logs createpayment --tail
```

2. Environment variables set?
```bash
# List all secrets
supabase secrets list
```

3. CORS headers correct?

### Webhook Not Receiving Notifications

**Check:**
1. Webhook URL accessible?
```bash
curl -X POST https://YOUR_PROJECT_REF.supabase.co/functions/v1/midtrans-webhook \
  -H "Content-Type: application/json" \
  -d '{"test": "data"}'
```

2. Midtrans Dashboard → Settings → Notification URL correct?

3. Check webhook logs:
```bash
supabase functions logs midtrans-webhook --tail
```

### Payment Status Not Updating

**Check:**
1. Signature verification passing?
2. Database permissions correct?
3. Webhook logs for errors

---

## 📚 Additional Resources

- [Midtrans Documentation](https://docs.midtrans.com)
- [Snap API Reference](https://snap-docs.midtrans.com)
- [Webhook Notification](https://docs.midtrans.com/en/after-payment/http-notification)
- [Test Credentials](https://docs.midtrans.com/en/technical-reference/sandbox-test)

---

## 🆘 Support

Jika ada masalah:
1. Check Supabase function logs
2. Check Midtrans Dashboard → Transactions
3. Contact Midtrans support: support@midtrans.com
4. Check Kontraktify internal docs

---

**Last Updated:** 2026-02-10
**Version:** 1.0.0



