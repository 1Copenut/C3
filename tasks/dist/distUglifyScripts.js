/* global module */
module.exports = function(gulp, buffer, $) {
    return function() {
        'use strict';
        gulp.src('app/scripts/out/output.js')
            .pipe(buffer())
            .pipe($.sourcemaps.init())
            .pipe($.uglify())
            .pipe($.sourcemaps.write('./'))
            .pipe(gulp.dest('dist/scripts'))
            .pipe($.notify({
                onLast: true,
                message: 'Done uglifying Javascript'
            }));
    };
};

