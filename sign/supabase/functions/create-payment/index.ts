// Supabase Edge Function to create iPaymu payment
// This keeps your API Key secure server-side

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { createHash } from 'https://deno.land/std@0.168.0/node/crypto.ts'

const IPAYMU_VA = Deno.env.get('IPAYMU_VA') || ''
const IPAYMU_API_KEY = Deno.env.get('IPAYMU_API_KEY') || ''
const IPAYMU_API_URL = 'https://my.ipaymu.com/api/v2/payment'

serve(async (req) => {
  // CORS headers
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      }
    })
  }

  try {
    const { amount, orderId, product, buyerName, buyerEmail } = await req.json()
    
    // Create iPaymu request body
    const body = {
      product: [product],
      qty: [1],
      price: [amount],
      returnUrl: `${req.headers.get('origin')}/sign/create.html`,
      cancelUrl: `${req.headers.get('origin')}/sign/create.html`,
      notifyUrl: `${Deno.env.get('SUPABASE_URL')}/functions/v1/ipaymu-callback`,
      referenceId: orderId,
      buyerName: buyerName || 'Customer',
      buyerEmail: buyerEmail || 'customer@kontraktify.com',
      buyerPhone: '08123456789'
    }
    
    // Generate signature for iPaymu
    const bodyEncoded = JSON.stringify(body)
    const stringToSign = 'POST:' + IPAYMU_VA + ':' + bodyEncoded + ':' + IPAYMU_API_KEY
    
    const signature = createHash('sha256')
      .update(stringToSign)
      .digest('hex')
    
    // Call iPaymu API
    const response = await fetch(IPAYMU_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'signature': signature,
        'va': IPAYMU_VA,
        'timestamp': Date.now().toString()
      },
      body: bodyEncoded
    })
    
    const data = await response.json()
    
    if (data.Status === 200) {
      return new Response(
        JSON.stringify({ 
          success: true,
          paymentUrl: data.Data.Url,
          sessionId: data.Data.SessionID,
          orderId: orderId
        }),
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        }
      )
    } else {
      throw new Error(data.Message || 'iPaymu error')
    }
    
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    )
  }
})

