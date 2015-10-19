/* global module */
module.exports = function(gulp, del, paths, $) {
    return function() {
        'use strict';
        gulp.src('dist/')
            .pipe($.notify('Removing dist directory'))
            .pipe(paths(del));
    };
};

