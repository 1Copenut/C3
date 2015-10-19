/* global module */
var handleError = require('../utilities/utilHandleErrors');

module.exports = function(gulp, critical, $) {
    return function() {
        'use strict';

        var stream = gulp.src('dist/index.html')
            .pipe(critical({
                base: 'dist/',
                inline: true,
                css: ['dist/styles/main.css'],
                width: 960,
                height: 768
            }))
            .pipe(gulp.dest('dist'))
            .pipe($.plumber({
                errorHandler: handleError
            }))
            .pipe($.notify('Done inlining critical path CSS'));

        return stream;
    };
};

