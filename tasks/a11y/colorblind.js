/* global module */
module.exports = function(gulp, colorblind, $) {
    return function() {
        'use strict';

        // https://github.com/btholt/postcss-colorblind -- achromastopsia -- no color
        var processors = [
            colorblind({ method: 'achromatopsia' })
        ];
        var stream = gulp.src('dist/styles/main.css')
            .pipe($.plumber())
            .pipe($.postcss(processors))
            .pipe(gulp.dest('dist/styles/achromastopsia.css'))
            .pipe($.notify({
                onLast: true,
                message: 'Done CSS modifying CSS for achromastopsia -- no color'
            }));

        return stream;
    };
};

