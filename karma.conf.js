'use strict';

var appConfig = require('./config');

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['browserify', 'mocha', 'fixture'],

    // list of files / patterns to load in the browser
    files: [
        'test/index.html',
        'test/scripts/src/unit/*.js',
        'test/scripts/src/utilities/*.js',
        'test/fixtures/**/*'
    ],

    // list of files to exclude
    exclude: [
    ],

    // JSON preprocessor plugin
    jsonFixturesPreprocessor: {
        variableName: '__json__'
    },

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: appConfig.karma.preprocessors, 

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: appConfig.karma.reporters, 

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: appConfig.karma.autoWatch, 

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: appConfig.karma.browsers, 

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: appConfig.karma.singleRun, 

    // Concurrency level
    // how many browsers should be started simultanous
    concurrency: Infinity
  })
}
