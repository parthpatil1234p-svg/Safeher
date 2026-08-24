/**
 * SafeHer — location.js
 *
 * FUTURE RESPONSIBILITY:
 * This file will handle live location features. Planned:
 *
 *  - Request Geolocation API permission
 *  - Display current latitude / longitude
 *  - Render location on embedded map (Leaflet.js or Google Maps)
 *  - Generate shareable location link
 *  - Send live location to trusted contacts via backend
 *  - Continuous location tracking (watchPosition)
 *  - Attach location to SOS alerts automatically
 *
 * CURRENT STATUS (Step 1 — Frontend Prototype):
 * Geolocation is NOT requested.
 * Map area is a visual placeholder.
 * No coordinates are displayed or shared.
 *
 * Privacy Note:
 * Location data is sensitive. Always request user permission explicitly.
 * Never track location without informed user consent.
 * Comply with local privacy laws (IT Act, GDPR as applicable).
 */

'use strict';

/**
 * Placeholder: Requests current position via Geolocation API.
 * TODO (Step 4): Display result on map, POST to /api/location/update
 */
function getCurrentLocation() {
  const statusEl = document.getElementById('location-status-text');
  const getBtn   = document.getElementById('get-location-btn');

  if (!navigator.geolocation) {
    if (statusEl) {
      statusEl.textContent = 'Geolocation is not supported by your browser.';
    }
    return;
  }

  if (statusEl) {
    statusEl.textContent = 'Requesting location permission…';
  }

  if (getBtn) {
    getBtn.disabled = true;
    getBtn.textContent = 'Getting location…';
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      if (statusEl) {
        statusEl.textContent = `Location retrieved: ${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
      }
      // TODO (Step 4): Render on map, enable share button
      if (getBtn) {
        getBtn.disabled = false;
        getBtn.textContent = 'Refresh Location';
      }
    },
    (error) => {
      if (statusEl) {
        statusEl.textContent = `Location error: ${error.message}. Please enable location permissions.`;
      }
      if (getBtn) {
        getBtn.disabled = false;
        getBtn.textContent = 'Try Again';
      }
    },
    { enableHighAccuracy: true, timeout: 10000 }
  );
}

/**
 * Placeholder: Copy location link to clipboard.
 */
function copyLocationLink() {
  alert('Demo: Share link generation will be implemented in Step 4.');
}

/**
 * Placeholder: Share live location with trusted contacts.
 */
function shareLocation() {
  alert('Demo: Live location sharing will be implemented in Step 4 via backend API.');
}

document.addEventListener('DOMContentLoaded', () => {
  const getBtn   = document.getElementById('get-location-btn');
  const copyBtn  = document.getElementById('copy-location-btn');
  const shareBtn = document.getElementById('share-location-btn');

  if (getBtn)   getBtn.addEventListener('click', getCurrentLocation);
  if (copyBtn)  copyBtn.addEventListener('click', copyLocationLink);
  if (shareBtn) shareBtn.addEventListener('click', shareLocation);
});
