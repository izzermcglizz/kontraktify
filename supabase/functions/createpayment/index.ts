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
async function md5(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest("MD5", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
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

  try {
    const payload = await req.json();

    const VA = Deno.env.get("IPAYMU_VA");
    const API_KEY = Deno.env.get("IPAYMU_API_KEY");
    const BASE_URL = Deno.env.get("BASE_URL") || "https://www.kontraktify.com";

    if (!VA || !API_KEY) {
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
    formData.append("notifyUrl", `${BASE_URL}/tools/templates/forms/notify`);
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

    // Call iPaymu API dengan FormData body
    const ipaymuRes = await fetch(IPAYMU_URL, {
      method: "POST",
      headers: {
        va: VA,
        signature: signature,
        timestamp: ts,
      },
      body: formData, // Body sebagai FormData, bukan JSON!
    });

    const result = await ipaymuRes.json();

    // Check response sesuai format iPaymu: Status: 200
    if (!ipaymuRes.ok || result.Status !== 200) {
      return new Response(
        JSON.stringify({ 
          error: result.Message || "Payment initiation failed",
          details: result
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

  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ 
        error: "Internal server error",
        message: error.message 
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
