/* global module */
module.exports = function(gulp, autoprefixer, $) {
    return function() {
        'use strict';

        var filter = $.filter(['*.css', '!*.map']);
        var stream =  gulp.src('app/styles/sass/*.scss')
            .pipe($.plumber())
            .pipe($.sourcemaps.init())
            .pipe($.sass({
                errLogToConsole: true
            }))
            .pipe($.sourcemaps.write('./'))
            .pipe(filter)
            .pipe($.postcss([
                autoprefixer({ browsers: ['last 3 versions'] })
            ]))
            .pipe(filter.restore())
            .pipe(gulp.dest('app/styles/css'))
            .pipe($.notify({
                onLast: true,
                message: 'Done concatenating CSS'
            }));

        return stream;
    };
};

