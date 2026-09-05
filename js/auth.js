/**
 * SafeHer — auth.js
 *
 * FUTURE RESPONSIBILITY:
 * This file will handle all authentication workflows once the Flask backend
 * is integrated. Planned functionality includes:
 *
 *  - User registration: POST /api/auth/register
 *  - User login: POST /api/auth/login
 *  - Session management (JWT or session cookies)
 *  - Logout: POST /api/auth/logout
 *  - Password reset flow
 *  - Remember-me token handling
 *  - Role-based route protection
 *
 * CURRENT STATUS (Step 1 — Frontend Prototype):
 * No real authentication is performed.
 * Forms can be submitted for UI demonstration only.
 * Passwords are NOT stored in JavaScript.
 * No API calls are made.
 *
 * NOTE: Never store real passwords, API keys, or sensitive data in frontend JS.
 */

'use strict';

/**
 * Checks whether a user session exists.
 * In Step 1 this is a stub — always returns false.
 * Future: read from a secure HttpOnly cookie or JWT via API.
 * @returns {boolean}
 */
function isLoggedIn() {
  // TODO (Step 3): Replace with real session/token check
  return false;
}

/**
 * Redirects unauthenticated users to the login page.
 * Attach to protected pages (dashboard, profile, etc.).
 */
function requireAuth() {
  // TODO (Step 3): Enable after backend auth is implemented
  // if (!isLoggedIn()) {
  //   window.location.href = 'login.html?redirect=' + encodeURIComponent(window.location.href);
  // }
}

/**
 * Handles the login form submission.
 * @param {Event} e - form submit event
 */
function handleLoginSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const emailInput = form.querySelector('#login-email');
  const passwordInput = form.querySelector('#login-password');
  const emailError = form.querySelector('#email-error');
  const passwordError = form.querySelector('#password-error');

  // Clear previous errors
  const emailGroup = emailInput.closest('.form-group');
  const passwordGroup = passwordInput.closest('.form-group');
  if (window.SafeHerValidation) {
    window.SafeHerValidation.clearFieldError(emailGroup);
    window.SafeHerValidation.clearFieldError(passwordGroup);
  }

  let isValid = true;

  // Validate email
  const email = emailInput.value.trim();
  if (!email) {
    if (window.SafeHerValidation) {
      window.SafeHerValidation.showFieldError(emailGroup, 'Email is required');
    }
    isValid = false;
  } else if (!window.SafeHerValidation?.isValidEmail(email)) {
    if (window.SafeHerValidation) {
      window.SafeHerValidation.showFieldError(emailGroup, 'Please enter a valid email address');
    }
    isValid = false;
  }

  // Validate password
  const password = passwordInput.value;
  if (!password) {
    if (window.SafeHerValidation) {
      window.SafeHerValidation.showFieldError(passwordGroup, 'Password is required');
    }
    isValid = false;
  }

  if (!isValid) return;

  // TODO (Step 3): Call POST /api/auth/login with FormData
  // For now, redirect to dashboard to demonstrate flow
  alert('Demo: Login flow will connect to Flask backend in Step 3.\nRedirecting to dashboard...');
  window.location.href = 'dashboard.html';
}

/**
 * Handles the registration form submission.
 * @param {Event} e - form submit event
 */
function handleRegisterSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const nameInput = form.querySelector('#reg-name');
  const emailInput = form.querySelector('#reg-email');
  const phoneInput = form.querySelector('#reg-phone');
  const passwordInput = form.querySelector('#reg-password');
  const confirmInput = form.querySelector('#reg-confirm-password');
  const termsInput = form.querySelector('#reg-terms');

  const nameGroup = nameInput.closest('.form-group');
  const emailGroup = emailInput.closest('.form-group');
  const phoneGroup = phoneInput.closest('.form-group');
  const passwordGroup = passwordInput.closest('.form-group');
  const confirmGroup = confirmInput.closest('.form-group');
  const termsGroup = termsInput.closest('.form-group');

  // Clear previous errors
  if (window.SafeHerValidation) {
    window.SafeHerValidation.clearFieldError(nameGroup);
    window.SafeHerValidation.clearFieldError(emailGroup);
    window.SafeHerValidation.clearFieldError(phoneGroup);
    window.SafeHerValidation.clearFieldError(passwordGroup);
    window.SafeHerValidation.clearFieldError(confirmGroup);
    window.SafeHerValidation.clearFieldError(termsGroup);
  }

  let isValid = true;

  // Validate name
  const name = nameInput.value.trim();
  if (!name) {
    if (window.SafeHerValidation) {
      window.SafeHerValidation.showFieldError(nameGroup, 'Full name is required');
    }
    isValid = false;
  }

  // Validate email
  const email = emailInput.value.trim();
  if (!email) {
    if (window.SafeHerValidation) {
      window.SafeHerValidation.showFieldError(emailGroup, 'Email is required');
    }
    isValid = false;
  } else if (!window.SafeHerValidation?.isValidEmail(email)) {
    if (window.SafeHerValidation) {
      window.SafeHerValidation.showFieldError(emailGroup, 'Please enter a valid email address');
    }
    isValid = false;
  }

  // Validate phone
  const phone = phoneInput.value.trim();
  if (!phone) {
    if (window.SafeHerValidation) {
      window.SafeHerValidation.showFieldError(phoneGroup, 'Phone number is required');
    }
    isValid = false;
  } else if (!window.SafeHerValidation?.isValidIndianPhone(phone)) {
    if (window.SafeHerValidation) {
      window.SafeHerValidation.showFieldError(phoneGroup, 'Please enter a valid Indian phone number (e.g., +91 98765 43210)');
    }
    isValid = false;
  }

  // Validate password
  const password = passwordInput.value;
  if (!password) {
    if (window.SafeHerValidation) {
      window.SafeHerValidation.showFieldError(passwordGroup, 'Password is required');
    }
    isValid = false;
  } else if (!window.SafeHerValidation?.isPasswordStrong(password)) {
    if (window.SafeHerValidation) {
      window.SafeHerValidation.showFieldError(passwordGroup, 'Password must be at least 8 characters');
    }
    isValid = false;
  }

  // Validate confirm password
  const confirmPassword = confirmInput.value;
  if (!confirmPassword) {
    if (window.SafeHerValidation) {
      window.SafeHerValidation.showFieldError(confirmGroup, 'Please confirm your password');
    }
    isValid = false;
  } else if (!window.SafeHerValidation?.doPasswordsMatch(password, confirmPassword)) {
    if (window.SafeHerValidation) {
      window.SafeHerValidation.showFieldError(confirmGroup, 'Passwords do not match');
    }
    isValid = false;
  }

  // Validate terms
  if (!termsInput.checked) {
    if (window.SafeHerValidation) {
      window.SafeHerValidation.showFieldError(termsGroup, 'You must accept the terms to register');
    }
    isValid = false;
  }

  if (!isValid) return;

  // TODO (Step 3): Call POST /api/auth/register with FormData
  alert('Demo: Registration will connect to Flask backend in Step 3.\nRedirecting to login...');
  window.location.href = 'login.html';
}

/* ─── Attach event listeners if forms exist ─────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const loginForm    = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');

  if (loginForm)    loginForm.addEventListener('submit', handleLoginSubmit);
  if (registerForm) registerForm.addEventListener('submit', handleRegisterSubmit);
});
