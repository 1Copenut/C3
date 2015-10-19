/* global require */
var gulp = require('gulp'),
    autoprefixer = require('autoprefixer'),
    beep = require('beepbeep'),
    babelify = require('babelify'),
    browserify = require('browserify'),
    browsersync = require('browser-sync').create(),
    buffer = require('vinyl-buffer'),
    critical = require('critical'),
    del = require('del'),
    paths = require('vinyl-paths'),
    sequence = require('run-sequence'),
    source = require('vinyl-source-stream'),
    
    $ = require('gulp-load-plugins')();

/* ======================================== 
 * Default task
 * ======================================== */ 
gulp.task('default', ['browsersync', 'nodemon'], function() {
    gulp.watch('app/styles/sass/**/*.scss', ['sass']);
    gulp.watch('app/**/*.html', ['browsersyncReload']);
    gulp.watch('app/scripts/src/*.js', ['jsCombine']);
    gulp.watch('test/scripts/src/*.js', ['jsTestCombine']);
});


/* ======================================== 
 * Build dist 
 * ======================================== */ 



/* ======================================== 
 * Utility module sub-tasks 
 * ======================================== */ 
gulp.task('utilHandleErrors', require('./tasks/utilities/utilHandleErrors')(gulp, beep, $));


/* ======================================== 
 * Sass module sub-tasks 
 * ======================================== */ 
gulp.task('sass', function() {
    'use strict'; 
    sequence(
        'sassLint',
        'sassBuild'
    );
});

gulp.task('sassLint', require('./tasks/sass/sassLint')(gulp, $));
gulp.task('sassBuild', require('./tasks/sass/sassBuild')(gulp, autoprefixer, $));

/* ======================================== 
 * Javascript module sub-tasks 
 * ======================================== */ 
gulp.task('js', function() {
    'use strict';
    sequence(
        'esLint',
        'jsBuild',
        'jsTestBuild',
        'jsTest'
    );
});

gulp.task('js-test', function() {
    sequence(
        'esLint',
        'jsTestBuild',
        'jsTest'
    );
});

gulp.task('esLint', require('./tasks/javascript/esLint')(gulp, $));
gulp.task('jsBuild', require('./tasks/javascript/jsBuild')(gulp, babelify, browserify, source, $));
gulp.task('jsTestBuild', require('./tasks/javascript/jsTestBuild')(gulp, browserify, source, $));
gulp.task('jsTest', require('./tasks/javascript/jsTest')(gulp, beep, $));


/* ======================================== 
 * Server module sub-tasks 
 * ======================================== */ 
gulp.task('browsersync', require('./tasks/server/browsersync')(gulp, browsersync));
gulp.task('browsersyncReload', require('./tasks/server/browsersyncReload')(gulp, browsersync));
gulp.task('nodemon', require('./tasks/server/nodemon')(gulp, $));


/* ======================================== 
 * Build module sub-tasks 
 * ======================================== */ 
gulp.task('distRemove', require('./tasks/dist/distRemove.js')(gulp, del, paths, $));
gulp.task('distIndex', require('./tasks/dist/distIndex.js')(gulp, $));
gulp.task('distRemoveStyles', require('./tasks/dist/distRemoveStyles')(gulp, $));
gulp.task('distRenameStyles', require('./tasks/dist/distRenameStyles')(gulp, $));
gulp.task('distCritical', require('./tasks/dist/distCritical')(gulp, critical, $));
gulp.task('distCopyScripts', require('./tasks/dist/distCopyScripts')(gulp, $));
gulp.task('distUglifyScripts', require('./tasks/dist/distUglifyScripts')(gulp, buffer, $));

