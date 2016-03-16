/* global module */
module.exports = function(gulp, browsersync, reload) {
    return function() {
        'use strict';
        
        var stream = browsersync.init(null, {
            proxy: 'http://localhost:3000',
            files: ['app/**/*.html', 'app/scripts/out/output.js'],
            browser: 'google chrome',
            port: 7000
        });

        return stream;
    };
};

