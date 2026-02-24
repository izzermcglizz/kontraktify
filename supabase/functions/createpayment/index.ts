import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { encode as base64Encode } from "https://deno.land/std@0.224.0/encoding/base64.ts";

const MIDTRANS_URL_SANDBOX = "https://app.sandbox.midtrans.com/snap/v1/transactions";
const MIDTRANS_URL_PRODUCTION = "https://app.midtrans.com/snap/v1/transactions";

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
      },
    });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { 
        status: 405,
        headers: { 
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      }
    );
  }

  try {
    const payload = await req.json();
    console.log("📥 Received payload:", payload);

    // Validate required fields
    if (!payload.transaction_details || !payload.transaction_details.order_id || !payload.transaction_details.gross_amount) {
      return new Response(
        JSON.stringify({ 
          error: "Missing required fields",
          required: ["transaction_details.order_id", "transaction_details.gross_amount"]
        }),
        { 
          status: 400,
          headers: { 
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        }
      );
    }

    // Get Midtrans credentials from environment
    const SERVER_KEY = Deno.env.get("MIDTRANS_SERVER_KEY");
    const IS_PRODUCTION = Deno.env.get("MIDTRANS_IS_PRODUCTION") === "true";
    const BASE_URL = Deno.env.get("BASE_URL") || "https://www.kontraktify.com";

    if (!SERVER_KEY) {
      console.error("❌ MIDTRANS_SERVER_KEY not set");
      return new Response(
        JSON.stringify({ error: "Midtrans credentials not configured" }),
        { 
          status: 500,
          headers: { 
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        }
      );
    }

    // Choose API URL based on environment
    const MIDTRANS_URL = IS_PRODUCTION ? MIDTRANS_URL_PRODUCTION : MIDTRANS_URL_SANDBOX;
    
    // Create authorization header (Basic Auth with Server Key)
    const authString = `${SERVER_KEY}:`;
    const encodedAuth = base64Encode(new TextEncoder().encode(authString));
    
    // Build Midtrans transaction payload
    const midtransPayload = {
      transaction_details: {
        order_id: payload.transaction_details.order_id,
        gross_amount: payload.transaction_details.gross_amount
      },
      item_details: payload.item_details || [],
      customer_details: payload.customer_details || {},
      callbacks: {
        finish: payload.callbacks?.finish || `${BASE_URL}/payment/finish`
      },
      custom_field1: payload.custom_field1 || "",
      custom_field2: payload.custom_field2 || "",
      custom_field3: payload.custom_field3 || ""
    };

    console.log("📤 Requesting Midtrans Snap token:", {
      url: MIDTRANS_URL,
      order_id: midtransPayload.transaction_details.order_id,
      amount: midtransPayload.transaction_details.gross_amount,
      environment: IS_PRODUCTION ? "production" : "sandbox"
    });

    // Call Midtrans Snap API
    const midtransRes = await fetch(MIDTRANS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Basic ${encodedAuth}`
      },
      body: JSON.stringify(midtransPayload)
    });

    const result = await midtransRes.json();
    console.log("📥 Midtrans response:", {
      status: midtransRes.status,
      hasToken: !!result.token,
      hasRedirectUrl: !!result.redirect_url
    });

    if (!midtransRes.ok) {
      console.error("❌ Midtrans error:", result);
      return new Response(
        JSON.stringify({ 
          error: result.error_messages || result.message || "Failed to create payment",
          status_code: result.status_code,
          details: result
        }),
        { 
          status: midtransRes.status,
          headers: { 
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        }
      );
    }

    // Return snap token and redirect URL
    return new Response(
      JSON.stringify({
        snap_token: result.token,
        redirect_url: result.redirect_url,
        order_id: midtransPayload.transaction_details.order_id
      }),
      { 
        headers: { 
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      }
    );

  } catch (error: any) {
    console.error("❌ Error:", error);
    console.error("❌ Error stack:", error?.stack);
    return new Response(
      JSON.stringify({ 
        error: "Internal server error",
        message: error?.message || "Unknown error"
      }),
      { 
        status: 500,
        headers: { 
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      }
    );
  }
});
