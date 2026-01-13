// Payment configuration and methods
// Supports: Virtual Account, QRIS, E-Wallet

// Helper to decode credentials (simple obfuscation)
function getConfigValue(encoded) {
  try {
    return atob(encoded);
  } catch (e) {
    return encoded; // Fallback if decoding fails
  }
}

const PAYMENT_CONFIG = {
  VA: getConfigValue('MTE3OTAwNTc3NjYwNDY4NQ=='),
  API_KEY: getConfigValue('N0ZFRTQ0REQtMkRGRi00MkQ1LUIyQ0EtODEwMTU3MDlBMTQz'),
  PRICE: 10000, // Testing price (minimal iPaymu: 1000)
  BASE_URL: 'https://kontraktify.com' // Change to your actual domain
};

// Available payment methods
const PAYMENT_METHODS = {
  VA: {
    name: 'Virtual Account',
    icon: '🏦',
    description: 'Transfer via Virtual Account',
    channels: {
      bca: { name: 'BCA', method: 'va', channel: 'bca' },
      mandiri: { name: 'Mandiri', method: 'va', channel: 'mandiri' },
      bni: { name: 'BNI', method: 'va', channel: 'bni' },
      bri: { name: 'BRI', method: 'va', channel: 'bri' }
    }
  },
  QRIS: {
    name: 'QRIS',
    icon: '📱',
    description: 'Scan QR Code',
    channels: {
      qris: { name: 'QRIS', method: 'qris', channel: 'qris' }
    }
  },
  E_WALLET: {
    name: 'E-Wallet',
    icon: '💳',
    description: 'E-Wallet Payment',
    channels: {
      ovo: { name: 'OVO', method: 'ewallet', channel: 'ovo' },
      dana: { name: 'DANA', method: 'ewallet', channel: 'dana' },
      linkaja: { name: 'LinkAja', method: 'ewallet', channel: 'linkaja' },
      shopeepay: { name: 'ShopeePay', method: 'ewallet', channel: 'shopeepay' }
    }
  }
};

