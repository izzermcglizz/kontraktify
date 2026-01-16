# Supabase Edge Function - iPaymu Payment Integration

## Setup

1. **Set Environment Variables di Supabase Dashboard:**
   - Go to: Project Settings → Edge Functions → Secrets
   - Add:
     - `IPAYMU_VA`: `1179005776604685`
     - `IPAYMU_API_KEY`: `7FEE44DD-2DFF-42D5-B2CA-81015709A143`

2. **Register URLs di iPaymu Dashboard:**
   - Login ke https://my.ipaymu.com
   - Go to: Integrasi → Domain/IP
   - Register:
     - `https://www.kontraktify.com/tools/templates/forms/notify` (Notify URL)
     - `https://www.kontraktify.com/tools/templates/forms/receipt-sewa-menyewa.html` (Return URL)
     - `https://www.kontraktify.com/tools/templates/forms/payment-sewa-menyewa.html` (Cancel URL)

3. **Deploy Function:**
   ```bash
   cd supabase
   supabase functions deploy createpayment
   ```

## Testing

Test dengan curl:
```bash
curl -X POST https://rcjwcgztmlygmmftklge.supabase.co/functions/v1/createpayment \
  -H "Content-Type: application/json" \
  -d '{
    "product": "Template Perjanjian Sewa Menyewa",
    "price": 10000,
    "buyer": {
      "name": "Test User",
      "email": "test@example.com",
      "phone": "628123456789"
    }
  }'
```

Expected response:
```json
{
  "paymentUrl": "https://my.ipaymu.com/payment/xxx",
  "sessionId": "xxx",
  "referenceId": "KTF-xxx"
}
```

## Troubleshooting

1. **Error "unauthorized"**: 
   - Cek VA dan API Key sudah benar
   - Cek signature generation

2. **Error "invalid domain"**:
   - Pastikan URLs sudah di-register di iPaymu dashboard
   - Pastikan domain sudah di-activate

3. **Error "Failed to fetch"**:
   - Cek CORS settings
   - Cek function sudah di-deploy
   - Cek logs di Supabase Dashboard

