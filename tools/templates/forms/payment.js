/**
 * Supabase Edge Function URL
 * (sesuai project ref + nama function yang ADA)
 */
const SUPABASE_FUNCTION_URL =
  "https://rcjwcgztmlygmmftklge.supabase.co/functions/v1/createpayment";

/**
 * Initiate payment via Supabase Edge Function
 */
async function initiatePayment(formData) {
  try {
    // Validate required fields
    if (!formData.email || !formData.email.trim()) {
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
    } else {
      // Fallback to formData fields
      buyerData = {
        name:
          formData.nama_penyewa ||
          formData.nama ||
          "Customer",
        email: formData.email.trim(),
        phone: normalisePhone(
          formData.phone || formData.no_hp
        ),
      };
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

    const res = await fetch(SUPABASE_FUNCTION_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).catch((fetchError) => {
      console.error("❌ Fetch error details:", {
        name: fetchError.name,
        message: fetchError.message,
        stack: fetchError.stack
      });
      throw fetchError;
    });

    let data;
    try {
      data = await res.json();
    } catch {
      throw new Error("Invalid JSON response from server");
    }

    if (!res.ok) {
      console.error("Payment initiation failed - Response not OK:", {
        status: res.status,
        statusText: res.statusText,
        data: data
      });
      
      // Show more specific error message
      let errorMessage = "Gagal memulai pembayaran.";
      if (data && data.error) {
        errorMessage += `\n\nError: ${data.error}`;
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
    
    if (err.name === "TypeError" && err.message.includes("fetch")) {
      errorMessage += "\n\nKemungkinan penyebab:";
      errorMessage += "\n• Masalah koneksi internet";
      errorMessage += "\n• Supabase Edge Function belum di-deploy";
      errorMessage += "\n• Masalah CORS (hubungi developer)";
      errorMessage += "\n\nSilakan cek console browser untuk detail lebih lanjut.";
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
