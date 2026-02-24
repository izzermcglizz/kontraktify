/**
 * Preview Renderer - Shared preview utilities
 * Handles document preview generation from form data
 */

/**
 * Format date to Indonesian format
 */
function formatDateID(dateString) {
  if (!dateString) return '';
  
  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];
  
  const date = new Date(dateString);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  
  return `${day} ${month} ${year}`;
}

/**
 * Format currency to Indonesian Rupiah
 */
function formatRupiah(amount) {
  if (!amount) return 'Rp 0';
  
  const number = typeof amount === 'string' ? parseInt(amount.replace(/\D/g, '')) : amount;
  
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(number);
}

/**
 * Sanitize HTML to prevent XSS
 */
function sanitizeHTML(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Replace placeholders in template with data
 */
function renderTemplate(template, data) {
  let result = template;
  
  for (let [key, value] of Object.entries(data)) {
    const placeholder = new RegExp(`{{${key}}}`, 'g');
    result = result.replace(placeholder, sanitizeHTML(value || ''));
  }
  
  return result;
}

/**
 * Generate preview HTML from template and data
 */
function generatePreview(templateHTML, formData) {
  return renderTemplate(templateHTML, formData);
}

/**
 * Load form data from sessionStorage
 */
function loadPreviewData(storageKey) {
  const savedData = sessionStorage.getItem(storageKey);
  if (!savedData) {
    console.warn('⚠️ No preview data found in sessionStorage');
    return null;
  }
  
  try {
    return JSON.parse(savedData);
  } catch (e) {
    console.error('❌ Failed to parse preview data:', e);
    return null;
  }
}

/**
 * Save data for next step (payment/receipt)
 */
function saveForNextStep(data, storageKey) {
  sessionStorage.setItem(storageKey, JSON.stringify(data));
  console.log('✅ Data saved for next step:', storageKey);
}

// Export to window
if (typeof window !== 'undefined') {
  window.formatDateID = formatDateID;
  window.formatRupiah = formatRupiah;
  window.sanitizeHTML = sanitizeHTML;
  window.renderTemplate = renderTemplate;
  window.generatePreview = generatePreview;
  window.loadPreviewData = loadPreviewData;
  window.saveForNextStep = saveForNextStep;
}
