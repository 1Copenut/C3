/* global module */
module.exports = function(gulp, $) {
    return function() {
        'use strict';

        var stream = gulp.src('./test/scripts/src/regress/main.js')
            .pipe($.phantomcss({
                screenshots: './test/screenshots/pass',
                failures: './test/screenshots/failures',
                results: './test/screenshots/results'
            }))
            .pipe($.notify({
                onLast: true,
                message: 'Done analyzing CSS for visual regression'
            }));

        return stream;
    };
};

