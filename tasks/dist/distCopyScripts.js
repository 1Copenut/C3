/* global module */
module.exports = function(gulp, $) {
    return function() {
        'use strict';

        var stream = gulp.src(['app/libs/**/*'])
            .pipe(gulp.dest('dist/libs'))
            .pipe($.notify({
                onLast: true,
                message: 'Done copying JS libs'
            }));

        return stream;
    };
};

