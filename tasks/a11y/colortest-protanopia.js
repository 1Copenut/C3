/* global module */
module.exports = function(gulp, $, colortest) {
    return function() {
        'use strict';

        var a11yConfig = require('../../config/a11y/sources');
        var processors = [
            colortest({ method: 'protanopia' })
        ];
        var stream = gulp.src(a11yConfig.css.app)
            .pipe($.postcss(processors))
            .pipe($.plumber())
            .pipe(gulp.dest(a11yConfig.css.output + 'protanopia'))
            .pipe($.notify({
                onLast: true,
                message: 'Done modifying CSS for protanopia -- no red'
            }));

        return stream;
    };
};

