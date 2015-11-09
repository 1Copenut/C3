/* global module */
module.exports = function(gulp, sequence) {
    return function() {
        'use strict';

        var stream = sequence(
            'distRemove',
            'distIndex',
            'distRemoveStyles',
            'distCopyScripts',
            'distUglifyScripts',
            'distCritical'
        );

        return stream;
    };
};