// SHA256 and HMAC-SHA256 using Web Crypto API
async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function hmacSha256(message, key) {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(key);
  const messageData = encoder.encode(message);
  
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  
  const signature = await crypto.subtle.sign('HMAC', cryptoKey, messageData);
  const hashArray = Array.from(new Uint8Array(signature));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Clean payment data
function cleanPaymentData(data) {
  const cleaned = {};
  
  Object.keys(data).forEach(key => {
    let value = data[key];
    
    if (value === null || value === undefined) {
      return;
    }
    
    if (typeof value === 'number') {
      cleaned[key] = value;
      return;
    }
    
    if (Array.isArray(value)) {
      cleaned[key] = value.map(item => {
        if (item === null || item === undefined) return '';
        return String(item).replace(/[`'"]/g, '').trim();
      });
    } else {
      cleaned[key] = String(value).replace(/[`'"]/g, '').trim();
    }
  });
  
  return cleaned;
}

// Generate iPaymu signature
async function generateIpaymuSignature(va, apiKey, bodyString, timestamp) {
  try {
    const requestBody = await sha256(bodyString);
    const stringToSign = `POST:${va}:${requestBody}:${apiKey}`;
    const signature = await hmacSha256(stringToSign, apiKey);
    
    console.log('=== iPaymu Signature Debug (v2) ===');
    console.log('VA:', va);
    console.log('API Key (first 10):', apiKey.substring(0, 10) + '...');
    console.log('Body (JSON):', bodyString);
    console.log('RequestBody (SHA256 of body):', requestBody);
    console.log('String to sign:', stringToSign);
    console.log('Signature (HMAC-SHA256):', signature);
    console.log('Timestamp:', timestamp);
    console.log('===================================');
    
    return signature;
  } catch (error) {
    console.error('Error generating signature:', error);
    throw new Error('Crypto API not available. Please use a modern browser.');
  }
}

// Initiate payment with iPaymu
// User will choose payment method on iPaymu payment page
async function initiatePayment(formData) {
  try {
    const { VA, API_KEY, PRICE, BASE_URL } = PAYMENT_CONFIG;
    
    // Get proper base URL
    let baseUrl = window.location.origin;
    if (baseUrl.startsWith('file://')) {
      baseUrl = BASE_URL;
    }
    
    // Clean pathname
    let cleanPath = window.location.pathname;
    if (cleanPath.includes('/Users/') || cleanPath.includes('kontraktify/')) {
      cleanPath = cleanPath.split('/').pop() || '/tools/templates/forms/payment-sewa-menyewa.html';
    }
    
    // Generate unique reference ID
    const refTimestamp = Date.now();
    const randomStr = Math.random().toString(36).substr(2, 9).toUpperCase();
    const referenceId = `SEWA${refTimestamp}${randomStr}`.substring(0, 50);
    
    // Set return URL to receipt page
    const returnUrl = `${baseUrl}/tools/templates/forms/receipt-sewa-menyewa.html?status=success&referenceId=${referenceId}`;
    const cancelUrl = `${baseUrl}/tools/templates/forms/payment-sewa-menyewa.html?status=cancelled`;
    
    // Get timestamp for iPaymu (format: YYYYMMDDHHmmss)
    const now = new Date();
    const timestamp = now.getFullYear().toString() +
      String(now.getMonth() + 1).padStart(2, '0') +
      String(now.getDate()).padStart(2, '0') +
      String(now.getHours()).padStart(2, '0') +
      String(now.getMinutes()).padStart(2, '0') +
      String(now.getSeconds()).padStart(2, '0');
    
    // Prepare request body - let iPaymu handle payment method selection
    // User will choose payment method on iPaymu payment page
    const rawRequestBody = {
      name: (formData.nama_penyewa || formData.nama || 'Customer').trim(),
      phone: (formData.phone || formData.no_hp || '081234567890').trim(),
      email: (formData.email || 'customer@example.com').trim(),
      amount: PRICE,
      notifyUrl: `${baseUrl}/api/payment/notify`,
      returnUrl: returnUrl,
      cancelUrl: cancelUrl,
      referenceId: referenceId
      // Tidak perlu kirim paymentMethod dan paymentChannel
      // Biarkan user pilih di halaman iPaymu
    };
    
    // Clean the data
    const requestBody = cleanPaymentData(rawRequestBody);
    
    // Validate
    Object.keys(requestBody).forEach(key => {
      if (requestBody[key] === null || requestBody[key] === undefined) {
        throw new Error(`Parameter ${key} cannot be null or undefined`);
      }
    });
    
    // Store form data in sessionStorage
    sessionStorage.setItem('pendingDocument', JSON.stringify({
      formData: formData,
      referenceId: referenceId,
      timestamp: Date.now()
    }));
    
    // Convert body to JSON string
    const sortedBody = {};
    Object.keys(requestBody).sort().forEach(key => {
      sortedBody[key] = requestBody[key];
    });
    const bodyString = JSON.stringify(sortedBody).replace(/\\\//g, '/');
    
    // Generate signature
    const signature = await generateIpaymuSignature(VA, API_KEY, bodyString, timestamp);
    
    // Call iPaymu API (Production)
    const response = await fetch('https://my.ipaymu.com/api/v2/payment/direct', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'va': VA,
        'signature': signature,
        'timestamp': timestamp
      },
      body: bodyString
    });
    
    const result = await response.json();
    
    console.log('iPaymu API Response:', result);
    console.log('Response Data:', result.Data);
    
    if (result.Status === 200 && result.Success === true) {
      // Check for payment URL - iPaymu returns payment URL where user can choose payment method
      const paymentUrl = result.Data?.Url || 
                        result.Data?.url || 
                        result.Data?.paymentUrl || 
                        result.Data?.PaymentUrl ||
                        result.Data?.SessionUrl ||
                        result.Data?.sessionUrl ||
                        result.Data?.redirectUrl ||
                        result.Data?.RedirectUrl ||
                        result.Data?.Link ||
                        result.Data?.link ||
                        result.Url || 
                        result.url;
      
      console.log('=== Payment URL Check ===');
      console.log('Payment URL found:', paymentUrl);
      console.log('Full result.Data:', result.Data);
      console.log('All result.Data keys:', Object.keys(result.Data || {}));
      
      // Always redirect to iPaymu payment page if URL is available
      // User will choose payment method on iPaymu page
      if (paymentUrl && paymentUrl.startsWith('http')) {
        console.log('✅ Payment URL received. Redirecting to iPaymu payment page...');
        // Store payment info for receipt page
        sessionStorage.setItem('paymentInfo', JSON.stringify({
          referenceId: referenceId,
          amount: PRICE,
          paymentUrl: paymentUrl
        }));
        // Redirect directly to iPaymu payment page
        window.location.href = paymentUrl;
        return;
      } else {
        // No URL - this should not happen if payment URL is returned correctly
        // But keep for error handling
        console.error('Payment URL not found in response. Response data:', result.Data);
        throw new Error('Payment URL tidak ditemukan dalam response dari iPaymu. Silakan coba lagi atau hubungi support.');
      }
    } else {
      const errorMsg = result.Keterangan || result.Message || result.Error || 'Payment initiation failed';
      console.error('Payment failed:', result);
      throw new Error(errorMsg);
    }
  } catch (error) {
    console.error('Payment error:', error);
    throw error;
  }
}

// Show payment information on payment page
function showPaymentInfo(paymentInfo) {
  if (!window.location.pathname.includes('payment-sewa-menyewa.html')) {
    sessionStorage.setItem('paymentInfo', JSON.stringify(paymentInfo));
    window.location.href = 'payment-sewa-menyewa.html?payment=success';
    return;
  }
  
  const paymentInfoCard = document.getElementById('paymentInfoCard');
  const paymentInfoContent = document.getElementById('paymentInfoContent');
  
  if (paymentInfoCard && paymentInfoContent) {
    let infoHTML = '';
    
    // Show QR Code if available (for QRIS)
    // Priority: QR Code URL from iPaymu (most reliable) > Generate from QRIS string
    // If QrUrl is available, embed it in iframe (it's the QR Code page from iPaymu)
    if (paymentInfo.qrCodeUrl && paymentInfo.qrCodeUrl.startsWith('http') && paymentInfo.qrCodeUrl.includes('qris')) {
      // Embed QR Code page from iPaymu in iframe - this is the most reliable way
      infoHTML += `
        <div style="text-align: center; margin-bottom: 24px;">
          <div style="background: #fff; border: 1px solid rgba(15, 15, 16, 0.1); border-radius: 12px; padding: 20px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05); display: inline-block;">
            <iframe src="${paymentInfo.qrCodeUrl}" style="width: 300px; height: 300px; border: none; border-radius: 8px;" frameborder="0" scrolling="no" allow="payment"></iframe>
          </div>
          <p style="margin-top: 16px; font-size: 0.875rem; color: rgba(15, 15, 16, 0.7); font-weight: 500;">Scan QR Code dengan aplikasi pembayaran Anda (GoPay, OVO, DANA, LinkAja, dll)</p>
          <p style="margin-top: 8px; font-size: 0.75rem; color: rgba(15, 15, 16, 0.5);">
            <a href="${paymentInfo.qrCodeUrl}" target="_blank" style="color: #10b981; text-decoration: none;">Buka di halaman baru jika QR Code tidak muncul</a>
          </p>
        </div>
      `;
    } else if (paymentInfo.qrCodeString && paymentInfo.qrCodeString.length > 50) {
      // Generate QR Code from QRIS string (fallback)
      const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(paymentInfo.qrCodeString)}`;
      infoHTML += `
        <div style="text-align: center; margin-bottom: 24px;">
          <img src="${qrImageUrl}" alt="QR Code" style="max-width: 280px; width: 100%; border: 1px solid rgba(15, 15, 16, 0.1); border-radius: 12px; padding: 20px; background: #fff; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);" />
          <p style="margin-top: 16px; font-size: 0.875rem; color: rgba(15, 15, 16, 0.7); font-weight: 500;">Scan QR Code dengan aplikasi pembayaran Anda</p>
          ${paymentInfo.qrCodeUrl ? `<p style="margin-top: 8px; font-size: 0.75rem; color: rgba(15, 15, 16, 0.5);"><a href="${paymentInfo.qrCodeUrl}" target="_blank" style="color: #10b981; text-decoration: none;">Atau buka halaman QR Code iPaymu</a></p>` : ''}
        </div>
      `;
    } else if (paymentInfo.qrCodeUrl && paymentInfo.qrCodeUrl.startsWith('http')) {
      // Direct QR Code image URL from iPaymu
      infoHTML += `
        <div style="text-align: center; margin-bottom: 24px;">
          <img src="${paymentInfo.qrCodeUrl}" alt="QR Code" style="max-width: 280px; width: 100%; border: 1px solid rgba(15, 15, 16, 0.1); border-radius: 12px; padding: 20px; background: #fff; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);" />
          <p style="margin-top: 16px; font-size: 0.875rem; color: rgba(15, 15, 16, 0.7); font-weight: 500;">Scan QR Code dengan aplikasi pembayaran Anda</p>
        </div>
      `;
    } else if (paymentInfo.qrCodeString) {
      // Generate QR Code from QRIS string using QR code generator API
      const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(paymentInfo.qrCodeString)}`;
      infoHTML += `
        <div style="text-align: center; margin-bottom: 24px;">
          <img src="${qrImageUrl}" alt="QR Code" style="max-width: 280px; width: 100%; border: 1px solid rgba(15, 15, 16, 0.1); border-radius: 12px; padding: 20px; background: #fff; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);" />
          <p style="margin-top: 16px; font-size: 0.875rem; color: rgba(15, 15, 16, 0.7); font-weight: 500;">Scan QR Code dengan aplikasi pembayaran Anda</p>
        </div>
      `;
    } else if (paymentInfo.method === 'QRIS') {
      // For QRIS, check if paymentNo contains QRIS string (long string)
      // QRIS string is usually very long (100+ characters)
      const qrisData = paymentInfo.qrCodeString || 
                      paymentInfo.qrCodeUrl ||
                      (paymentInfo.paymentNo && paymentInfo.paymentNo.length > 50 ? paymentInfo.paymentNo : null);
      
      console.log('QRIS Data for QR Code:', qrisData);
      console.log('QRIS Data length:', qrisData ? qrisData.length : 0);
      
      if (qrisData) {
        // Generate QR Code from QRIS string
        const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qrisData)}`;
        infoHTML += `
          <div style="text-align: center; margin-bottom: 24px;">
            <img src="${qrImageUrl}" alt="QR Code" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';" style="max-width: 280px; width: 100%; border: 1px solid rgba(15, 15, 16, 0.1); border-radius: 12px; padding: 20px; background: #fff; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);" />
            <p style="display: none; margin-top: 16px; font-size: 0.875rem; color: rgba(239, 68, 68, 0.8);">Gagal memuat QR Code. Silakan coba refresh halaman.</p>
            <p style="margin-top: 16px; font-size: 0.875rem; color: rgba(15, 15, 16, 0.7); font-weight: 500;">Scan QR Code dengan aplikasi pembayaran Anda</p>
          </div>
        `;
      } else {
        // No QR data available - show message
        infoHTML += `
          <div style="text-align: center; margin-bottom: 24px; padding: 20px; background: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: 12px;">
            <p style="font-size: 0.875rem; color: rgba(15, 15, 16, 0.7);">QR Code sedang diproses. Silakan refresh halaman atau hubungi support jika masalah berlanjut.</p>
          </div>
        `;
      }
    }
    
    // Show payment number for VA (not for QRIS)
    if (paymentInfo.paymentNo && paymentInfo.method !== 'QRIS') {
      infoHTML += `
        <div class="payment-info-item">
          <span class="payment-info-label">Nomor ${paymentInfo.method}:</span>
          <span class="payment-info-value">${paymentInfo.paymentNo}</span>
        </div>
      `;
    }
    
    infoHTML += `
      <div class="payment-info-item">
        <span class="payment-info-label">Jumlah:</span>
        <span class="payment-info-value">Rp ${paymentInfo.amount.toLocaleString('id-ID')}</span>
      </div>
    `;
    
    if (paymentInfo.expired) {
      infoHTML += `
        <div class="payment-info-item">
          <span class="payment-info-label">Batas Waktu:</span>
          <span class="payment-info-value">${paymentInfo.expired}</span>
        </div>
      `;
    }
    
    infoHTML += `
      <div class="payment-info-item">
        <span class="payment-info-label">Reference ID:</span>
        <span class="payment-info-value">${paymentInfo.referenceId}</span>
      </div>
    `;
    
    // Add "Sudah Bayar?" button
    infoHTML += `
      <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid rgba(15, 15, 16, 0.08);">
        <button id="checkPaymentBtn" class="btn btn--primary btn--full" style="width: 100%; padding: 14px 24px; background: #10b981; color: #fff; border: none; border-radius: 10px; font-size: 0.875rem; font-weight: 500; font-family: 'Poppins', system-ui, sans-serif; cursor: pointer; transition: all 0.3s ease;">
          <span id="checkPaymentBtnText">Sudah Bayar? Cek Status Pembayaran</span>
          <span id="checkPaymentBtnLoading" style="display: none;">Memeriksa...</span>
        </button>
        <div id="paymentStatusMessage" style="margin-top: 12px; padding: 12px; border-radius: 8px; display: none; font-size: 0.875rem;"></div>
      </div>
    `;
    
    paymentInfoContent.innerHTML = infoHTML;
    paymentInfoCard.style.display = 'block';
    
    paymentInfoCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    const paymentMethods = document.querySelector('.payment-methods');
    const proceedBtn = document.getElementById('proceedPaymentBtn');
    if (paymentMethods) paymentMethods.style.display = 'none';
    if (proceedBtn) proceedBtn.style.display = 'none';
    
    // Handle check payment button
    const checkPaymentBtn = document.getElementById('checkPaymentBtn');
    if (checkPaymentBtn && paymentInfo.referenceId) {
      checkPaymentBtn.addEventListener('click', async () => {
        const btnText = document.getElementById('checkPaymentBtnText');
        const btnLoading = document.getElementById('checkPaymentBtnLoading');
        const statusMessage = document.getElementById('paymentStatusMessage');
        
        // Show loading
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';
        checkPaymentBtn.disabled = true;
        statusMessage.style.display = 'none';
        
        try {
          if (typeof checkPaymentStatus === 'function') {
            const statusResult = await checkPaymentStatus(paymentInfo.referenceId);
            
            if (statusResult.success && statusResult.isPaid) {
              // Payment is paid - redirect to receipt/download page
              statusMessage.style.display = 'block';
              statusMessage.style.background = 'rgba(16, 185, 129, 0.1)';
              statusMessage.style.border = '1px solid #10b981';
              statusMessage.style.color = '#059669';
              statusMessage.innerHTML = '✅ Pembayaran berhasil! Mengarahkan ke halaman download...';
              
              // Store payment status
              sessionStorage.setItem('paymentStatus', 'paid');
              sessionStorage.setItem('paymentInfo', JSON.stringify({
                ...paymentInfo,
                status: 'paid',
                paidAt: new Date().toISOString()
              }));
              
              // Redirect to receipt page after 1.5 seconds
              setTimeout(() => {
                window.location.href = `receipt-sewa-menyewa.html?status=success&referenceId=${paymentInfo.referenceId}`;
              }, 1500);
            } else if (statusResult.success && !statusResult.isPaid) {
              // Payment not yet paid
              statusMessage.style.display = 'block';
              statusMessage.style.background = 'rgba(245, 158, 11, 0.1)';
              statusMessage.style.border = '1px solid #f59e0b';
              statusMessage.style.color = '#d97706';
              
              const statusText = statusResult.status || 'pending';
              statusMessage.innerHTML = `⏳ Pembayaran masih ${statusText === 'pending' ? 'menunggu' : statusText}. Silakan selesaikan pembayaran Anda.`;
            } else {
              // Error checking status
              statusMessage.style.display = 'block';
              statusMessage.style.background = 'rgba(239, 68, 68, 0.1)';
              statusMessage.style.border = '1px solid #ef4444';
              statusMessage.style.color = '#dc2626';
              statusMessage.innerHTML = `❌ ${statusResult.error || 'Gagal memeriksa status pembayaran. Silakan coba lagi.'}`;
            }
          } else {
            throw new Error('checkPaymentStatus function not found');
          }
        } catch (error) {
          console.error('Error checking payment:', error);
          statusMessage.style.display = 'block';
          statusMessage.style.background = 'rgba(239, 68, 68, 0.1)';
          statusMessage.style.border = '1px solid #ef4444';
          statusMessage.style.color = '#dc2626';
          statusMessage.innerHTML = `❌ Terjadi kesalahan: ${error.message}`;
        } finally {
          // Hide loading
          btnText.style.display = 'inline';
          btnLoading.style.display = 'none';
          checkPaymentBtn.disabled = false;
        }
      });
    }
  }
}

// Check payment status from iPaymu
async function checkPaymentStatus(referenceId) {
  try {
    const { VA, API_KEY, BASE_URL } = PAYMENT_CONFIG;
    
    // Get proper base URL
    let baseUrl = window.location.origin;
    if (baseUrl.startsWith('file://')) {
      baseUrl = BASE_URL;
    }
    
    // Get timestamp for iPaymu (format: YYYYMMDDHHmmss)
    const now = new Date();
    const timestamp = now.getFullYear().toString() +
      String(now.getMonth() + 1).padStart(2, '0') +
      String(now.getDate()).padStart(2, '0') +
      String(now.getHours()).padStart(2, '0') +
      String(now.getMinutes()).padStart(2, '0') +
      String(now.getSeconds()).padStart(2, '0');
    
    // Prepare request body for status check
    const requestBody = {
      referenceId: referenceId
    };
    
    const sortedBody = {};
    Object.keys(requestBody).sort().forEach(key => {
      sortedBody[key] = requestBody[key];
    });
    const bodyString = JSON.stringify(sortedBody).replace(/\\\//g, '/');
    
    // Generate signature
    const signature = await generateIpaymuSignature(VA, API_KEY, bodyString, timestamp);
    
    // Call iPaymu API to check status
    // Note: iPaymu might not have a direct status check endpoint
    // We'll try the transaction endpoint, but handle errors gracefully
    let response;
    let result;
    
    try {
      response = await fetch('https://my.ipaymu.com/api/v2/payment/status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'va': VA,
          'signature': signature,
          'timestamp': timestamp
        },
        body: bodyString
      });
      
      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Non-JSON response (first 500 chars):', text.substring(0, 500));
        console.error('Response status:', response.status);
        console.error('Response statusText:', response.statusText);
        
        // If endpoint doesn't exist or returns HTML, return a helpful message
        if (response.status === 404 || text.includes('<html') || text.includes('<!DOCTYPE') || text.trim().startsWith('<')) {
          return {
            success: false,
            error: 'Fitur cek status pembayaran sedang tidak tersedia. Silakan cek status pembayaran Anda di dashboard iPaymu atau hubungi support jika sudah membayar.'
          };
        }
        
        return {
          success: false,
          error: 'Tidak dapat memeriksa status pembayaran. Silakan coba lagi nanti atau hubungi support jika sudah membayar.'
        };
      }
      
      result = await response.json();
      console.log('Payment Status Check Response:', result);
    } catch (error) {
      console.error('Error parsing JSON response:', error);
      // If it's a JSON parse error, it means we got HTML instead
      if (error.message && error.message.includes('JSON')) {
        return {
          success: false,
          error: 'Fitur cek status pembayaran sedang tidak tersedia. Silakan cek status pembayaran Anda di dashboard iPaymu atau hubungi support jika sudah membayar.'
        };
      }
      return {
        success: false,
        error: 'Terjadi kesalahan saat memeriksa status pembayaran. Silakan coba lagi nanti.'
      };
    }
    
    if (result.Status === 200 && result.Success === true) {
      const status = result.Data?.Status || result.Data?.status;
      const statusCode = result.Data?.StatusCode || result.Data?.statusCode;
      
      // Status codes: 0 = pending, 1 = paid, 2 = failed, 3 = expired
      return {
        success: true,
        status: status,
        statusCode: statusCode,
        isPaid: statusCode === 1 || status === 'berhasil' || status === 'paid',
        data: result.Data
      };
    } else {
      return {
        success: false,
        error: result.Keterangan || result.Message || 'Failed to check payment status'
      };
    }
  } catch (error) {
    console.error('Error checking payment status:', error);
    return {
      success: false,
      error: error.message || 'Failed to check payment status'
    };
  }
}

// Export for use in other files
if (typeof window !== 'undefined') {
  window.PAYMENT_CONFIG = PAYMENT_CONFIG;
  window.PAYMENT_METHODS = PAYMENT_METHODS;
  window.initiatePayment = initiatePayment;
  window.showPaymentInfo = showPaymentInfo;
  window.checkPaymentStatus = checkPaymentStatus;
}

