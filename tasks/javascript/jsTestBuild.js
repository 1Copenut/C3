/* global module */
module.exports = function(gulp, babelify, browserify, source, $) {
    return function() {
        'use strict';

        var b = browserify('./test/scripts/src/tdd/main.js', { debug: true }).transform(babelify);
        var stream = b.bundle()
            .pipe(source('output-test.js'))
            .pipe(gulp.dest('test/scripts/out/tdd'))
            .pipe($.notify({
                onLast: true,
                message: 'Concatenating Javascript test files'
            }));

        return stream;
    };
};
