/* global module */
module.exports = function(gulp, del, paths, $) {
    return function() {
        'use strict';
        
        var stream = gulp.src('dist/')
            .pipe($.notify('Removing dist directory'))
            .pipe(paths(del));

        return stream;
    };
};

