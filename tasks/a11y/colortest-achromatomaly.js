/* global module */
module.exports = function(gulp, $, colortest) {
    return function() {
        'use strict';

        var a11yConfig = require('../../config/a11y/sources');
        var processors = [
            colortest({ method: 'achromatomaly' })
        ];
        var stream = gulp.src(a11yConfig.css.app)
            .pipe($.postcss(processors))
            .pipe($.plumber())
            .pipe(gulp.dest(a11yConfig.css.output + 'achromatomaly'))
            .pipe($.notify({
                onLast: true,
                message: 'Done modifying CSS for achromatomaly -- almost no color'
            }));

        return stream;
    };
};

