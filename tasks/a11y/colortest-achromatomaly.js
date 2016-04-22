/* global module */
module.exports = function(gulp, $, colortest) {
    return function() {
        'use strict';

        var processors = [
            colortest({ method: 'achromatomaly' })
        ];
        var stream = gulp.src('dist/styles/main.css')
            .pipe($.postcss(processors))
            .on('error', function(error) {
              console.log(error)
            })
            .pipe(gulp.dest('dist/styles/colortest/achromatomaly'))
            .pipe($.notify({
                onLast: true,
                message: 'Done CSS modifying CSS for achromatomaly -- almost no color'
            }));

        return stream;
    };
};

