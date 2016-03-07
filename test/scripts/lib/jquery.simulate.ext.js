/*jshint camelcase:true, plusplus:true, forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, devel:true, maxerr:100, white:false, onelet:false */
/*global jQuery:true $:true */

/* jQuery Simulate Extended Plugin 1.3.0
 * http://github.com/j-ulrich/jquery-simulate-ext
 * 
 * Copyright (c) 2014 Jochen Ulrich
 * Licensed under the MIT license (MIT-LICENSE.txt).
 */

import $ from 'jquery';

"use strict";

	/* Overwrite the $.simulate.prototype.mouseEvent function
	 * to convert pageX/Y to clientX/Y
	 */
	let originalMouseEvent = $.simulate.prototype.mouseEvent,
		rdocument = /\[object (?:HTML)?Document\]/;
	
	$.simulate.prototype.mouseEvent = function(type, options) {
		if (options.pageX || options.pageY) {
			let doc = rdocument.test(Object.prototype.toString.call(this.target))? this.target : (this.target.ownerDocument || document);
			options.clientX = (options.pageX || 0) - $(doc).scrollLeft();
			options.clientY = (options.pageY || 0) - $(doc).scrollTop();
		}
		return originalMouseEvent.apply(this, [type, options]);
	};
	
	
