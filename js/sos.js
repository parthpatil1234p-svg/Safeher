/**
 * SafeHer — sos.js
 *
 * FUTURE RESPONSIBILITY:
 * This file will handle the SOS emergency workflow. Planned functionality:
 *
 *  - SOS activation: trigger emergency alert sequence
 *  - Notify pre-configured trusted contacts via SMS/push notification
 *  - Retrieve and attach current GPS coordinates to alert
 *  - Send alert to backend: POST /api/sos/trigger
 *  - Display countdown before activation (to prevent accidental triggers)
 *  - Cancel SOS within countdown window
 *  - Log SOS event to incident history
 *  - Integrate with voice activation (see voice.js)
 *
 * CURRENT STATUS (Step 1 — Frontend Prototype):
 * The SOS button is a UI demonstration only.
 * No emergency services, SMS, or external APIs are contacted.
 * All output is visual feedback on-screen.
 *
 * IMPORTANT SAFETY NOTE:
 * Do NOT display messages claiming emergency services have been contacted
 * unless the real backend infrastructure is verified and live.
 */

'use strict';

const SOS_DEMO_DURATION_MS = 3000; // Demo countdown in milliseconds

// Handle for the pending auto-reset countdown, so a manual cancel
// can stop it before it fires (and stale timers never stack).
let sosCountdownTimer = null;

/**
 * Resets the SOS button and hides the cancel control.
 * Does NOT touch the status message — callers decide the wording.
 */
function resetSosUi() {
  const sosBtn    = document.getElementById('sos-button');
  const cancelBtn = document.getElementById('sos-cancel');

  if (sosBtn) {
    sosBtn.disabled = false;
    sosBtn.removeAttribute('aria-disabled');
    sosBtn.innerHTML = '<span aria-hidden="true">SOS</span><span class="sos-btn__label">Hold to Activate</span>';
  }

  if (cancelBtn) {
    cancelBtn.classList.add('hidden');
  }
}

/**
 * Activates the demo SOS workflow.
 * Shows feedback that SOS was triggered — does NOT contact real services.
 */
function activateDemoSOS() {
  const statusEl  = document.getElementById('sos-status');
  const sosBtn    = document.getElementById('sos-button');
  const cancelBtn = document.getElementById('sos-cancel');

  // Safety guard — ignore clicks while an SOS workflow is already running
  if (sosCountdownTimer !== null) return;

  if (statusEl) {
    statusEl.textContent = '⚠️ Demo SOS activated — emergency workflow initialised (prototype only).';
    statusEl.className   = 'alert alert--warning';
  }

  if (sosBtn) {
    sosBtn.disabled = true;
    sosBtn.setAttribute('aria-disabled', 'true');
    sosBtn.textContent = 'SOS ACTIVE';
  }

  if (cancelBtn) {
    cancelBtn.classList.remove('hidden');
  }

  // Auto-reset after demo duration (simulates countdown)
  sosCountdownTimer = setTimeout(() => {
    sosCountdownTimer = null;
    resetSosUi();
    if (statusEl) {
      statusEl.textContent = 'Demo SOS countdown completed. No emergency services were contacted.';
      statusEl.className   = 'alert alert--info';
    }
  }, SOS_DEMO_DURATION_MS);

  // TODO (Step 3): Replace demo alert with real API call:
  // sendSOSAlert({ coords: currentCoords, contacts: emergencyContacts });
}

/**
 * Cancels the demo SOS.
 */
function cancelDemoSOS() {
  // Stop the pending auto-reset so it cannot overwrite this cancelled state
  clearTimeout(sosCountdownTimer);
  sosCountdownTimer = null;

  const statusEl  = document.getElementById('sos-status');

  resetSosUi();

  if (statusEl) {
    statusEl.textContent = 'SOS cancelled. You are safe.';
    statusEl.className   = 'alert alert--success';
  }
}

/* ─── Attach event listeners if SOS page elements exist ─────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const sosBtn    = document.getElementById('sos-button');
  const cancelBtn = document.getElementById('sos-cancel');

  if (sosBtn)    sosBtn.addEventListener('click', activateDemoSOS);
  if (cancelBtn) cancelBtn.addEventListener('click', cancelDemoSOS);
});
