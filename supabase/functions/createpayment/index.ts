import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const IPAYMU_URL = "https://my.ipaymu.com/api/v2/payment";

function timestamp() {
  const d = new Date();
  return (
    d.getFullYear().toString() +
    String(d.getMonth() + 1).padStart(2, "0") +
    String(d.getDate()).padStart(2, "0") +
    String(d.getHours()).padStart(2, "0") +
    String(d.getMinutes()).padStart(2, "0") +
    String(d.getSeconds()).padStart(2, "0")
  );
}

// Generate MD5 hash untuk signature iPaymu v2
// Menggunakan library MD5 dari deno.land/x
async function md5(text: string): Promise<string> {
  const md5Module = await import("https://deno.land/x/md5@v1.0.1/mod.ts");
  return md5Module.md5(text);
}

// Generate signature untuk iPaymu v2 (MD5 dengan sorted keys)
async function generateSignature(params: Record<string, string>, apiKey: string): Promise<string> {
  const sortedKeys = Object.keys(params).sort();
  const stringToSign = sortedKeys
    .map(key => `${key}=${params[key]}`)
    .join("&");
  const finalString = `${stringToSign}&key=${apiKey}`;
  return await md5(finalString);
}

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

  // Baca body sebagai text dulu untuk debugging
  let rawBody: string;
  try {
    rawBody = await req.text();
    console.log("📥 Raw body length:", rawBody.length);
    console.log("📥 Raw body (first 200 chars):", rawBody.substring(0, 200));
  } catch (error: any) {
    console.error("❌ Could not read request body:", error);
    return new Response(
      JSON.stringify({ 
        error: "Could not read request body",
        message: error?.message
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

  // Extract JSON dari raw body (handle trailing characters)
  function extractFirstJSON(text: string): string {
    const trimmed = text.trim();
    const firstBrace = trimmed.indexOf('{');
    if (firstBrace === -1) return trimmed;
    
    let braceCount = 0;
    let lastBrace = -1;
    for (let i = firstBrace; i < trimmed.length; i++) {
      if (trimmed[i] === '{') braceCount++;
      else if (trimmed[i] === '}') {
        braceCount--;
        if (braceCount === 0) {
          lastBrace = i;
          break;
        }
      }
    }
    return lastBrace === -1 ? trimmed : trimmed.substring(firstBrace, lastBrace + 1);
  }

  let payload: any;
  try {
    const jsonString = extractFirstJSON(rawBody);
    console.log("📥 Extracted JSON length:", jsonString.length);
    payload = JSON.parse(jsonString);
    console.log("✅ Parsed payload:", payload);
  } catch (parseError: any) {
    console.error("❌ JSON parse error:", parseError);
    console.error("❌ Raw body around error:", rawBody.substring(160, 180));
    return new Response(
      JSON.stringify({ 
        error: "Invalid JSON in request body",
        message: parseError?.message,
        position: parseError?.message?.match(/position (\d+)/)?.[1]
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

  try {
    // Validate payload
    if (!payload || typeof payload !== "object") {
      return new Response(
        JSON.stringify({ error: "Invalid payload format" }),
        { 
          status: 400,
          headers: { 
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        }
      );
    }

    if (!payload.product || !payload.price || !payload.buyer || !payload.buyer.email) {
      return new Response(
        JSON.stringify({ 
          error: "Missing required fields",
          required: ["product", "price", "buyer.email"]
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

    const VA = Deno.env.get("IPAYMU_VA");
    const API_KEY = Deno.env.get("IPAYMU_API_KEY");
    const BASE_URL = Deno.env.get("BASE_URL") || "https://www.kontraktify.com";

    if (!VA || !API_KEY) {
      console.error("❌ Environment variables not set");
      return new Response(
        JSON.stringify({ error: "Environment variables not set" }),
        { 
          status: 500,
          headers: { 
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        }
      );
    }

    const referenceId = `KTF-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    const ts = timestamp();

    // PENTING: Body harus FormData dengan format array (product[], qty[], price[])
    const formData = new FormData();
    formData.append("product[]", payload.product || "Template Perjanjian Sewa Menyewa");
    formData.append("qty[]", "1");
    formData.append("price[]", payload.price.toString());
    // Webhook URL harus bisa diakses public (Supabase Edge Function)
    // Format: https://[project-ref].supabase.co/functions/v1/[function-name]
    const WEBHOOK_URL = "https://rcjwcgztmlygmmftklge.supabase.co/functions/v1/ipaymu-webhook";
    formData.append("notifyUrl", WEBHOOK_URL);
    formData.append("returnUrl", `${BASE_URL}/tools/templates/forms/receipt-sewa-menyewa.html?ref=${referenceId}`);
    formData.append("cancelUrl", `${BASE_URL}/tools/templates/forms/payment-sewa-menyewa.html?cancel=true`);
    formData.append("referenceId", referenceId);
    
    // Field names harus camelCase sesuai dokumentasi iPaymu
    if (payload.buyer?.name) formData.append("buyerName", payload.buyer.name);
    if (payload.buyer?.email) formData.append("buyerEmail", payload.buyer.email);
    if (payload.buyer?.phone) formData.append("buyerPhone", payload.buyer.phone);

    // Convert FormData to object untuk signature generation
    const signatureParams: Record<string, string> = {
      va: VA,
      timestamp: ts,
    };
    
    for (const [key, value] of formData.entries()) {
      signatureParams[key] = value.toString();
    }

    // Generate signature
    const signature = await generateSignature(signatureParams, API_KEY);
    
    console.log("📤 Request to iPaymu:", {
      url: IPAYMU_URL,
      va: VA,
      timestamp: ts,
      referenceId,
      hasBuyer: !!payload.buyer
    });

    // Call iPaymu API dengan FormData body
    let ipaymuRes: Response;
    try {
      ipaymuRes = await fetch(IPAYMU_URL, {
        method: "POST",
        headers: {
          va: VA,
          signature: signature,
          timestamp: ts,
        },
        body: formData, // Body sebagai FormData, bukan JSON!
      });
    } catch (fetchError: any) {
      console.error("❌ iPaymu fetch error:", fetchError);
      return new Response(
        JSON.stringify({ 
          error: "Failed to connect to iPaymu",
          message: fetchError?.message
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

    let result: any;
    try {
      const responseText = await ipaymuRes.text();
      console.log("📥 iPaymu raw response:", responseText);
      result = JSON.parse(responseText);
      console.log("📥 iPaymu parsed response:", result);
    } catch (parseError: any) {
      console.error("❌ iPaymu response parse error:", parseError);
      return new Response(
        JSON.stringify({ 
          error: "Invalid response from iPaymu",
          message: parseError?.message,
          status: ipaymuRes.status
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

    // Check response sesuai format iPaymu: Status: 200
    if (!ipaymuRes.ok || result.Status !== 200) {
      console.error("❌ iPaymu error response:", result);
      return new Response(
        JSON.stringify({ 
          error: result.Message || "Payment initiation failed",
          details: result,
          status: result.Status
        }),
        { 
          status: ipaymuRes.status || 400,
          headers: { 
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        }
      );
    }

    return new Response(
      JSON.stringify({
        paymentUrl: result.Data?.Url,
        sessionId: result.Data?.SessionID,
        referenceId: referenceId,
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
