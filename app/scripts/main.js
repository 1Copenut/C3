define(['jquery', 'navigation'], function ($, Navigation) {
	'use strict';
	console.log('Running jQuery %s', $().jquery);
	$(document).ready(function (){
		Navigation.init();
	});
});