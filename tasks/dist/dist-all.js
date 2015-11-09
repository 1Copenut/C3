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
            'dist:remove',
            'dist:index',
            'dist:removeStyles',
            'dist:critical',
            'dist:copyScripts',
            'dist:uglifyScripts',
            'distCritical'
        );

        return stream;
    };
};

