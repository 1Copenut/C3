/**
 * This is the main entry point for C3 builds
 *
 * @module main
 * @main main
 */

import $ from 'jquery';
import KeyCode from './utilities/key-codes';

$(document).ready(function() {
  let keycode = new KeyCode();

  console.log('Smoke test. App main.js is loading ES6 modules correctly.');
  console.log(keycode.down);
});

