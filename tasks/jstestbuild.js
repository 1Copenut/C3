/* global module */
module.exports = function(gulp, browserify, source, $) {
    return function() {
	'use strict';
    var b = browserify('./test/scripts/src/main.js');

    return b.bundle()
        .pipe(source('output-test.js'))
        .pipe(gulp.dest('test/scripts/out'))
        .pipe($.notify({
            onLast: true,
            message: 'Concatenating Javascript test files'
        }));
    };
};
