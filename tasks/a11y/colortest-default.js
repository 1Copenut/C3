/* global module */
module.exports = function(gulp, sequence) {
    return function() {
        'use strict';

        var stream = sequence(
            'colortest:protanomaly',
            'colortest:protanopia',
            'colortest:deuteranomaly',
            'colortest:deuteranopia',
            'colortest:tritanomaly',
            'colortest:tritanopia',
            'colortest:achromatomaly',
            'colortest:achromatopsia'
        );

        return stream;
    };
};

