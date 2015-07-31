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
        this.list = list;
        this.links = links;
}

Historical.prototype = (function() {
    return {
        constructor: Historical,

    /**
     * Test for browser's understanding of the HTML5 History API,
     * and if the browser does not understand, exit early. Otherwise
     * set the initial history entry, and prepare to capture user's
     * clicks in UI and Back and Forward buttons.
     *
     * @return {Boolean} Rturns true on passing test
     */

        init: function() {
            Historical.historyEvent();
        },

        historyEvent: function() {
        },

        popEvent: function() {
        },

        windowPopState: function() {
        }
    }
}());

module.exports = Historical;
