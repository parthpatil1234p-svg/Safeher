/**
 * SafeHer — contacts.js
 *
 * FUTURE RESPONSIBILITY:
 * This file will manage emergency contacts. Planned functionality:
 *
 *  - Add contact: POST /api/contacts (Flask backend)
 *  - Remove contact: DELETE /api/contacts/:id
 *  - Edit contact: PUT /api/contacts/:id
 *  - Load and render contact list from backend
 *  - Client-side validation before saving
 *  - LocalStorage fallback for offline access
 *  - Contact limit enforcement (e.g., max 5)
 *  - WhatsApp / SMS integration for notifying contacts
 *
 * CURRENT STATUS (Step 1 — Frontend Prototype):
 * Contact management is UI only.
 * No contacts are persisted.
 * Placeholder contacts are rendered statically.
 */

'use strict';

/**
 * Placeholder: Renders demo contact cards.
 * TODO (Step 3): Replace with API-fetched contacts.
 */
function renderDemoContacts() {
  const container = document.getElementById('contacts-list');
  if (!container) return;

  // Placeholder contacts for UI demonstration
  const demoContacts = [
    { name: 'Mom',          relationship: 'Mother', phone: '+91 98765 XXXXX' },
    { name: 'Priya Sharma', relationship: 'Friend',  phone: '+91 87654 XXXXX' },
  ];

  container.innerHTML = demoContacts.map((c) => `
    <article class="contact-card" aria-label="Emergency contact: ${c.name}">
      <div class="contact-card__info">
        <p class="contact-card__name">${c.name}</p>
        <p class="contact-card__detail">${c.relationship} &middot; ${c.phone}</p>
      </div>
      <div class="contact-card__actions">
        <button class="btn btn--secondary btn--sm" aria-label="Edit contact ${c.name}" disabled>
          ✏️ Edit
        </button>
        <button class="btn btn--ghost btn--sm" aria-label="Remove contact ${c.name}" disabled>
          🗑 Remove
        </button>
      </div>
    </article>
  `).join('');
}

/**
 * Placeholder: Handles add-contact form submission.
 * @param {Event} e
 */
function handleAddContact(e) {
  e.preventDefault();
  alert('Demo: Contact saving will be implemented in Step 3 with Flask + SQLite backend.');
}

document.addEventListener('DOMContentLoaded', () => {
  renderDemoContacts();

  const addContactForm = document.getElementById('add-contact-form');
  if (addContactForm) {
    addContactForm.addEventListener('submit', handleAddContact);
  }
});
