/* global module */
module.exports = function(gulp, $) {
    return function(cb) {
        'use strict';

        var started = false;
        var stream = $.nodemon({
            script: 'server/server.js'
        }).on('start', function() {
            if (!started) {
                cb();
                started = true;
            }
        });

        return stream;
    };
};

