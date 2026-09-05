/**
 * SafeHer — report.js
 *
 * FUTURE RESPONSIBILITY:
 * This file will handle incident report submission. Planned:
 *
 *  - POST /api/reports/submit — send report to Flask backend
 *  - SQLite storage for incident records
 *  - Optional file/evidence upload (multipart/form-data)
 *  - Anonymous report option (strip identifying fields before POST)
 *  - Report ID generation and receipt shown to user
 *  - Report history view for authenticated user
 *  - Download report as PDF
 *
 * CURRENT STATUS (Step 1 — Frontend Prototype):
 * Form is rendered with correct fields and labels.
 * Submission does NOT send data to any server.
 * File upload UI exists but no files are processed.
 *
 * Disclaimer:
 * This prototype does not submit reports to police or authorities.
 * Users requiring immediate help should contact official emergency services.
 */

'use strict';

/**
 * Handles incident report form submission.
 * @param {Event} e
 */
function handleReportSubmit(e) {
  e.preventDefault();

  const form       = e.target;
  const statusEl   = document.getElementById('report-submit-status');
  const submitBtn  = form.querySelector('[type="submit"]');

  // Basic check that required fields are present
  const incidentType = form.querySelector('#incident-type')?.value;
  const incidentDate = form.querySelector('#incident-date')?.value;
  const description  = form.querySelector('#incident-description')?.value.trim();

  if (!incidentType || !incidentDate || !description) {
    if (statusEl) {
      statusEl.textContent = 'Please fill in all required fields before submitting.';
      statusEl.className   = 'alert alert--danger';
    }
    return;
  }

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting…';
  }

  // TODO (Step 3): POST report to /api/reports/submit
  // Simulate submission delay
  setTimeout(() => {
    if (statusEl) {
      statusEl.textContent = 'Demo: Your report has been logged locally. In the full version, it will be saved to the secure backend database.';
      statusEl.className   = 'alert alert--success';
    }
    if (submitBtn) {
      submitBtn.disabled   = false;
      submitBtn.textContent = 'Submit Report';
    }
    form.reset();
  }, 1500);
}

document.addEventListener('DOMContentLoaded', () => {
  const reportForm = document.getElementById('report-form');
  if (reportForm) {
    reportForm.addEventListener('submit', handleReportSubmit);
  }
});
