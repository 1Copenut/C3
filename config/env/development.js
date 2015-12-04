'use strict';

module.exports = {
    karma: {
        browsers: ['PhantomJS'],

        preprocessors: {
            'app/scripts/src/*.js': [ 'browserify', 'babel' ],
            'test/scripts/src/unit/*.js': [ 'browserify', 'babel' ],
            'test/scripts/src/utilities/*.js': [ 'browserify' ],
            '**/*.html': ['html2js'],
            '**/*.json': ['json_fixtures']
        },

        browserify: {
            debug: true,
            transform: []
        },

        babelPreprocessor: {
            options: {
                presets: ['es2015'],
                sourceMap: 'inline'
            },
        },

        reporters: ['progress'],
        autoWatch: true,
        singleRun: false
    }
};

