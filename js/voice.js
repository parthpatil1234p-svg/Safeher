/**
 * SafeHer — voice.js
 *
 * FUTURE RESPONSIBILITY:
 * This file will handle voice-activated emergency triggering. Planned:
 *
 *  - Use Web Speech API (SpeechRecognition) to listen for trigger words
 *  - Configurable trigger phrases (e.g., "Help", "SafeHer SOS")
 *  - Start/stop listening with visual indicator
 *  - On trigger phrase detected: call activateSOSAlert() from sos.js
 *  - Graceful degradation for browsers without SpeechRecognition support
 *  - Permission handling for microphone access
 *
 * CURRENT STATUS (Step 1 — Frontend Prototype):
 * Voice activation is UI placeholder only.
 * No microphone access is requested.
 * No audio processing occurs.
 *
 * Browser Support Note:
 * SpeechRecognition is supported in Chrome and Edge.
 * Safari and Firefox have limited or no support.
 * Implement feature detection before enabling.
 */

'use strict';

/**
 * Checks whether the browser supports the Web Speech API.
 * @returns {boolean}
 */
function isSpeechRecognitionSupported() {
  return 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
}

/**
 * Placeholder — start voice listening.
 * TODO (Step 4): Implement using SpeechRecognition API.
 */
function startVoiceListening() {
  const statusEl = document.getElementById('voice-status');
  if (statusEl) {
    statusEl.textContent = 'Voice activation coming soon — this feature will be implemented in Step 4.';
  }
  // TODO: const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
}

/**
 * Placeholder — stop voice listening.
 */
function stopVoiceListening() {
  // TODO (Step 4): recognition.stop();
}

document.addEventListener('DOMContentLoaded', () => {
  const voiceBtn = document.getElementById('voice-activate-btn');
  if (voiceBtn) {
    voiceBtn.addEventListener('click', startVoiceListening);
  }
});
