/* global module */
module.exports = function(gulp, $, colortest) {
    return function() {
        'use strict';

        var a11yConfig = require('../../config/a11y/sources');
        var processors = [
            colortest({ method: 'protanomaly' })
        ];
        var stream = gulp.src(a11yConfig.css.app)
            .pipe($.postcss(processors))
            .pipe($.plumber())
            .pipe(gulp.dest(a11yConfig.css.output + 'protanomaly'))
            .pipe($.notify({
                onLast: true,
                message: 'Done modifying CSS for protanomaly -- low red'
            }));

        return stream;
    };
};

