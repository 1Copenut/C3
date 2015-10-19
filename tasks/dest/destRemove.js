/* global module */
module.exports = function(gulp, del, paths, $) {
    return function() {
        'use strict';
        gulp.src('dest/')
            .pipe($.notify('Removing dest directory'))
            .pipe(paths(del));
    };
};

