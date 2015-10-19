/* global module */
module.exports = function(gulp, browsersync) {
    return function() {
        'use strict';
        browsersync.init(null, {
            proxy: 'http://localhost:3000',
            files: ['app/**/*.html'],
            browser: 'google chrome',
            port: 7000
        });
    };
};

