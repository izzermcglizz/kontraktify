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
    if (!formData.email) {
      alert("Email harus diisi untuk melanjutkan pembayaran.");
      return;
    }
    
    const payload = {
      product: "Template Perjanjian Sewa Menyewa",
      price: 10000,
      buyer: {
        name:
          formData.nama_penyewa ||
          formData.nama ||
          "Customer",
        email: formData.email.trim(),
        phone: normalisePhone(
          formData.phone || formData.no_hp
        ),
      },
    };

    const res = await fetch(SUPABASE_FUNCTION_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    let data;
    try {
      data = await res.json();
    } catch {
      throw new Error("Invalid JSON response from server");
    }

    if (!res.ok || !data.paymentUrl) {
      console.error("Payment initiation failed:", data);
      alert(
        "Gagal memulai pembayaran. Silakan coba lagi atau hubungi support."
      );
      return;
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
    console.error("Payment fatal error:", err);
    alert(
      "Terjadi kesalahan sistem saat memproses pembayaran. Silakan coba lagi."
    );
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
