/*global define */
define([], function () {
	'use strict';
	
	var ajax_load = function () {
		var nav_links = $('#navigation a');
		
		nav_links.each(function (){
			var	self = $(this),
					href = self.attr('href'),
					container = $('#main');

			self.on('click', function (e){
				container.load(href + ' #main');

				// Prevent the default event
				e.preventDefault();

				// Now add the history event for properly handling URLs
				history.pushState(null, null, href);
			});
		});
	};
});