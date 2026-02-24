import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { createHash } from "https://deno.land/std@0.224.0/node/crypto.ts";

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
    console.log("📥 Midtrans webhook received:", {
      order_id: payload.order_id,
      transaction_status: payload.transaction_status,
      fraud_status: payload.fraud_status,
      payment_type: payload.payment_type
    });

    // Verify signature
    const SERVER_KEY = Deno.env.get("MIDTRANS_SERVER_KEY");
    if (!SERVER_KEY) {
      console.error("❌ MIDTRANS_SERVER_KEY not set");
      return new Response(
        JSON.stringify({ error: "Server configuration error" }),
        { status: 500 }
      );
    }

    // Create signature hash for verification
    const signatureKey = `${payload.order_id}${payload.status_code}${payload.gross_amount}${SERVER_KEY}`;
    const hash = createHash("sha512").update(signatureKey).digest("hex");

    if (hash !== payload.signature_key) {
      console.error("❌ Invalid signature");
      return new Response(
        JSON.stringify({ error: "Invalid signature" }),
        { status: 401 }
      );
    }

    // Determine payment status
    let status = "pending";
    const transactionStatus = payload.transaction_status;
    const fraudStatus = payload.fraud_status;

    if (transactionStatus === "capture") {
      status = fraudStatus === "accept" ? "success" : "pending";
    } else if (transactionStatus === "settlement") {
      status = "success";
    } else if (transactionStatus === "cancel" || transactionStatus === "deny" || transactionStatus === "expire") {
      status = "failed";
    } else if (transactionStatus === "pending") {
      status = "pending";
    }

    console.log("✅ Payment status determined:", status);

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Update payment record in database
    const { data, error } = await supabase
      .from("payments")
      .update({
        status: status,
        transaction_id: payload.transaction_id,
        payment_type: payload.payment_type,
        transaction_time: payload.transaction_time,
        settlement_time: payload.settlement_time,
        fraud_status: fraudStatus,
        updated_at: new Date().toISOString()
      })
      .eq("order_id", payload.order_id)
      .select();

    if (error) {
      console.error("❌ Database update error:", error);
      // Don't return error to Midtrans - we want to acknowledge receipt
    } else {
      console.log("✅ Database updated successfully:", data);
    }

    // Send success response to Midtrans
    return new Response(
      JSON.stringify({ 
        status: "success",
        message: "Webhook received and processed"
      }),
      { 
        status: 200,
        headers: { 
          "Content-Type": "application/json"
        }
      }
    );

  } catch (error: any) {
    console.error("❌ Webhook processing error:", error);
    // Still return 200 to acknowledge receipt
    return new Response(
      JSON.stringify({ 
        status: "received",
        message: "Webhook received but processing failed"
      }),
      { 
        status: 200,
        headers: { 
          "Content-Type": "application/json"
        }
      }
    );
  }
});



