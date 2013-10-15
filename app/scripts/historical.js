/*global define, $:true */
define([], function () {
	'use strict';
	
	var Historical = {
		config: {
			container: '#main'
		},
		
		historyEvent: function (stateObj, title, url) {
			// Change the URL bar in modern browsers
			history.pushState(stateObj, title, url);
		},

		popEvent: function () {
			// Enable the back button and load content when pressed
			window.addEventListener('popstate', function(e) {
				var targetLink = e.target.location.href;

				Historical.loadContent(targetLink);
			});
		},
		
		loadContent: function (targetLink) {
			var targetContent = $(Historical.config.container);
			
			// Use the $.load() function to populate main content
			targetContent.load(targetLink + ' #main');
		}
	};
	
	return Historical;
});