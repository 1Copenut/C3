/* global module, require */
var gulp = require('gulp'),
    autoprefixer = require('autoprefixer'),
    browsersync = require('browser-sync').create(),
    $ = require('gulp-load-plugins')();

module.exports = function() {
    'use strict';
    var filter = $.filter(['*.css', '!*.map']);

    return gulp.src('app/styles/sass/*.scss')
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe($.sass({
            errLogToConsole: true
        }))
        .pipe($.sourcemaps.write('./'))
        .pipe(filter)
        .pipe($.postcss([
            autoprefixer({ browsers: ['last 3 versions'] })
        ]))
        .pipe(filter.restore())
        .pipe(gulp.dest('app/styles/css'))
        .pipe(browsersync.stream({match: '**/*.css'}))
        .pipe($.notify({
            onLast: true,
            message: 'Done concatenating CSS'
        }));
};

