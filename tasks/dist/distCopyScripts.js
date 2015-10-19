/* global module */
module.exports = function(gulp, $) {
    return function() {
        'use strict';

        var stream = gulp.src(['app/lib/**/*'])
            .pipe(gulp.dest('dist/lib'))
            .pipe($.notify({
                onLast: true,
                message: 'Done copying JS libs'
            }));

        return stream;
    };
};

