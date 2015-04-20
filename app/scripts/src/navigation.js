/**
 * The Navigation module handles all of the AJAX link
 * loading, and passes information to the Historical
 * module, so we can properly handle HTML5 History
 * events when Javascript is enabled.
 */

/* global window, require */
var $ = require('jquery');

function Navigation(list, links, currentClass) {
    'use strict';
    this.list = list;
    this.links = links;
    this.currentClass = currentClass;
}

Navigation.prototype = (function() {
    'use strict';
    return {
        constructor: Navigation,
        
        init: function() {
            if (!window.history && window.history.pushState) {
                return;
            } else {
                Navigation.fetchHistoryURL();
                Navigation.windowPopState();
                Navigation.setCurrentClass(this.currentClass);
            }
        },

        fetchHistoryURL: function() {
        },

        setCurrentClass: function() {
            /* code */
        },

        switchClass: function() {
           /* code */
        },

        windowPopState: function() {
           /* code */
        } 
    };
}());

module.exports = Navigation;
