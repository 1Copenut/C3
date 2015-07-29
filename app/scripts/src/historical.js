/**
 *
 * @class Historical
 * @constructor
 */

/* global window, require */
var $ = require('jquery');

/**
 * Create a Historical object to capture links so their
 * default behavior can be overriden with the HTML5
 * pushState API. This is emulating a single-page
 * application, with static HTML markup.
 *
 * @param {String} list Array of list items to become a jQuery object
 * @param {String} links Array of links to apply Historical behavior
 * @return {Object} Return the Historical module for instantiation
 */
function Historical(list, links) {
    'use strict'
        this.list = list
        this.links = links
}

module.exports = Historical;
