'use strict'
import $ from 'jquery';

export function render(el, fixture) {
  $(el).empty().prepend(fixture);
};

