// UI utility functions

// Show toast notification
export function showToast(message, type = 'info', duration = 3000) {
  // Remove existing toasts
  const existingToast = document.getElementById('toast');
  if (existingToast) {
    existingToast.remove();
  }
  
  // Create toast element
  const toast = document.createElement('div');
  toast.id = 'toast';
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  
  // Add toast to page
  document.body.appendChild(toast);
  
  // Show toast
  setTimeout(() => {
    toast.classList.add('show');
  }, 10);
  
  // Hide toast after duration
  setTimeout(() => {
    toast.classList.remove('show');
    
    // Remove toast after animation
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, duration);
}

// Format date
export function formatDate(dateString, options = {}) {
  const defaultOptions = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { ...defaultOptions, ...options });
}

// Format currency
export function formatCurrency(amount, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency
  }).format(amount);
}

// Validate form
export function validateForm(formData, rules) {
  const errors = {};
  
  for (const field in rules) {
    const value = formData[field];
    const fieldRules = rules[field];
    
    // Check required
    if (fieldRules.required && (!value || value.trim() === '')) {
      errors[field] = fieldRules.required === true ? 
        `${field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')} is required` : 
        fieldRules.required;
      continue;
    }
    
    // Check minimum length
    if (value && fieldRules.minLength && value.length < fieldRules.minLength) {
      errors[field] = `Must be at least ${fieldRules.minLength} characters`;
      continue;
    }
    
    // Check maximum length
    if (value && fieldRules.maxLength && value.length > fieldRules.maxLength) {
      errors[field] = `Must be less than ${fieldRules.maxLength} characters`;
      continue;
    }
    
    // Check pattern
    if (value && fieldRules.pattern && !fieldRules.pattern.test(value)) {
      errors[field] = fieldRules.message || `Invalid format`;
      continue;
    }
    
    // Check match
    if (value && fieldRules.match && value !== formData[fieldRules.match]) {
      errors[field] = fieldRules.message || `Does not match ${fieldRules.match}`;
      continue;
    }
    
    // Custom validation function
    if (value && fieldRules.validate && typeof fieldRules.validate === 'function') {
      const validationResult = fieldRules.validate(value, formData);
      if (validationResult !== true) {
        errors[field] = validationResult;
        continue;
      }
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

// Show validation errors
export function showValidationErrors(formElement, errors) {
  // Clear previous errors
  formElement.querySelectorAll('.invalid-feedback').forEach(el => {
    el.textContent = '';
    el.style.display = 'none';
  });
  
  formElement.querySelectorAll('.form-control').forEach(el => {
    el.classList.remove('is-invalid');
  });
  
  // Show new errors
  for (const field in errors) {
    const inputElement = formElement.querySelector(`[name="${field}"]`);
    if (inputElement) {
      inputElement.classList.add('is-invalid');
      
      const feedbackElement = inputElement.nextElementSibling;
      if (feedbackElement && feedbackElement.classList.contains('invalid-feedback')) {
        feedbackElement.textContent = errors[field];
        feedbackElement.style.display = 'block';
      }
    }
  }
}

// Create modal
export function createModal(options) {
  // Default options
  const defaultOptions = {
    id: 'modal',
    title: 'Modal Title',
    content: '',
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    onConfirm: null,
    onCancel: null,
    hideCancel: false,
    size: 'medium' // small, medium, large
  };
  
  const modalOptions = { ...defaultOptions, ...options };
  
  // Remove existing modal
  const existingModal = document.getElementById(modalOptions.id);
  if (existingModal) {
    existingModal.remove();
  }
  
  // Create modal elements
  const modalBackdrop = document.createElement('div');
  modalBackdrop.className = 'modal-backdrop';
  modalBackdrop.id = `${modalOptions.id}-backdrop`;
  
  const modalElement = document.createElement('div');
  modalElement.className = `modal modal-${modalOptions.size}`;
  modalElement.id = modalOptions.id;
  
  // Modal content
  modalElement.innerHTML = `
    <div class="modal-header">
      <h5 class="modal-title">${modalOptions.title}</h5>
      <button type="button" class="modal-close">&times;</button>
    </div>
    <div class="modal-body">
      ${modalOptions.content}
    </div>
    <div class="modal-footer">
      ${modalOptions.hideCancel ? '' : `<button type="button" class="btn btn-outline modal-cancel">${modalOptions.cancelText}</button>`}
      <button type="button" class="btn btn-primary modal-confirm">${modalOptions.confirmText}</button>
    </div>
  `;
  
  // Add modal to page
  modalBackdrop.appendChild(modalElement);
  document.body.appendChild(modalBackdrop);
  
  // Show modal
  setTimeout(() => {
    modalBackdrop.classList.add('active');
  }, 10);
  
  // Event handlers
  const closeModal = () => {
    modalBackdrop.classList.remove('active');
    setTimeout(() => {
      modalBackdrop.remove();
    }, 300);
  };
  
  // Close button
  const closeButton = modalElement.querySelector('.modal-close');
  if (closeButton) {
    closeButton.addEventListener('click', () => {
      if (modalOptions.onCancel) {
        modalOptions.onCancel();
      }
      closeModal();
    });
  }
  
  // Cancel button
  const cancelButton = modalElement.querySelector('.modal-cancel');
  if (cancelButton) {
    cancelButton.addEventListener('click', () => {
      if (modalOptions.onCancel) {
        modalOptions.onCancel();
      }
      closeModal();
    });
  }
  
  // Confirm button
  const confirmButton = modalElement.querySelector('.modal-confirm');
  if (confirmButton) {
    confirmButton.addEventListener('click', () => {
      if (modalOptions.onConfirm) {
        modalOptions.onConfirm();
      }
      closeModal();
    });
  }
  
  // Close on backdrop click
  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      if (modalOptions.onCancel) {
        modalOptions.onCancel();
      }
      closeModal();
    }
  });
  
  // Return modal control
  return {
    close: closeModal,
    modal: modalElement,
    backdrop: modalBackdrop
  };
}

// Add CSS styles for toast and modals
const styleElement = document.createElement('style');
styleElement.textContent = `
  /* Toast */
  #toast {
    position: fixed;
    bottom: 30px;
    right: 30px;
    padding: 12px 20px;
    background: white;
    color: #333;
    border-radius: 4px;
    font-weight: 500;
    z-index: 9999;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16);
    transform: translateY(30px);
    opacity: 0;
    transition: transform 0.3s ease, opacity 0.3s ease;
  }
  
  #toast.show {
    transform: translateY(0);
    opacity: 1;
  }
  
  #toast.toast-success {
    background-color: #d4edda;
    color: #155724;
    border-left: 4px solid #28a745;
  }
  
  #toast.toast-error {
    background-color: #f8d7da;
    color: #721c24;
    border-left: 4px solid #dc3545;
  }
  
  #toast.toast-warning {
    background-color: #fff3cd;
    color: #856404;
    border-left: 4px solid #ffc107;
  }
  
  #toast.toast-info {
    background-color: #d1ecf1;
    color: #0c5460;
    border-left: 4px solid #17a2b8;
  }
  
  /* Modal sizes */
  .modal-small {
    max-width: 400px;
  }
  
  .modal-medium {
    max-width: 600px;
  }
  
  .modal-large {
    max-width: 800px;
  }
`;

document.head.appendChild(styleElement);