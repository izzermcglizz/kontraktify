// Simple scroll and highlight functions for live preview
(function() {
  'use strict';
  
  let currentActiveField = null;
  
  function scrollToPreview(fieldName) {
    if (!fieldName) return;
    
    // Remove previous highlight
    if (currentActiveField) {
      currentActiveField.classList.remove('active-editing');
    }
    
    // Find and highlight current field
    const placeholder = document.querySelector(`.preview-field[data-field="${fieldName}"]`);
    if (!placeholder) return;
    
    placeholder.classList.add('active-editing');
    currentActiveField = placeholder;
    
    // Scroll to show field
    const scrollContainer = document.querySelector('.preview-panel-new');
    if (scrollContainer) {
      setTimeout(() => {
        const rect = placeholder.getBoundingClientRect();
        const containerRect = scrollContainer.getBoundingClientRect();
        const scrollTop = scrollContainer.scrollTop;
        const targetScroll = scrollTop + rect.top - containerRect.top - 100;
        
        scrollContainer.scrollTo({
          top: Math.max(0, targetScroll),
          behavior: 'smooth'
        });
      }, 10);
    }
  }
  
  // Initialize when page loads
  document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('documentForm');
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
      // On focus: scroll and highlight
      input.addEventListener('focus', function() {
        scrollToPreview(this.id || this.name);
      });
      
      // On input: update preview
      input.addEventListener('input', function() {
        const fieldName = this.id || this.name;
        const value = this.value.trim();
        
        const previewFields = document.querySelectorAll(`.preview-field[data-field="${fieldName}"]`);
        previewFields.forEach(field => {
          if (value) {
            field.textContent = value;
            field.classList.add('filled');
          } else {
            const placeholder = fieldName.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            field.textContent = `[${placeholder}]`;
            field.classList.remove('filled');
          }
        });
        
        scrollToPreview(fieldName);
      });
    });
  });
  
  // Remove highlight when clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('#documentForm input, #documentForm textarea, #documentForm select')) {
      if (currentActiveField) {
        currentActiveField.classList.remove('active-editing');
        currentActiveField = null;
      }
    }
  });
})();



