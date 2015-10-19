/* global module */
module.exports = function(gulp, $) {
    return function() {
        'use strict';

        var stream = gulp.src('app/styles/sass/*.scss')
            .pipe($.cached('scssLint'))
            .pipe($.scssLint())
            .pipe($.notify({
                onLast: true,
                message: 'Done linting SCSS files'
            }));

        return stream;
    };
};

