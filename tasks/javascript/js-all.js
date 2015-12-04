/* global module */
module.exports = function(gulp, sequence) {
    return function() {
        'use strict';

        var stream = sequence(
            'js:build',
            'jsTest:lint',
        );

        return stream;
    };
};

