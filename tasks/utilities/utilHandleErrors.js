/* global module */
module.exports = function(gulp, beep, $) {
    return function() {
        function handleError(err) {
            'use strict';
            beep(2);
            console.log(err.toString());
            this.emit('end');
        };
    };
};

