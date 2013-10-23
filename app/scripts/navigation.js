/*global define, $:true, console */
define(['historical'], function (Historical) {
	'use strict';
	
	var Navigation = {
		config: {
			links: '#navigation a',
			list: '#navigation li'
		},
		
		init: function () {
			// Return immediately and fall back to standard links for
			// old browsers that don't understand the History API.
			if (!window.history && window.history.pushState) {
				return;
			} else {
				Navigation.fetchHistoryURL();
				Navigation.windowPopState();
			}
		},
		
		counter: function () {
			var links = $(Navigation.config.links);
			
			// Ensure the count of links is right
			console.log(links.length);
		},
		
		fetchHistoryURL: function () {
			var links = $(Navigation.config.links);
					
			// Grab the link href on click event
			links.on('click', function(e) {
				var self = $(this),
						href = self.attr('href');
				
				e.preventDefault();
				
				Historical.loadContent(href);
				
				Historical.historyEvent(null, null, href);
				
				Navigation.switchClass(self);
			});
		},
		
		switchClass: function (currentLink) {
			var list = $(Navigation.config.list),
					current = $(currentLink).parent();
			
			list.removeClass('current');
			
			current.addClass('current');
		},
		
		windowPopState: function () {
			Historical.popEvent();
		}
	};
	
	return Navigation.init();
});