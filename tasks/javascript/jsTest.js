/* global require */
var handleError = require('../utilities/utilHandleErrors');

module.exports = function(gulp, beep, $) {
    return function() {
        'use strict';
        gulp.src('test/index.html')
            .pipe($.plumber({
                errorHandler: handleError
            }))
            .pipe($.mochaPhantomjs({
                reporter: 'spec'
            }))
            .pipe($.notify({
                onLast: true,
                message: "Done testing JS with Mocha"
            }));
    };
};
