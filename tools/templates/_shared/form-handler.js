/**
 * Form Handler - Shared form utilities
 * Handles autosave, validation, and data persistence
 */

/**
 * Setup autosave functionality for forms
 * @param {string} formId - The form element ID
 * @param {string} storageKey - LocalStorage key for saving form data
 * @param {function} callback - Optional callback after save
 */
function setupAutosave(formId, storageKey, callback) {
  const form = document.getElementById(formId);
  if (!form) return;

  // Load saved data on page load
  loadFormData(formId, storageKey);

  // Save on input change
  form.addEventListener('input', () => {
    saveFormData(formId, storageKey);
    if (callback) callback();
  });
}

/**
 * Save form data to localStorage
 */
function saveFormData(formId, storageKey) {
  const form = document.getElementById(formId);
  if (!form) return;

  const formData = new FormData(form);
  const data = {};
  
  for (let [key, value] of formData.entries()) {
    data[key] = value;
  }

  localStorage.setItem(storageKey, JSON.stringify(data));
  console.log('✅ Form data saved:', storageKey);
}

/**
 * Load form data from localStorage
 */
function loadFormData(formId, storageKey) {
  const form = document.getElementById(formId);
  if (!form) return;

  const savedData = localStorage.getItem(storageKey);
  if (!savedData) return;

  try {
    const data = JSON.parse(savedData);
    
    for (let [key, value] of Object.entries(data)) {
      const field = form.querySelector(`[name="${key}"]`);
      if (field) {
        field.value = value;
      }
    }
    
    console.log('✅ Form data loaded:', storageKey);
  } catch (e) {
    console.error('❌ Failed to load form data:', e);
  }
}

/**
 * Clear saved form data
 */
function clearFormData(storageKey) {
  localStorage.removeItem(storageKey);
  console.log('✅ Form data cleared:', storageKey);
}

/**
 * Validate required fields
 */
function validateForm(formId, requiredFields = []) {
  const form = document.getElementById(formId);
  if (!form) return false;

  const errors = [];

  requiredFields.forEach(fieldName => {
    const field = form.querySelector(`[name="${fieldName}"]`);
    if (!field || !field.value.trim()) {
      errors.push(fieldName);
    }
  });

  if (errors.length > 0) {
    console.error('❌ Form validation failed:', errors);
    return false;
  }

  return true;
}

/**
 * Get form data as object
 */
function getFormDataAsObject(formId) {
  const form = document.getElementById(formId);
  if (!form) return {};

  const formData = new FormData(form);
  const data = {};
  
  for (let [key, value] of formData.entries()) {
    data[key] = value;
  }

  return data;
}

// Export to window
if (typeof window !== 'undefined') {
  window.setupAutosave = setupAutosave;
  window.saveFormData = saveFormData;
  window.loadFormData = loadFormData;
  window.clearFormData = clearFormData;
  window.validateForm = validateForm;
  window.getFormDataAsObject = getFormDataAsObject;
}
