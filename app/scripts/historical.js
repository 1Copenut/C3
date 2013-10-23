/*global define, $:true */
define([], function () {
	'use strict';
	
	var Historical = {
		// config: {
		// 			container: '#main',
		// 			links: '#navigation a'
		// 		},
		
		historyEvent: function (stateObj, title, url) {
			// Change the URL bar in modern browsers
			history.pushState(stateObj, title, url);
		},

		popEvent: function () {
			window.addEventListener('popstate', function(e) {
				var targetLink = e.target.location.href;

				Historical.loadContent(targetLink);
			});
		},
		
		loadContent: function (targetLink) {
			// Use the $.ajax() function to populate main content
			$.ajax({
				url: 'templates/' + targetLink,
				dataType: 'html',
				cache: false,
				success: function (data) {
					$('#main').html(data);
				}
			});
		}
	};
	
	return Historical;
});