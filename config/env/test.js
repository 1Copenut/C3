'use strict';

module.exports = {
    karma: {
        browsers: ['Chrome'],

        preprocessors: {
            'app/scripts/src/*.js': [ 'babel', 'browserify', 'coverage' ],
            'test/scripts/src/unit/*.js': [ 'babel', 'browserify' ],
            'test/scripts/src/utilities/*.js': [ 'babel', 'browserify' ],
            '**/*.html': ['html2js'],
            '**/*.json': ['json_fixtures']
        },

        browserify: {
            debug: true,
            transform: [
              'babelify'
            ]
        },

        babelPreprocessor: {
            options: {
                presets: ['es2015'],
                sourceMap: 'inline'
            },
        },

        reporters: ['progress', 'coverage'],
        autoWatch: false,
        singleRun: true
    }
};

