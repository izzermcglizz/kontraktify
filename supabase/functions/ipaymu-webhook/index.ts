import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

/**
 * iPaymu Webhook Handler
 * 
 * Flow:
 * 1. Customer bayar di iPaymu
 * 2. iPaymu kirim POST request ke notifyUrl ini
 * 3. Kita verifikasi signature dan update status transaksi
 * 4. Return success ke iPaymu
 */

const IPAYMU_API_KEY = Deno.env.get("IPAYMU_API_KEY");

// Generate MD5 hash untuk verifikasi signature
async function md5(text: string): Promise<string> {
  const md5Module = await import("https://deno.land/x/md5@v1.0.1/mod.ts");
  return md5Module.md5(text);
}

// Verify signature dari iPaymu
async function verifySignature(params: Record<string, string>, signature: string, apiKey: string): Promise<boolean> {
  const sortedKeys = Object.keys(params).sort();
  const stringToSign = sortedKeys
    .map(key => `${key}=${params[key]}`)
    .join("&");
  const finalString = `${stringToSign}&key=${apiKey}`;
  const calculatedSignature = await md5(finalString);
  return calculatedSignature.toLowerCase() === signature.toLowerCase();
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "content-type",
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
    // iPaymu mengirim data sebagai form-urlencoded atau JSON
    const contentType = req.headers.get("content-type") || "";
    let notificationData: any;

    if (contentType.includes("application/json")) {
      notificationData = await req.json();
    } else {
      // Form-urlencoded
      const formData = await req.formData();
      notificationData = Object.fromEntries(formData.entries());
    }

    console.log("📥 iPaymu webhook notification:", notificationData);

    // Verify signature jika ada
    const signature = notificationData.signature || req.headers.get("signature");
    if (signature && IPAYMU_API_KEY) {
      const params: Record<string, string> = {};
      for (const [key, value] of Object.entries(notificationData)) {
        if (key !== "signature") {
          params[key] = String(value);
        }
      }

      const isValid = await verifySignature(params, signature, IPAYMU_API_KEY);
      if (!isValid) {
        console.error("❌ Invalid signature from iPaymu");
        return new Response(
          JSON.stringify({ error: "Invalid signature" }),
          { 
            status: 401,
            headers: { 
              "Content-Type": "application/json"
            }
          }
        );
      }
    }

    // Extract payment info
    const referenceId = notificationData.referenceId || notificationData.trx_id;
    const status = notificationData.status || notificationData.Status;
    const sessionId = notificationData.sessionId || notificationData.SessionID;
    const amount = notificationData.amount || notificationData.Amount;

    console.log("📊 Payment info:", {
      referenceId,
      status,
      sessionId,
      amount
    });

    // Update status transaksi di database (jika ada)
    // TODO: Implement database update logic here
    // Contoh:
    // await supabase
    //   .from('payments')
    //   .update({ status: status, updated_at: new Date() })
    //   .eq('reference_id', referenceId);

    // Log untuk tracking
    console.log("✅ Payment notification processed:", {
      referenceId,
      status,
      timestamp: new Date().toISOString()
    });

    // Return success ke iPaymu (iPaymu expect "success" atau JSON dengan status)
    return new Response(
      JSON.stringify({ 
        status: "success",
        message: "Notification received"
      }),
      { 
        status: 200,
        headers: { 
          "Content-Type": "application/json"
        }
      }
    );

  } catch (error: any) {
    console.error("❌ Webhook error:", error);
    return new Response(
      JSON.stringify({ 
        error: "Internal server error",
        message: error?.message || "Unknown error"
      }),
      { 
        status: 500,
        headers: { 
          "Content-Type": "application/json"
        }
      }
    );
  }
});

