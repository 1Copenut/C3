/* global module */
module.exports = function(gulp, $) {
    return function() {
        'use strict';

        var stream = gulp.src('app/styles/css/main.css')
            .pipe($.uncss({
                html: ['app/*.html']
            }))
            .pipe($.csso())
            .pipe(gulp.dest('dist/styles'))
            .pipe($.notify({
                onLast: true,
                message: 'Done removing unused CSS and minifying'
            }));

        return stream;
    };
};

