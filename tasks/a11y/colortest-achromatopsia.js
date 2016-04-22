/* global module */
module.exports = function(gulp, $, colortest) {
    return function() {
        'use strict';

        var processors = [
            colortest({ method: 'achromatopsia' })
        ];
        var stream = gulp.src('dist/styles/main.css')
            .pipe($.postcss(processors))
            .on('error', function(error) {
              console.log(error)
            })
            .pipe(gulp.dest('dist/styles/colortest/achromatopsia'))
            .pipe($.notify({
                onLast: true,
                message: 'Done CSS modifying CSS for achromatopsia -- no color'
            }));

        return stream;
    };
};

