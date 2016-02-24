/* global module */
module.exports = function(gulp, sequence) {
    return function() {
        'use strict';

        var stream = sequence(
            'jsTest:lint',
            'js:build'
        );

        return stream;
    };
};

