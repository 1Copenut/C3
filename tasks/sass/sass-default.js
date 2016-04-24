/* global module */
module.exports = function(gulp, sequence) {
    return function() {
        'use strict';

        var stream = sequence(
            'sass:lint',
            'sass:build',
            'colortest'
        );

        return stream;
    };
};

