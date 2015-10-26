/* global module */
module.exports = function(gulp, sequence) {
    return function() {
        'use strict';

        var stream = sequence(
            'esLint',
            'jsBuild',
            'jsTestBuild',
            'jsTestRun'
        );

        return stream;
    };
};

