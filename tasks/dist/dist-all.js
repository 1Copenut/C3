/* global module */
module.exports = function(gulp, sequence) {
    return function() {
        'use strict';

        var stream = sequence(
            'dist:remove',
            'jsTest:unit',
            'dist:index',
            'dist:removeStyles',
            'dist:copyScripts',
            'dist:uglifyScripts',
            'dist:critical',
            'js:doc'
        );

        return stream;
    };
};

