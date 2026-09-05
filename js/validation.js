/**
 * SafeHer — validation.js
 *
 * FUTURE RESPONSIBILITY:
 * Centralised form validation library for all SafeHer forms. Planned:
 *
 *  - Email format validation (RFC-compliant regex)
 *  - Password strength checker (min length, complexity)
 *  - Password confirmation match
 *  - Phone number format validation (Indian +91 format)
 *  - Required field enforcement
 *  - Real-time validation on blur
 *  - Accessible error messages linked to inputs via aria-describedby
 *  - Prevent form submission if validation fails
 *
 * CURRENT STATUS (Step 1 — Frontend Prototype):
 * Basic email and required-field validation included.
 * Full validation suite will be implemented in Step 2.
 */

'use strict';

/* ─── Validators ────────────────────────────────────────────────────── */

/**
 * Validates an email address format.
 * @param {string} email
 * @returns {boolean}
 */
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

/**
 * Checks that a string is not empty or whitespace-only.
 * @param {string} value
 * @returns {boolean}
 */
function isNotEmpty(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

/**
 * Validates minimum password length.
 * @param {string} password
 * @param {number} [minLength=8]
 * @returns {boolean}
 */
function isPasswordStrong(password, minLength = 8) {
  // TODO (Step 2): Add complexity checks (uppercase, number, symbol)
  return typeof password === 'string' && password.length >= minLength;
}

/**
 * Validates that two passwords match.
 * @param {string} password
 * @param {string} confirmPassword
 * @returns {boolean}
 */
function doPasswordsMatch(password, confirmPassword) {
  return password === confirmPassword;
}

/**
 * Validates an Indian phone number (basic).
 * Accepts: +91XXXXXXXXXX or 10-digit format.
 * @param {string} phone
 * @returns {boolean}
 */
function isValidIndianPhone(phone) {
  const re = /^(\+91[\-\s]?)?[6-9]\d{9}$/;
  return re.test(phone.replace(/\s/g, ''));
}

/* ─── UI Helpers ────────────────────────────────────────────────────── */

/**
 * Marks a form group as having an error.
 * @param {HTMLElement} formGroup
 * @param {string} message
 */
function showFieldError(formGroup, message) {
  if (!formGroup) return;
  formGroup.classList.add('has-error');
  const errorEl = formGroup.querySelector('.form-error');
  if (errorEl) {
    errorEl.textContent = message;
    errorEl.style.display = 'block';
  }
  const inputEl = formGroup.querySelector('.form-input, .form-select, .form-textarea');
  if (inputEl) {
    inputEl.setAttribute('aria-invalid', 'true');
    if (typeof window.triggerInputShake === 'function') {
      window.triggerInputShake(inputEl);
    }
  }
}

/**
 * Clears the error state of a form group.
 * @param {HTMLElement} formGroup
 */
function clearFieldError(formGroup) {
  if (!formGroup) return;
  formGroup.classList.remove('has-error');
  const errorEl = formGroup.querySelector('.form-error');
  if (errorEl) {
    errorEl.textContent = '';
    errorEl.style.display = 'none';
  }
}

/* ─── Export ─────────────────────────────────────────────────────────── */
// Make validators available globally for use by other scripts
window.SafeHerValidation = {
  isValidEmail,
  isNotEmpty,
  isPasswordStrong,
  doPasswordsMatch,
  isValidIndianPhone,
  showFieldError,
  clearFieldError,
};
