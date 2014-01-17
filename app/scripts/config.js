(function() {
	var isTest = window.location.href.match('/test');

	require.config({
		deps: [isTest ? '../../test/scripts/config' : 'main'],

		paths: {
			// libraries
			jquery: '../bower_components/jquery/jquery',
			bootstrapAffix: '../bower_components/bootstrap/js/affix',
			bootstrapAlert: '../bower_components/bootstrap/js/alert',
			bootstrapButton: '../bower_components/bootstrap/js/button',
			bootstrapCarousel: '../bower_components/bootstrap/js/carousel',
			bootstrapCollapse: '../bower_components/bootstrap/js/collapse',
			bootstrapDropdown: '../bower_components/bootstrap/js/dropdown',
			bootstrapModal: '../bower_components/bootstrap/js/modal',
			bootstrapPopover: '../bower_components/bootstrap/js/popover',
			bootstrapScrollspy: '../bower_components/bootstrap/js/scrollspy',
			bootstrapTab: '../bower_components/bootstrap/js/tab',
			bootstrapTooltip: '../bower_components/bootstrap/js/tooltip',
			bootstrapTransition: '../bower_components/bootstrap/js/transition',
			underscore: '../bower_components/underscore/underscore',
			intention: '../bower_components/intentionjs/intention',
			yepnope: '../yepnope/yepnope',
			twig: '../bower_components/twig.js/twig',
			squire: '../bower_components/squire/src/Squire',

			// testing
			tests: '../../test/scripts/tests',
			list_of_tests: '../../test/scripts/list_of_tests',
			fixtures: '../../test/fixtures'
		},
		
		shim: {
			underscore: {
				exports: '_'
			},
			bootstrapAffix: {
					deps: ['jquery']
			},
			bootstrapAlert: {
					deps: ['jquery', 'bootstrapTransition']
			},
			bootstrapButton: {
					deps: ['jquery']
			},
			bootstrapCarousel: {
					deps: ['jquery', 'bootstrapTransition']
			},
			bootstrapCollapse: {
					deps: ['jquery', 'bootstrapTransition']
			},
			bootstrapDropdown: {
					deps: ['jquery']
			},
			bootstrapModal:{
					deps: ['jquery', 'bootstrapTransition']
			},
			bootstrapPopover: {
					deps: ['jquery', 'bootstrapTooltip']
			},
			bootstrapScrollspy: {
					deps: ['jquery']
			},
			bootstrapTab: {
					deps: ['jquery', 'bootstrapTransition']
			},
			bootstrapTooltip: {
					deps: ['jquery', 'bootstrapTransition']
			},
			bootstrapTransition: {
					deps: ['jquery']
			}
		}
	});
}());