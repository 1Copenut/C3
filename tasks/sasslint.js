/* global module */
module.exports = function(gulp, $) {
    return function() {
        'use strict';
        return gulp.src('app/styles/sass/*.scss')
            .pipe($.cached('scssLint'))
            .pipe($.scssLint())
            .pipe($.notify({
                onLast: true,
                message: 'Done linting SCSS files'
            }));
    };
};

