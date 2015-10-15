/* global module */
module.exports = function(gulp, babelify, browserify, source, $) {
    return function() {
        'use strict';
        var b = browserify('./app/scripts/src/main.js', { debug: true }).transform(babelify);

        return b.bundle()
            .pipe(source('output.js'))
            .pipe(gulp.dest('app/scripts/out'))
            .pipe($.notify({
                onLast: true,
                message: 'Concatenating ES6 Javascript application files'
            }));
    };
};

