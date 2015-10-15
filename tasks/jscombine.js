/* global module */
module.exports = function(gulp, sequence) {
    return function() {
        'use strict';
        sequence('eslint', 'jsbuild', 'jstestbuild', 'jstest', 'browsersyncreload');
    };
};

