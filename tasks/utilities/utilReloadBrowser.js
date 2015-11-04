/* global module */
module.exports = function(gulp, reload) {
    return function() {
        function handleError(err) {
            'use strict';

            reload();
        };
    };
};

