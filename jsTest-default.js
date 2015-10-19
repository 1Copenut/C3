/* global module */
module.exports = function(gulp, sequence) {
    return function() {
        'use strict';

        var stream = sequence(
            'esLint',
            'jsTestBuild',
            'jsTest'
        );

        return stream;
    };
};

