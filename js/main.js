/**
 * SafeHer — main.js
 * Global UI utilities: navigation, footer year, active nav, toast notifications
 * Step 2: Navigation UI + Toast system only. No emergency feature logic.
 */

'use strict';

/* ═══════════════════════════════════════════════════════════
   MOBILE NAVIGATION TOGGLE
   Controls hamburger menu for both public and dashboard nav.
   ═══════════════════════════════════════════════════════════ */
function initNavToggle() {
  const toggleBtn = document.querySelector('.nav-toggle');
  // Support both public nav list and dashboard nav list
  const navList   = document.querySelector('.main-nav__list') ||
                    document.querySelector('.dashboard-nav__list');

  if (!toggleBtn || !navList) return;

  function openNav() {
    navList.classList.add('nav-open');
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    navList.classList.remove('nav-open');
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  function isOpen() {
    return navList.classList.contains('nav-open');
  }

  // Toggle on button click
  toggleBtn.addEventListener('click', () => {
    isOpen() ? closeNav() : openNav();
  });

  // Close when a nav link is selected (single-page nav or mobile)
  navList.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (isOpen()) closeNav();
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (isOpen() && !toggleBtn.contains(e.target) && !navList.contains(e.target)) {
      closeNav();
    }
  });

  // Close on Escape key — return focus to toggle button
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen()) {
      closeNav();
      toggleBtn.focus();
    }
  });
}

/* ═══════════════════════════════════════════════════════════
   FOOTER YEAR
   ═══════════════════════════════════════════════════════════ */
function initFooterYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/* ═══════════════════════════════════════════════════════════
   ACTIVE NAVIGATION LINK
   Marks the current page link with .active and aria-current.
   ═══════════════════════════════════════════════════════════ */
function initActiveNav() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll(
    '.main-nav__link, .dashboard-nav__link'
  );

  navLinks.forEach((link) => {
    const linkHref = link.getAttribute('href');
    if (linkHref && linkHref !== '#' && currentPath === linkHref) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
}

/* ═══════════════════════════════════════════════════════════
   SMOOTH SCROLL for anchor links (#section)
   ═══════════════════════════════════════════════════════════ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Close mobile nav if open
        const navList = document.querySelector('.main-nav__list');
        if (navList && navList.classList.contains('nav-open')) {
          navList.classList.remove('nav-open');
          document.body.style.overflow = '';
          const toggleBtn = document.querySelector('.nav-toggle');
          if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });
}

/* ═══════════════════════════════════════════════════════════
   TOAST NOTIFICATION SYSTEM
   Usage: showToast('Message text', 'success' | 'error' | 'warning' | 'info')
   Returns a promise that resolves when the toast is dismissed.
   ═══════════════════════════════════════════════════════════ */
function initToastContainer() {
  if (document.getElementById('toast-container')) return;

  const container = document.createElement('div');
  container.id = 'toast-container';
  container.className = 'toast-container';
  // Accessible live region — screen readers announce toasts
  container.setAttribute('aria-live', 'polite');
  container.setAttribute('aria-atomic', 'false');
  container.setAttribute('role', 'region');
  container.setAttribute('aria-label', 'Notifications');
  document.body.appendChild(container);
}

/**
 * Show a toast notification.
 * @param {string} message - Message to display
 * @param {'success'|'error'|'warning'|'info'} type - Toast style
 * @param {number} duration - Auto-dismiss duration in ms (default 4000)
 */
function showToast(message, type = 'info', duration = 4000) {
  initToastContainer();
  const container = document.getElementById('toast-container');

  const icons = {
    success: '✅',
    error:   '❌',
    warning: '⚠️',
    info:    'ℹ️',
  };

  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.setAttribute('role', 'alert');

  const iconEl = document.createElement('span');
  iconEl.className = 'toast__icon';
  iconEl.setAttribute('aria-hidden', 'true');
  iconEl.textContent = icons[type] || 'ℹ️';

  const msgEl = document.createElement('span');
  msgEl.className = 'toast__message';
  // Use textContent — never innerHTML with user strings
  msgEl.textContent = message;

  const closeBtn = document.createElement('button');
  closeBtn.className = 'toast__close';
  closeBtn.setAttribute('aria-label', 'Dismiss notification');
  closeBtn.textContent = '×';
  closeBtn.addEventListener('click', () => dismissToast(toast));

  toast.appendChild(iconEl);
  toast.appendChild(msgEl);
  toast.appendChild(closeBtn);
  container.appendChild(toast);

  // Auto-dismiss
  const timer = setTimeout(() => dismissToast(toast), duration);
  toast._timer = timer;
}

function dismissToast(toast) {
  if (!toast || toast._dismissed) return;
  toast._dismissed = true;
  clearTimeout(toast._timer);
  toast.classList.add('toast--hiding');
  toast.addEventListener('animationend', () => toast.remove(), { once: true });
  // Fallback removal
  setTimeout(() => toast.remove(), 500);
}

// Expose globally for use from other scripts
window.showToast = showToast;

/* ═══════════════════════════════════════════════════════════
   INITIALISE ALL
   ═══════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initNavToggle();
  initFooterYear();
  initActiveNav();
  initSmoothScroll();
  initToastContainer();
});
