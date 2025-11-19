// Supabase Edge Function to get Midtrans Snap Token
// This runs server-side so Server Key is safe

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const MIDTRANS_SERVER_KEY = Deno.env.get('MIDTRANS_SERVER_KEY') || ''
const MIDTRANS_API_URL = 'https://app.sandbox.midtrans.com/snap/v1/transactions' // Use production URL when live

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
    const { paymentData } = await req.json()
    
    // Call Midtrans API to get Snap token
    const response = await fetch(MIDTRANS_API_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(MIDTRANS_SERVER_KEY + ':')
      },
      body: JSON.stringify(paymentData)
    })
    
    const data = await response.json()
    
    return new Response(
      JSON.stringify({ token: data.token }),
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    )
    
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
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

