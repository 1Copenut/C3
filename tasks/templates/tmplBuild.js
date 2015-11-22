/* global module */
module.exports = function(gulp, $) {
    return function() {
        'use strict';

        $.nunjucksRender.nunjucks.configure(['app/templates'], { watch: false });

        var stream = gulp.src('app/pages/**/*.+(html|nunjucks)')
            .pipe($.nunjucksRender())
            .pipe(gulp.dest('app'));
            
        return stream;
    };
};

