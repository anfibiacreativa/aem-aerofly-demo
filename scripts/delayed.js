/*
 * Aerofly — Delayed scripts
 * Loaded 3 seconds after page load.
 * Place martech, analytics, and other non-critical third-party scripts here.
 */

// eslint-disable-next-line import/no-cycle
import { sampleRUM } from './aem.js';

// Core Web Vitals RUM collection
sampleRUM('lazy');
if (sampleRUM.observe) {
  sampleRUM.observe();
}
