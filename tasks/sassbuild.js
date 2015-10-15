module.exports = function(gulp, autoprefixer, browsersync, $) {
    return function() {
        'use strict';
        var filter = $.filter(['*.css', '!*.map']);
    
        gulp.src('app/styles/sass/*.scss')
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
            .pipe(browsersync.stream({match: '**/*.css'}))
            .pipe($.notify({
                onLast: true,
                message: 'Done concatenating CSS'
            }));
    }
};
