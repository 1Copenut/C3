/* global require */
var gulp = require('gulp'),
    autoprefixer = require('autoprefixer'),
    beep = require('beepbeep'),
    babelify = require('babelify'),
    browserify = require('browserify'),
    browsersync = require('browser-sync').create(),
    buffer = require('vinyl-buffer'),
    critical = require('critical').stream,
    del = require('del'),
    paths = require('vinyl-paths'),
    reload = browsersync.reload,
    sequence = require('run-sequence'),
    source = require('vinyl-source-stream'),
    
    $ = require('gulp-load-plugins')();

/* ======================================== 
 * Default task
 * ======================================== */ 
gulp.task('default', ['nodemon', 'browsersync'], function() {
    gulp.watch('app/styles/sass/**/*.scss', ['sass']);
    gulp.watch('app/**/*.html', ['reload']);
    gulp.watch('app/scripts/src/*.js', ['js']);
    gulp.watch('test/scripts/src/*.js', ['jsTest']);
});


/* ======================================== 
 * Build task
 * ======================================== */ 
gulp.task('build', require('./tasks/dist/dist-default.js')(gulp, sequence));


/* ======================================== 
 * Build sub-modules 
 * ======================================== */ 
gulp.task('distRemove', require('./tasks/dist/distRemove.js')(gulp, del, paths, $));
gulp.task('distIndex', require('./tasks/dist/distIndex.js')(gulp, $));
gulp.task('distRemoveStyles', require('./tasks/dist/distRemoveStyles')(gulp, $));
gulp.task('distCritical', require('./tasks/dist/distCritical')(gulp, critical, $));
gulp.task('distCopyScripts', require('./tasks/dist/distCopyScripts')(gulp, $));
gulp.task('distUglifyScripts', require('./tasks/dist/distUglifyScripts')(gulp, buffer, $));


/* ======================================== 
 * Javascript sub-modules 
 * ======================================== */ 
gulp.task('js', require('./tasks/javascript/js-default')(gulp, sequence));
gulp.task('jsTest', require('./tasks/javascript/jsTest-default')(gulp, sequence));
gulp.task('esLint', require('./tasks/javascript/esLint')(gulp, $));
gulp.task('jsBuild', require('./tasks/javascript/jsBuild')(gulp, babelify, browserify, source, $));
gulp.task('jsTestBuild', require('./tasks/javascript/jsTestBuild')(gulp, browserify, source, $));
gulp.task('jsTestRun', require('./tasks/javascript/jsTest')(gulp, beep, $));


/* ======================================== 
 * Sass sub-modules 
 * ======================================== */ 
gulp.task('sass', require('./tasks/sass/sass-default')(gulp, sequence, $));
gulp.task('sassLint', require('./tasks/sass/sassLint')(gulp, $));
gulp.task('sassBuild', require('./tasks/sass/sassBuild')(gulp, autoprefixer, browsersync, reload, $));


/* ======================================== 
 * Server sub-modules 
 * ======================================== */ 
gulp.task('nodemon', require('./tasks/server/nodemon')(gulp, $));
gulp.task('browsersync', require('./tasks/server/browsersync')(gulp, browsersync, reload));


/* ======================================== 
 * Test sub-modules 
 * ======================================== */ 
gulp.task('cssRegression', require('./tasks/tests/cssRegress')(gulp, $));

/* ======================================== 
 * Utility sub-modules 
 * ======================================== */ 
gulp.task('utilHandleErrors', require('./tasks/utilities/utilHandleErrors')(gulp, beep, $));

