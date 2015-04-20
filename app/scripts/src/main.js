/*jshint browser:true */
var $ = require('jquery'),
    Navigation = require('./navigation');

$(document).ready(function() {
    'use strict';
    var navigation = new Navigation('#navigation li', '#navigation a', 'current');

    navigation.init();
});

