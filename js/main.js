/**
 * SafeHer — main.js
 * Global utilities: navigation toggle, footer year, active nav links
 * Step 1 scope: UI interactions only. No API calls.
 */

'use strict';

/* ─── Mobile Navigation Toggle ─────────────────────────────────────── */
function initNavToggle() {
  const toggleBtn = document.querySelector('.nav-toggle');
  const navList   = document.querySelector('.main-nav__list, .dashboard-nav__list');

  if (!toggleBtn || !navList) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = navList.classList.toggle('nav-open');
    toggleBtn.setAttribute('aria-expanded', String(isOpen));
    // Prevent body scroll when menu is open on small screens
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!toggleBtn.contains(e.target) && !navList.contains(e.target)) {
      navList.classList.remove('nav-open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navList.classList.contains('nav-open')) {
      navList.classList.remove('nav-open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      toggleBtn.focus();
    }
  });
}

/* ─── Current Year in Footer ────────────────────────────────────────── */
function initFooterYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/* ─── Mark Active Navigation Link ──────────────────────────────────── */
function initActiveNav() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks    = document.querySelectorAll('.main-nav__link, .dashboard-nav__link');

  navLinks.forEach((link) => {
    const linkPath = link.getAttribute('href');
    if (linkPath && linkPath !== '#' && currentPath === linkPath) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
}

/* ─── Smooth Scroll for Anchor Links ───────────────────────────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Close mobile nav if open
        const navList = document.querySelector('.main-nav__list');
        if (navList) {
          navList.classList.remove('nav-open');
          document.body.style.overflow = '';
          const toggleBtn = document.querySelector('.nav-toggle');
          if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });
}

/* ─── Initialise All ────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initNavToggle();
  initFooterYear();
  initActiveNav();
  initSmoothScroll();
});
