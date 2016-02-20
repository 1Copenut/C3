/* global module*/
module.exports = function(gulp, $) {
    return function() {
        'use strict';

        var stream = gulp.src('./app/scripts/src/**/*.js')
            .pipe($.yuidoc())
            .pipe(gulp.dest('./doc'));

        return stream;
    };
};
