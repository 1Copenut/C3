/* global module */
module.exports = function(gulp, $) {
    return function() {
        'use strict';
        gulp.src(['app/index.html'])
            .pipe($.htmlbuild({
                css: $.htmlbuild.preprocess.css(function (block) {
                    block.end('styles/main.css');
                }),

                js: $.htmlbuild.preprocess.js(function(block) {
                    block.end('scripts/output.js');
                }),

                remove: function(block) {
                    block.end();
                }
            }))
            .pipe(gulp.dest('dist'))
            .pipe($.notify('Copying index.html'));
    };
};

