module.exports = function(gulp, browsersync) {
    return function() {
        'use strict';
        browsersync.reload();
    }
};
