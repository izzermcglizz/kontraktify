/**
 * Receipt Generator - Shared receipt utilities
 * Handles receipt generation, download, and email functionality
 */

/**
 * Generate DOCX from template and data
 * This is a placeholder - actual implementation depends on your DOCX library
 */
async function generateDOCX(templateData) {
  console.log('📄 Generating DOCX with data:', templateData);
  
  // TODO: Implement actual DOCX generation
  // Using library like docxtemplater or mammoth.js
  
  return {
    success: true,
    filename: `kontrak-${Date.now()}.docx`,
    blob: new Blob(['DOCX placeholder'], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' })
  };
}

/**
 * Generate PDF from template and data
 */
async function generatePDF(templateData) {
  console.log('📄 Generating PDF with data:', templateData);
  
  // TODO: Implement PDF generation
  // Using library like jsPDF or html2pdf
  
  return {
    success: true,
    filename: `kontrak-${Date.now()}.pdf`,
    blob: new Blob(['PDF placeholder'], { type: 'application/pdf' })
  };
}

/**
 * Download file to user's device
 */
function downloadFile(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  console.log('✅ File downloaded:', filename);
}

/**
 * Send receipt via email
 */
async function sendReceiptEmail(email, documentBlob, filename) {
  console.log('📧 Sending receipt to:', email);
  
  // TODO: Implement email sending via backend API
  // This should call your backend service
  
  try {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('document', documentBlob, filename);
    
    const response = await fetch('/api/send-receipt', {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) {
      throw new Error('Failed to send email');
    }
    
    console.log('✅ Email sent successfully');
    return { success: true };
  } catch (error) {
    console.error('❌ Failed to send email:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Get payment info from sessionStorage
 */
function getPaymentInfo() {
  const paymentInfo = sessionStorage.getItem('paymentInfo');
  if (!paymentInfo) return null;
  
  try {
    return JSON.parse(paymentInfo);
  } catch (e) {
    console.error('❌ Failed to parse payment info:', e);
    return null;
  }
}

/**
 * Get form data from sessionStorage
 */
function getFormData(storageKey) {
  const formData = sessionStorage.getItem(storageKey);
  if (!formData) return null;
  
  try {
    return JSON.parse(formData);
  } catch (e) {
    console.error('❌ Failed to parse form data:', e);
    return null;
  }
}

/**
 * Format receipt data for display
 */
function formatReceiptData(paymentInfo, formData) {
  return {
    referenceId: paymentInfo?.referenceId || 'N/A',
    amount: paymentInfo?.amount || 0,
    date: new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }),
    ...formData
  };
}

// Export to window
if (typeof window !== 'undefined') {
  window.generateDOCX = generateDOCX;
  window.generatePDF = generatePDF;
  window.downloadFile = downloadFile;
  window.sendReceiptEmail = sendReceiptEmail;
  window.getPaymentInfo = getPaymentInfo;
  window.getFormData = getFormData;
  window.formatReceiptData = formatReceiptData;
}
