/* global module */
module.exports = function(gulp, $) {
    return function() {
        'use strict';
        gulp.src('./dist/styles/main.css', { base: './dist/styles' })
            .pipe($.rename('/styles/site.css'))
            .pipe(gulp.dest('./dist'));
    };
};

