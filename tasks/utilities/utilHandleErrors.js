/* global module */
module.exports = function(gulp, beep, $) {
    return function() {
        var handleError = function(err) {
            'use strict';
            beep(2);
            console.log(err.toString());
            this.emit('end');
        };
    };
};

