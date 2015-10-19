/* global module */
module.exports = function(gulp, sequence) {
    return function() {
        'use strict';
        sequence('esLint', 'jsBuild', 'jsTestBuild', 'jsTest', 'browsersyncReload');
    };
};

