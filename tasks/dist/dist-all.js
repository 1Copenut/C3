/* global module */
module.exports = function(gulp, sequence) {
    return function() {
        'use strict';

        var stream = sequence(
            'dist:remove',
            'dist:index',
            'dist:removeStyles',
            'dist:copyScripts',
            'dist:uglifyScripts',
            'dist:critical'
        );

        return stream;
    };
};

