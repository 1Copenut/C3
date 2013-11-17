require.config({
	paths: {
		jquery: '../bower_components/jquery/jquery',
		bootstrapAffix: '../bower_components/bootstrap/assets/js/affix',
    bootstrapAlert: '../bower_components/bootstrap/assets/js/alert',
    bootstrapButton: '../bower_components/bootstrap/assets/js/button',
    bootstrapCarousel: '../bower_components/bootstrap/assets/js/carousel',
    bootstrapCollapse: '../bower_components/bootstrap/assets/js/collapse',
    bootstrapDropdown: '../bower_components/bootstrap/assets/js/dropdown',
    bootstrapModal: '../bower_components/bootstrap/assets/js/modal',
    bootstrapPopover: '../bower_components/bootstrap/assets/js/popover',
    bootstrapScrollspy: '../bower_components/bootstrap/assets/js/scrollspy',
    bootstrapTab: '../bower_components/bootstrap/assets/js/tab',
    bootstrapTooltip: '../bower_components/bootstrap/assets/js/tooltip',
    bootstrapTransition: '../bower_components/bootstrap/assets/js/transition',
		underscore: '../bower_components/underscore/underscore',
	},
	
	shim: {
		underscore: {
			exports: "_"
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

require(['jquery', 'navigation'], function ($, Navigation) {
    'use strict';
    console.log('Running jQuery %s', $().jquery);
		$(document).ready(function (){
			Navigation.init();
		});
});