/* global module */
module.exports = function(gulp, autoprefixer, browsersync, reload, $) {
    return function() {
        'use strict';

        var processors = [
            autoprefixer({ browsers: ['last 2 versions'] })
        ];
        var filter = $.filter(['*.css', '!*.map'], { restore: true });
        var stream = gulp.src('app/styles/sass/*.scss')
            .pipe($.plumber())
            .pipe($.sourcemaps.init())
            .pipe($.sass({
                errLogToConsole: true
            }))
            .pipe($.sourcemaps.write('./'))
            .pipe(filter)
            .pipe($.postcss(processors))
            .pipe(filter.restore)
            .pipe(gulp.dest('app/styles/css'))
            .pipe(reload({stream: true}))
            .pipe($.notify({
                onLast: true,
                message: 'Done concatenating CSS'
            }));

        return stream;
    };
};

