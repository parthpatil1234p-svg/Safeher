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
