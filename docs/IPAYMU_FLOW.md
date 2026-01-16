# iPaymu Payment Flow

Berdasarkan flowchart iPaymu, berikut adalah flow lengkap payment:

## Flow Steps

### 1. Customer Initiate Transaction
- Customer mengisi form di `preview-sewa-menyewa.html`
- Customer klik "Lanjut ke Pembayaran"
- Frontend (`payment.js`) memanggil `initiatePayment()`

### 2. Merchant Request Payment Link
- Frontend kirim request ke Supabase Edge Function `createpayment`
- Edge Function:
  - Validasi payload
  - Generate `referenceId` (format: `KTF-{timestamp}-{random}`)
  - Buat FormData dengan format iPaymu:
    - `product[]`, `qty[]`, `price[]`
    - `buyerName`, `buyerEmail`, `buyerPhone`
    - `notifyUrl` (webhook handler)
    - `returnUrl` (halaman setelah bayar)
    - `cancelUrl` (halaman jika cancel)
    - `referenceId`
  - Generate MD5 signature
  - Call iPaymu API: `POST https://my.ipaymu.com/api/v2/payment`

### 3. iPaymu Generate Payment Link
- iPaymu validasi request
- iPaymu generate payment URL dan SessionID
- iPaymu return response:
  ```json
  {
    "Status": 200,
    "Data": {
      "SessionID": "...",
      "Url": "https://my.ipaymu.com/payment/..."
    }
  }
  ```

### 4. Merchant Receive Payment Link
- Edge Function return `paymentUrl` ke frontend
- Frontend redirect customer ke `paymentUrl`:
  ```javascript
  window.location.href = data.paymentUrl;
  ```

### 5. Customer Pay at iPaymu
- Customer di-redirect ke halaman iPaymu
- Customer pilih metode pembayaran (VA, QRIS, Credit Card, dll)
- Customer selesaikan pembayaran

### 6. iPaymu Process Payment
- iPaymu proses pembayaran sesuai metode yang dipilih
- Setelah berhasil, iPaymu kirim webhook ke `notifyUrl`

### 7. iPaymu Notify Merchant (Webhook)
- iPaymu POST request ke: `https://rcjwcgztmlygmmftklge.supabase.co/functions/v1/ipaymu-webhook`
- Webhook handler (`ipaymu-webhook/index.ts`):
  - Verifikasi signature (jika ada)
  - Extract payment info: `referenceId`, `status`, `sessionId`, `amount`
  - Update status transaksi di database (TODO)
  - Return success ke iPaymu

### 8. Merchant Process Transaction (Update Status)
- Webhook handler update status di database
- Log transaksi untuk tracking

### 9. Customer Return to Merchant
- Setelah bayar, customer di-redirect ke `returnUrl`:
  `https://www.kontraktify.com/tools/templates/forms/receipt-sewa-menyewa.html?ref={referenceId}`
- Halaman receipt menampilkan status pembayaran

### 10. Settlement (iPaymu Internal)
- iPaymu proses settlement sesuai jadwal
- Saldo merchant bertambah

## Files Involved

### Frontend
- `tools/templates/forms/preview-sewa-menyewa.html` - Form input buyer info
- `tools/templates/forms/payment.js` - Initiate payment function
- `tools/templates/forms/receipt-sewa-menyewa.html` - Receipt page setelah bayar

### Backend (Supabase Edge Functions)
- `supabase/functions/createpayment/index.ts` - Request payment link ke iPaymu
- `supabase/functions/ipaymu-webhook/index.ts` - Handle webhook dari iPaymu

## Environment Variables

Set di Supabase Dashboard:
- `IPAYMU_VA` - Virtual Account number
- `IPAYMU_API_KEY` - API Key untuk signature
- `BASE_URL` - Base URL untuk returnUrl dan cancelUrl

## URLs Configuration

### notifyUrl (Webhook)
```
https://rcjwcgztmlygmmftklge.supabase.co/functions/v1/ipaymu-webhook
```
- Harus bisa diakses public
- Harus HTTPS
- Harus terdaftar di iPaymu dashboard

### returnUrl
```
https://www.kontraktify.com/tools/templates/forms/receipt-sewa-menyewa.html?ref={referenceId}
```
- Halaman yang ditampilkan setelah customer selesai bayar
- Bisa ambil `referenceId` dari query parameter

### cancelUrl
```
https://www.kontraktify.com/tools/templates/forms/payment-sewa-menyewa.html?cancel=true
```
- Halaman yang ditampilkan jika customer cancel pembayaran

## Testing

1. Test payment initiation:
   - Buka `preview-sewa-menyewa.html`
   - Isi form dan klik "Lanjut ke Pembayaran"
   - Harus redirect ke iPaymu payment page

2. Test webhook:
   - Gunakan iPaymu test webhook atau
   - Simulasi POST request ke webhook URL dengan payload iPaymu

3. Test return flow:
   - Setelah bayar di iPaymu, harus redirect ke receipt page
   - Receipt page harus tampilkan status pembayaran

