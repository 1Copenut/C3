/**
 * This is the main entry point for C3 builds
 *
 * @module main
 * @main main
 */

import $ from 'jquery';
import TabPanel from './components/nav-tabPanel';

$(document).ready(function() {
  let tabPanel = new TabPanel('tabpanel1', false);

  console.log('Smoke test. App main.js is loading ES6 modules correctly.');
});

