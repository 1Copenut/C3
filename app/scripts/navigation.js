/*global define, $:true, console */
define(['historical'], function (Historical) {
	'use strict';
	
	/**
	 * The Navigation module handles all of the AJAX link
	 * loading, and passes information to the Historical
	 * module, so we can properly handle HTML5 History
	 * events when Javascript is enabled
	 */
	var Navigation = Navigation || {};
	
	Navigation = {
		config: {
			links: '#navigation a',
			list: '#navigation li'
		},
		
		/** 
		 * Return immediately and fall back to standard links for
		 * old browsers that don't understand the History API.
		 * Otherwise we should execute the functions to handle
		 * AJAX links and the History API.
		 */
		init: function () {
			if (!window.history && window.history.pushState) {
				return;
			} else {
				Navigation.fetchHistoryURL();
				Navigation.windowPopState();
			}
		},
		
		/* Ensure the links count is right */
		counter: function () {
			var links = $(Navigation.config.links);
			
			console.log(links.length);
		},
		
		/* Grab the link href on click event */
		fetchHistoryURL: function () {
			var links = $(Navigation.config.links);
					
			links.on('click', function(e) {
				var self = $(this),
						href = self.attr('href');
				
				e.preventDefault();
				
				Historical.loadContent(href);
				
				Historical.historyEvent(null, null, href);
				
				Navigation.switchClass(self);
			});
		},
		
		/* Remove the current class from all list items, add to the clicked one */
		switchClass: function (currentLink) {
			var list = $(Navigation.config.list),
					current = $(currentLink).parent();
			
			list.removeClass('current');
			
			current.addClass('current');
		},
		
		/* Add a popstate event so the Back button functions correctly */
		windowPopState: function () {
			Historical.popEvent();
		}
	};
	
	return Navigation.init();
});