/* global module */
module.exports = function(gulp, $) {
    return function() {
        'use strict';
        gulp.src('./app/scripts/src/**/*.js')
            .pipe($.eslint())
            .pipe($.eslint.format())
            .pipe($.notify({
                onLast: true,
                message: 'Done linting ES6 Javascript files'
            }));
    };
};

