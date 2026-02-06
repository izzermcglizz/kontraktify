/**
 * Supabase Edge Function URL
 * (sesuai project ref + nama function yang ADA)
 */
const SUPABASE_FUNCTION_URL =
  "https://rcjwcgztmlygmnftklge.supabase.co/functions/v1/dynamic-service";

/**
 * Supabase Anon Key (untuk authorization)
 * 
 * Cara mendapatkan:
 * 1. Buka Supabase Dashboard → Project Settings → API
 * 2. Copy "anon" atau "public" key
 * 3. Paste di bawah ini
 * 
 * Atau jika function tidak require auth, bisa dikosongkan
 */
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJjandjZ3p0bWx5Z21uZnRrbGdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgzNjY5MzksImV4cCI6MjA4Mzk0MjkzOX0.A-V0MLrY43fJt_aqWYRCssTJSOtBV0iBNOdavmOup0I";

/**
 * Initiate payment via Supabase Edge Function
 */
async function initiatePayment(formData) {
  try {
    console.log("🚀 initiatePayment called with formData:", formData);
    
    // Validate required fields - check buyer object first, then formData
    let email = null;
    if (formData.buyer && formData.buyer.email) {
      email = formData.buyer.email.trim();
    } else if (formData.email) {
      email = formData.email.trim();
    }
    
    if (!email) {
      alert("Email harus diisi untuk melanjutkan pembayaran.");
      return;
    }
    
    // Use buyer object if provided, otherwise construct from formData fields
    let buyerData;
    if (formData.buyer && formData.buyer.name && formData.buyer.email && formData.buyer.phone) {
      // Use buyer object from preview page
      buyerData = {
        name: formData.buyer.name.trim(),
        email: formData.buyer.email.trim(),
        phone: normalisePhone(formData.buyer.phone)
      };
      console.log("✅ Using buyer object from formData:", buyerData);
    } else {
      // Fallback to formData fields
      buyerData = {
        name:
          formData.nama_penyewa ||
          formData.nama ||
          "Customer",
        email: email,
        phone: normalisePhone(
          formData.phone || formData.no_hp
        ),
      };
      console.log("✅ Using fallback buyer data:", buyerData);
    }

    const payload = {
      product: "Template Perjanjian Sewa Menyewa",
      price: 10000,
      buyer: buyerData,
    };

    console.log("🚀 Initiating payment...", {
      url: SUPABASE_FUNCTION_URL,
      payload: payload
    });

    let res;
    try {
      console.log("📤 Sending request to:", SUPABASE_FUNCTION_URL);
      console.log("📤 Payload:", JSON.stringify(payload, null, 2));
      
      // Prepare headers with authorization
      const headers = {
        "Content-Type": "application/json",
      };
      
      // Add authorization header if anon key is set
      // Supabase Edge Functions require apikey header for authentication
      if (SUPABASE_ANON_KEY && SUPABASE_ANON_KEY.trim() !== "") {
        headers["apikey"] = SUPABASE_ANON_KEY;
        headers["Authorization"] = `Bearer ${SUPABASE_ANON_KEY}`;
        console.log("✅ Using authorization header (apikey and Authorization)");
      } else {
        console.warn("⚠️ No anon key provided!");
        console.warn("⚠️ SUPABASE_ANON_KEY is:", SUPABASE_ANON_KEY);
        console.warn("⚠️ Function may require authentication - you will get 401 error");
        console.warn("⚠️ Please set SUPABASE_ANON_KEY in payment.js");
      }
      
      console.log("📤 Request headers:", headers);
      
      res = await fetch(SUPABASE_FUNCTION_URL, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(payload),
      });
      
      console.log("📥 Response status:", res.status, res.statusText);
      console.log("📥 Response headers:", Object.fromEntries(res.headers.entries()));
    } catch (fetchError) {
      console.error("❌ Fetch error details:", {
        name: fetchError.name,
        message: fetchError.message,
        stack: fetchError.stack,
        cause: fetchError.cause
      });
      
      // More specific error message
      let errorMsg = "Gagal terhubung ke server pembayaran.";
      if (fetchError.message.includes("Failed to fetch") || fetchError.message.includes("Load failed")) {
        errorMsg += "\n\nKemungkinan penyebab:";
        errorMsg += "\n• Edge Function belum di-deploy";
        errorMsg += "\n• Masalah koneksi internet";
        errorMsg += "\n• URL Edge Function tidak valid";
        errorMsg += `\n\nURL yang dicoba: ${SUPABASE_FUNCTION_URL}`;
      } else {
        errorMsg += `\n\nDetail: ${fetchError.message}`;
      }
      
      throw new Error(errorMsg);
    }

    let data;
    try {
      const responseText = await res.text();
      console.log("📥 Raw response text:", responseText);
      
      if (!responseText || responseText.trim() === '') {
        throw new Error("Empty response from server");
      }
      
      data = JSON.parse(responseText);
      console.log("📥 Parsed response:", data);
    } catch (parseError) {
      console.error("❌ Response parse error:", parseError);
      const responseText = await res.text().catch(() => "Could not read response");
      throw new Error(`Invalid response from server: ${parseError.message}\n\nResponse: ${responseText.substring(0, 200)}`);
    }

    if (!res.ok) {
      console.error("Payment initiation failed - Response not OK:", {
        status: res.status,
        statusText: res.statusText,
        data: data,
        headers: Object.fromEntries(res.headers.entries())
      });
      
      // Show more specific error message
      let errorMessage = "Gagal memulai pembayaran.";
      
      if (res.status === 401) {
        errorMessage += "\n\nError: Unauthorized (401)";
        errorMessage += "\n\nKemungkinan penyebab:";
        errorMessage += "\n• Supabase anon key belum diisi atau salah";
        errorMessage += "\n• Edge Function memerlukan authorization";
        errorMessage += "\n\nSolusi:";
        errorMessage += "\n1. Buka Supabase Dashboard → Settings → API";
        errorMessage += "\n2. Copy 'anon' atau 'public' key";
        errorMessage += "\n3. Update SUPABASE_ANON_KEY di payment.js";
        errorMessage += "\n\nAtau set Edge Function tidak require auth di Supabase Dashboard";
      } else if (data && data.error) {
        errorMessage += `\n\nError: ${data.error}`;
        if (data.message) {
          errorMessage += `\n\nDetail: ${data.message}`;
        }
      } else if (data && data.message) {
        errorMessage += `\n\n${data.message}`;
      } else {
        errorMessage += `\n\nStatus: ${res.status} ${res.statusText}`;
      }
      
      errorMessage += "\n\nSilakan coba lagi atau hubungi support.";
      alert(errorMessage);
      throw new Error(`Payment failed: ${res.status} ${res.statusText}`);
    }

    if (!data.paymentUrl) {
      console.error("Payment initiation failed - No paymentUrl:", data);
      alert(
        "Gagal memulai pembayaran. Payment URL tidak ditemukan.\n\nSilakan coba lagi atau hubungi support."
      );
      throw new Error("Payment URL not found in response");
    }

    // Simpan info minimum untuk receipt / tracking
    sessionStorage.setItem(
      "paymentInfo",
      JSON.stringify({
        referenceId: data.referenceId,
        amount: payload.price,
      })
    );

    // Redirect user ke halaman pembayaran iPaymu
    window.location.href = data.paymentUrl;
  } catch (err) {
    console.error("❌ Payment fatal error:", {
      name: err.name,
      message: err.message,
      stack: err.stack,
      cause: err.cause
    });
    
    // More detailed error message
    let errorMessage = "Terjadi kesalahan saat memproses pembayaran.";
    
    if (err.message) {
      errorMessage += `\n\nDetail: ${err.message}`;
    }
    
    // Check for specific error types
    if (err.name === "TypeError" && (err.message.includes("fetch") || err.message.includes("Load failed"))) {
      errorMessage += "\n\nKemungkinan penyebab:";
      errorMessage += "\n• Supabase Edge Function belum di-deploy";
      errorMessage += "\n• Masalah koneksi internet";
      errorMessage += "\n• URL Edge Function tidak valid atau tidak dapat diakses";
      errorMessage += `\n\nURL: ${SUPABASE_FUNCTION_URL}`;
      errorMessage += "\n\nSilakan:";
      errorMessage += "\n1. Cek console browser (F12) untuk detail error";
      errorMessage += "\n2. Pastikan Edge Function sudah di-deploy";
      errorMessage += "\n3. Coba refresh halaman dan ulangi";
    } else if (err.message.includes("Gagal terhubung")) {
      // Already has detailed message, don't add more
    } else {
      errorMessage += "\n\nSilakan cek console browser (F12) untuk detail lebih lanjut.";
    }
    
    errorMessage += "\n\nSilakan coba lagi atau hubungi support jika masalah berlanjut.";
    
    alert(errorMessage);
    
    // Re-throw to allow caller to handle button state
    throw err;
  }
}

/**
 * Normalise Indonesian phone number → 628xxxx
 */
function normalisePhone(phone) {
  if (!phone) return "628123456789";

  let p = String(phone).replace(/\D/g, "");

  if (p.startsWith("0")) {
    p = "62" + p.slice(1);
  }

  if (!p.startsWith("62")) {
    p = "62" + p;
  }

  // Validate minimum length (62 + at least 8 digits)
  if (p.length < 10) {
    console.warn("Phone number too short after normalization:", p);
    return "628123456789"; // Fallback to default
  }

  return p;
}

// Expose ke global (buat dipanggil dari HTML / inline script)
if (typeof window !== "undefined") {
  window.initiatePayment = initiatePayment;
}
