/**
 * This is the main entry point for C3 builds
 *
 * @module main
 * @main main
 */

import $ from 'jquery';
import keycode from './components/tab-panel';

$(document).ready(function() {
  console.log('Smoke test. App main.js is loading ES6 modules correctly.');
  console.log(keycode.tab);
  console.log(keycode.down);
});

