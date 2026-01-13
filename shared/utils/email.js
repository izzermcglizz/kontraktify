// Email Service Utility
// Handles sending receipt and download link emails

const EMAIL_CONFIG = {
  // Email service endpoint (Supabase Edge Function or backend API)
  EMAIL_API_URL: 'https://pkujwqglpqbfpmspzwhw.supabase.co/functions/v1/send-email',
  // Fallback: Use email service API directly (for development)
  USE_DIRECT_API: false,
  FROM_EMAIL: 'noreply@kontraktify.com',
  FROM_NAME: 'Kontraktify'
};

/**
 * Send receipt email after successful payment
 * @param {Object} params - Email parameters
 * @param {string} params.to - Recipient email
 * @param {string} params.name - Recipient name
 * @param {string} params.referenceId - Payment reference ID
 * @param {number} params.amount - Payment amount
 * @param {string} params.paymentMethod - Payment method
 * @param {string} params.paymentDate - Payment date
 * @returns {Promise<Object>} Email send result
 */
async function sendReceiptEmail({ to, name, referenceId, amount, paymentMethod, paymentDate }) {
  try {
    const emailSubject = `Receipt Pembayaran - ${referenceId}`;
    
    const emailHTML = `
      <!DOCTYPE html>
      <html lang="id">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Receipt Pembayaran</title>
      </head>
      <body style="font-family: 'Poppins', Arial, sans-serif; line-height: 1.6; color: #0f0f10; background: #f5f5f5; padding: 20px; margin: 0;">
        <div style="max-width: 600px; margin: 0 auto; background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: #fff; padding: 40px 32px; text-align: center;">
            <div style="width: 64px; height: 64px; margin: 0 auto 16px; background: rgba(255, 255, 255, 0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 32px;">
              ✓
            </div>
            <h1 style="margin: 0; font-size: 1.5rem; font-weight: 600;">Pembayaran Berhasil!</h1>
            <p style="margin: 8px 0 0; font-size: 0.875rem; opacity: 0.9;">Terima kasih atas pembayaran Anda</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 32px;">
            <div style="margin-bottom: 24px; padding-bottom: 24px; border-bottom: 1px solid rgba(15, 15, 16, 0.08);">
              <div style="font-size: 0.875rem; font-weight: 500; color: rgba(15, 15, 16, 0.6); margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Detail Pembayaran</div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
                <span style="font-size: 0.875rem; color: rgba(15, 15, 16, 0.7);">Reference ID</span>
                <span style="font-size: 0.875rem; font-weight: 500; color: #0f0f10;">${referenceId}</span>
              </div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
                <span style="font-size: 0.875rem; color: rgba(15, 15, 16, 0.7);">Metode Pembayaran</span>
                <span style="font-size: 0.875rem; font-weight: 500; color: #0f0f10;">${paymentMethod}</span>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="font-size: 0.875rem; color: rgba(15, 15, 16, 0.7);">Tanggal Pembayaran</span>
                <span style="font-size: 0.875rem; font-weight: 500; color: #0f0f10;">${paymentDate}</span>
              </div>
            </div>
            
            <div style="margin-bottom: 24px; padding-bottom: 24px; border-bottom: 1px solid rgba(15, 15, 16, 0.08);">
              <div style="font-size: 0.875rem; font-weight: 500; color: rgba(15, 15, 16, 0.6); margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Detail Pesanan</div>
              <div style="display: flex; justify-content: space-between;">
                <span style="font-size: 0.875rem; color: rgba(15, 15, 16, 0.7);">Dokumen</span>
                <span style="font-size: 0.875rem; font-weight: 500; color: #0f0f10;">Perjanjian Sewa Menyewa Tempat</span>
              </div>
            </div>
            
            <div style="background: rgba(16, 185, 129, 0.05); padding: 20px; border-radius: 12px; margin-top: 24px;">
              <div style="display: flex; justify-content: space-between;">
                <span style="font-size: 0.875rem; color: rgba(15, 15, 16, 0.7);">Total Pembayaran</span>
                <span style="font-size: 1.25rem; font-weight: 600; color: #10b981;">Rp ${amount.toLocaleString('id-ID')}</span>
              </div>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="padding: 24px 32px; background: #f9fafb; border-top: 1px solid rgba(15, 15, 16, 0.08); text-align: center;">
            <p style="margin: 0; font-size: 0.75rem; color: rgba(15, 15, 16, 0.6);">
              Email ini dikirim otomatis. Jangan balas email ini.
            </p>
            <p style="margin: 8px 0 0; font-size: 0.75rem; color: rgba(15, 15, 16, 0.6);">
              © ${new Date().getFullYear()} Kontraktify. All rights reserved.
            </p>
          </div>
        </div>
      </body>
      </html>
    `;
    
    // Call email API (Supabase Edge Function or backend)
    const response = await fetch(EMAIL_CONFIG.EMAIL_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: to,
        subject: emailSubject,
        html: emailHTML,
        from: EMAIL_CONFIG.FROM_EMAIL,
        fromName: EMAIL_CONFIG.FROM_NAME
      })
    });
    
    if (!response.ok) {
      throw new Error(`Email API returned ${response.status}`);
    }
    
    const result = await response.json();
    return {
      success: true,
      messageId: result.messageId || result.id
    };
  } catch (error) {
    console.error('Error sending receipt email:', error);
    // Don't throw error - email failure shouldn't block the flow
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Send download link email
 * @param {Object} params - Email parameters
 * @param {string} params.to - Recipient email
 * @param {string} params.name - Recipient name
 * @param {string} params.downloadLink - Download link URL
 * @param {string} params.documentName - Document name
 * @param {string} params.referenceId - Payment reference ID
 * @returns {Promise<Object>} Email send result
 */
async function sendDownloadLinkEmail({ to, name, downloadLink, documentName, referenceId }) {
  try {
    const emailSubject = `Link Download Dokumen - ${documentName}`;
    
    const emailHTML = `
      <!DOCTYPE html>
      <html lang="id">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Link Download Dokumen</title>
      </head>
      <body style="font-family: 'Poppins', Arial, sans-serif; line-height: 1.6; color: #0f0f10; background: #f5f5f5; padding: 20px; margin: 0;">
        <div style="max-width: 600px; margin: 0 auto; background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: #fff; padding: 40px 32px; text-align: center;">
            <div style="width: 64px; height: 64px; margin: 0 auto 16px; background: rgba(255, 255, 255, 0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 32px;">
              📄
            </div>
            <h1 style="margin: 0; font-size: 1.5rem; font-weight: 600;">Dokumen Siap Diunduh</h1>
            <p style="margin: 8px 0 0; font-size: 0.875rem; opacity: 0.9;">Dokumen Anda telah siap untuk diunduh</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 32px;">
            <p style="font-size: 0.875rem; color: rgba(15, 15, 16, 0.7); margin-bottom: 24px;">
              Halo ${name},
            </p>
            
            <p style="font-size: 0.875rem; color: rgba(15, 15, 16, 0.7); margin-bottom: 24px;">
              Terima kasih telah melakukan pembayaran. Dokumen <strong>${documentName}</strong> Anda telah siap untuk diunduh.
            </p>
            
            <div style="text-align: center; margin: 32px 0;">
              <a href="${downloadLink}" style="display: inline-block; padding: 16px 32px; background: #10b981; color: #fff; border-radius: 12px; text-decoration: none; font-weight: 500; font-size: 0.875rem; box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);">
                Download Dokumen
              </a>
            </div>
            
            <div style="background: rgba(16, 185, 129, 0.05); padding: 16px; border-left: 3px solid #10b981; border-radius: 8px; margin-top: 24px;">
              <p style="margin: 0; font-size: 0.8125rem; color: rgba(15, 15, 16, 0.7); line-height: 1.6;">
                <strong style="color: #10b981;">Catatan:</strong> Link download ini berlaku selama 30 hari. Silakan simpan dokumen Anda setelah mengunduh.
              </p>
            </div>
            
            <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid rgba(15, 15, 16, 0.08);">
              <p style="margin: 0; font-size: 0.75rem; color: rgba(15, 15, 16, 0.5);">
                Reference ID: <strong>${referenceId}</strong>
              </p>
              <p style="margin: 8px 0 0; font-size: 0.75rem; color: rgba(15, 15, 16, 0.5);">
                Jika tombol tidak berfungsi, salin dan buka link berikut di browser Anda:
              </p>
              <p style="margin: 8px 0 0; font-size: 0.75rem; color: #10b981; word-break: break-all;">
                ${downloadLink}
              </p>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="padding: 24px 32px; background: #f9fafb; border-top: 1px solid rgba(15, 15, 16, 0.08); text-align: center;">
            <p style="margin: 0; font-size: 0.75rem; color: rgba(15, 15, 16, 0.6);">
              Email ini dikirim otomatis. Jangan balas email ini.
            </p>
            <p style="margin: 8px 0 0; font-size: 0.75rem; color: rgba(15, 15, 16, 0.6);">
              © ${new Date().getFullYear()} Kontraktify. All rights reserved.
            </p>
          </div>
        </div>
      </body>
      </html>
    `;
    
    // Call email API (Supabase Edge Function or backend)
    const response = await fetch(EMAIL_CONFIG.EMAIL_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: to,
        subject: emailSubject,
        html: emailHTML,
        from: EMAIL_CONFIG.FROM_EMAIL,
        fromName: EMAIL_CONFIG.FROM_NAME
      })
    });
    
    if (!response.ok) {
      throw new Error(`Email API returned ${response.status}`);
    }
    
    const result = await response.json();
    return {
      success: true,
      messageId: result.messageId || result.id
    };
  } catch (error) {
    console.error('Error sending download link email:', error);
    // Don't throw error - email failure shouldn't block the flow
    return {
      success: false,
      error: error.message
    };
  }
}

// Export for use in other files
if (typeof window !== 'undefined') {
  window.sendReceiptEmail = sendReceiptEmail;
  window.sendDownloadLinkEmail = sendDownloadLinkEmail;
  window.EMAIL_CONFIG = EMAIL_CONFIG;
}

