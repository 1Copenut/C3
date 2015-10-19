/* global module */
module.exports = function(gulp, $) {
    return function() {
        'use strict';
        gulp.src(['app/lib/**/*'])
            .pipe(gulp.dest('dist/lib'))
            .pipe($.notify({
                message: 'Copying Javascript libs...'
            }));
    };
};

