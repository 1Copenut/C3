/* global module */
var handleError = require('../utilities/utilHandleErrors');
var critical = require('critical');

module.exports = function(gulp, critical, $) {
    return function() {
        'use strict';
 /*       gulp.src('dist/index.html')
            .pipe(critical({
                base: 'dist/',
                css: 'styles/main.css',
                width: 960,
                height: 768,
                minify: true
            }))
            .pipe(gulp.dest('dist/index.html'))
            .pipe($.plumber({
                errorHandler: handleError
            }))
            .pipe($.notify('Done inlining critical path CSS'));
*/
            critical.generateInline({
                        base: 'dist/',
                        src: 'index.html',
                                styleTarget: 'styles/main.css',
                                    htmlTarget: 'index.html',
                                            width: 960,
                                                height: 768,
                                                        minify: true
                                                                });
    };
};

