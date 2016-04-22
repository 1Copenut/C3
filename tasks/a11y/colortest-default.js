/* global module */
module.exports = function(gulp, sequence) {
    return function() {
        'use strict';

        var stream = sequence(
            'colortest:achromatomaly',
            'colortest:achromatopsia'
        );

        return stream;
    };
};

