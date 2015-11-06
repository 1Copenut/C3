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
    gulp.watch('app/**/*.html', ['utilReloadBrowser']);
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
gulp.task('js', require('./tasks/javascript/js-all')(gulp, sequence));
gulp.task('js:build', require('./tasks/javascript/js-build')(gulp, babelify, browserify, source, $));


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
gulp.task('jsTest', require('./tasks/tests/jsTest-all')(gulp, sequence));
gulp.task('jsTest:build', require('./tasks/tests/jsTest-build')(gulp, babelify, browserify, source, $));
gulp.task('jsTest:lint', require('./tasks/tests/jsTest-lint')(gulp, $));
gulp.task('jsTest:unit', require('./tasks/tests/jsTest-unit')(gulp, beep, $));
gulp.task('jsTest:regression', require('./tasks/tests/jsTest-regression')(gulp, $));

/* ======================================== 
 * Utility sub-modules 
 * ======================================== */ 
gulp.task('utilHandleErrors', require('./tasks/utilities/utilHandleErrors')(gulp, beep, $));
gulp.task('utilReloadBrowser', require('./tasks/utilities/utilReloadBrowser')(gulp, reload));
