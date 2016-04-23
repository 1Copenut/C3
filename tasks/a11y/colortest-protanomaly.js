/* global module */
module.exports = function(gulp, $, colortest) {
    return function() {
        'use strict';

        var processors = [
            colortest({ method: 'protanomaly' })
        ];
        var stream = gulp.src('dist/styles/main.css')
            .pipe($.postcss(processors))
            .on('error', function(error) {
              console.log(error)
            })
            .pipe(gulp.dest('dist/styles/colortest/protanomaly'))
            .pipe($.notify({
                onLast: true,
                message: 'Done CSS modifying CSS for protanomaly -- low red'
            }));

        return stream;
    };
};

