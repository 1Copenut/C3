/* global module */
module.exports = function(gulp, sequence) {
    return function() {
        'use strict';
        sequence('jstestbuild', 'jstest', 'browsersyncreload');
    };
};

