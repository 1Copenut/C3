/**
 * The Navigation module handles all of the AJAX link
 * loading, and passes information to the Historical
 * module, so we can properly handle HTML5 History
 * events when Javascript is enabled.
 */

/* global window, require */
var $ = require('jquery'),
    Historical = require('./historical');

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
        
        /* Ensure browsers understand the HTML5 History API */
        init: function() {
            if (!window.history || !window.history.pushState) {
                return;
            } else {
                Navigation.fetchHistoryURL();
                Navigation.windowPopState();
                Navigation.setCurrentClass(this.currentClass);
            }
        },

        /* Grab the clicked href to load content with AJAX */
        fetchHistoryURL: function() {
            var $links = $(this.links);

            $links.on('click', function(e) {
                var $self = $(this),
                    href = $self.attr('href');

                e.preventDefault();

                Historical.loadContent(href);

                Historical.historyEvent(null, null, href);

                Navigation.switchClass($self, this.currentClass);
            });
        },

        /* Add the active class to the first nav link */
        setCurrentClass: function(className) {
            var $baseList = $(this.list);

            $baseList.first()
                .addClass(className);
        },

        /* Remove the active class from nav links, and reapply to clicked link */ 
        switchClass: function(currentLink, className) {
            var $baseList = $(this.list),
                current = $(currentLink).parent();

            $baseList.removeClass(className);

            current.addClass(className);
        },

        /* Add a popstate event so the Back button functions correctly */
        windowPopState: function() {
            Historical.popEvent();
        } 
    };
}());

module.exports = Navigation;

