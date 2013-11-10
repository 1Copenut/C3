/*global define, $:true */
define([], function () {
	'use strict';
	
	var Historical = {
		/* Change the URL bar in modern browsers */
		historyEvent: function (stateObj, title, url) {
			history.pushState(stateObj, title, url);
		},

		/* Popevent to reload previous content when the Back button is pressed */
		popEvent: function () {
			window.addEventListener('popstate', function(e) {
				var targetLink = e.target.location.href,
						shortened = targetLink.split('/'),
						finalTarget = shortened[shortened.length-1];
						
				Historical.loadContent(finalTarget);
			});
		},
		
		/* Use the $.ajax() function to populate main content */
		loadContent: function (targetLink) {
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