# Supabase Edge Function - iPaymu Integration Example

## Format Request yang Benar untuk iPaymu Redirect Payment

### Endpoint
```
POST https://my.ipaymu.com/api/v2/payment
```

### Headers
```
Content-Type: application/json
va: YOUR_VA_NUMBER
signature: GENERATED_SIGNATURE
timestamp: YYYYMMDDHHmmss
```

**PENTING:** Meskipun header `Content-Type: application/json`, body harus dikirim sebagai **formdata** (multipart/form-data atau application/x-www-form-urlencoded)!

### Body (FormData)
```
product[]: "Template Perjanjian Sewa Menyewa"
qty[]: "1"
price[]: "10000"
notifyUrl: "https://www.kontraktify.com/tools/templates/forms/notify"
returnUrl: "https://www.kontraktify.com/tools/templates/forms/receipt-sewa-menyewa.html"
cancelUrl: "https://www.kontraktify.com/tools/templates/forms/payment-sewa-menyewa.html"
buyerName: "Nama Pembeli"
buyerEmail: "email@example.com"
buyerPhone: "628123456789"
referenceId: "REF123456"
```

### Response
```json
{
  "Status": 200,
  "Data": {
    "SessionID": "91538218-5158-459B-8716-DD97FFE3EDAB",
    "Url": "https://my.ipaymu.com/payment/91538218-5158-459B-8716-DD97FFE3EDAB"
  },
  "Message": "success"
}
```

## Contoh Implementasi Supabase Edge Function (Deno)

Buat file: `supabase/functions/createpayment/index.ts`

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const IPAYMU_VA = Deno.env.get('IPAYMU_VA') || '1179005776604685'
const IPAYMU_API_KEY = Deno.env.get('IPAYMU_API_KEY') || '7FEE44DD-2DFF-42D5-B2CA-81015709A143'
const IPAYMU_URL = 'https://my.ipaymu.com/api/v2/payment'

// Generate signature untuk iPaymu
function generateSignature(body: Record<string, string>, apiKey: string): string {
  // Sort keys alphabetically
  const sortedKeys = Object.keys(body).sort()
  
  // Create string: key1=value1&key2=value2...
  const stringToSign = sortedKeys
    .map(key => `${key}=${body[key]}`)
    .join('&')
  
  // Add API key
  const finalString = `${stringToSign}&key=${apiKey}`
  
  // Hash dengan MD5 atau SHA256 (cek dokumentasi iPaymu)
  // Contoh dengan MD5 (perlu import crypto)
  // return md5(finalString)
  
  // Atau dengan Web Crypto API
  const encoder = new TextEncoder()
  const data = encoder.encode(finalString)
  
  // iPaymu biasanya pakai MD5, tapi bisa juga SHA256
  // Cek dokumentasi signature generation di: 
  // https://storage.googleapis.com/ipaymu-docs/ipaymu-api/iPaymu-signature-documentation-v2.pdf
  
  // Untuk sekarang, return placeholder (harus diimplementasikan sesuai dokumentasi)
  return 'SIGNATURE_PLACEHOLDER'
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      },
    })
  }

  try {
    // Parse request body
    const { product, price, buyer } = await req.json()

    // Validate required fields
    if (!product || !price || !buyer || !buyer.email) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        }
      )
    }

    // Generate reference ID
    const referenceId = `KTF-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    // Prepare form data untuk iPaymu
    const formData = new FormData()
    formData.append('product[]', product)
    formData.append('qty[]', '1')
    formData.append('price[]', price.toString())
    formData.append('notifyUrl', 'https://www.kontraktify.com/tools/templates/forms/notify')
    formData.append('returnUrl', 'https://www.kontraktify.com/tools/templates/forms/receipt-sewa-menyewa.html')
    formData.append('cancelUrl', 'https://www.kontraktify.com/tools/templates/forms/payment-sewa-menyewa.html')
    formData.append('referenceId', referenceId)
    
    if (buyer.name) formData.append('buyerName', buyer.name)
    if (buyer.email) formData.append('buyerEmail', buyer.email)
    if (buyer.phone) formData.append('buyerPhone', buyer.phone)

    // Generate timestamp (format: YYYYMMDDHHmmss)
    const now = new Date()
    const timestamp = now.getFullYear().toString() +
      String(now.getMonth() + 1).padStart(2, '0') +
      String(now.getDate()).padStart(2, '0') +
      String(now.getHours()).padStart(2, '0') +
      String(now.getMinutes()).padStart(2, '0') +
      String(now.getSeconds()).padStart(2, '0')

    // Convert FormData to object untuk signature generation
    const bodyObj: Record<string, string> = {}
    for (const [key, value] of formData.entries()) {
      bodyObj[key] = value.toString()
    }
    bodyObj.timestamp = timestamp
    bodyObj.va = IPAYMU_VA

    // Generate signature
    const signature = generateSignature(bodyObj, IPAYMU_API_KEY)

    // Call iPaymu API
    const response = await fetch(IPAYMU_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Header ini, tapi body formdata
        'va': IPAYMU_VA,
        'signature': signature,
        'timestamp': timestamp,
      },
      body: formData, // Body sebagai FormData
    })

    const data = await response.json()

    if (!response.ok || data.Status !== 200) {
      console.error('iPaymu error:', data)
      return new Response(
        JSON.stringify({ 
          error: data.Message || 'Payment initiation failed',
          details: data 
        }),
        { 
          status: response.status || 500,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        }
      )
    }

    // Return payment URL
    return new Response(
      JSON.stringify({
        paymentUrl: data.Data?.Url,
        sessionId: data.Data?.SessionID,
        referenceId: referenceId,
      }),
      {
        status: 200,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      }
    )
  }
})
```

## Catatan Penting

1. **Signature Generation**: 
   - Harus sesuai dengan dokumentasi iPaymu
   - Download PDF: https://storage.googleapis.com/ipaymu-docs/ipaymu-api/iPaymu-signature-documentation-v2.pdf
   - Atau cek sample code di: https://github.com/ipaymu/ipaymu-payment-v2-sample-nodejs

2. **FormData vs JSON**:
   - Header: `Content-Type: application/json`
   - Body: **FormData** (bukan JSON!)

3. **URLs yang perlu di-register di iPaymu Dashboard**:
   - `notifyUrl`: https://www.kontraktify.com/tools/templates/forms/notify
   - `returnUrl`: https://www.kontraktify.com/tools/templates/forms/receipt-sewa-menyewa.html
   - `cancelUrl`: https://www.kontraktify.com/tools/templates/forms/payment-sewa-menyewa.html

4. **Environment Variables** (set di Supabase Dashboard):
   - `IPAYMU_VA`: 1179005776604685
   - `IPAYMU_API_KEY`: 7FEE44DD-2DFF-42D5-B2CA-81015709A143

## Deploy

```bash
cd supabase
supabase functions deploy createpayment
```

## Testing

Setelah deploy, test dengan:
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

