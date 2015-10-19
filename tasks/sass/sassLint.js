/* global module, require */
var gulp = require('gulp'),
    $ = require('gulp-load-plugins')();

module.exports = function() {
    'use strict';
    return gulp.src('app/styles/sass/*.scss')
        .pipe($.cached('scssLint'))
        .pipe($.scssLint())
        .pipe($.notify({
            onLast: true,
            message: 'Done linting SCSS files'
        }));
};

