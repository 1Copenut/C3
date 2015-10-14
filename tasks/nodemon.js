module.exports = function(gulp, $) {
    return function(cb) {
        'use strict';
        var started = false;

        return $.nodemon({
            script: 'server/server.js'
        }).on('start', function() {
            if (!started) {
                cb();
                started = true;
            }
        });
    }
};

