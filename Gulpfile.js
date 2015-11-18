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
    
    Karma = require('karma').Server,
    $ = require('gulp-load-plugins')();

/* ======================================== 
 * Default task
 * ======================================== */ 
gulp.task('default', ['server:nodemon', 'server:browsersync'], function() {
    gulp.watch('app/styles/sass/**/*.scss', ['sass']);
    gulp.watch('app/**/*.html', ['util:reloadBrowser']);
    gulp.watch('app/scripts/src/*.js', ['js']);
    gulp.watch('test/scripts/src/tdd/*.js', ['jsTest:unit']);
});


/* ======================================== 
 * Build task
 * ======================================== */ 
gulp.task('build', require('./tasks/dist/dist-all.js')(gulp, sequence));


/* ======================================== 
 * Build sub-modules 
 * ======================================== */ 
gulp.task('dist:remove', require('./tasks/dist/distRemove.js')(gulp, del, paths, $));
gulp.task('dist:index', require('./tasks/dist/distIndex.js')(gulp, $));
gulp.task('dist:removeStyles', require('./tasks/dist/distRemoveStyles')(gulp, $));
gulp.task('dist:critical', require('./tasks/dist/distCritical')(gulp, critical, $));
gulp.task('dist:copyScripts', require('./tasks/dist/distCopyScripts')(gulp, $));
gulp.task('dist:uglifyScripts', require('./tasks/dist/distUglifyScripts')(gulp, buffer, $));


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
gulp.task('server:nodemon', require('./tasks/server/nodemon')(gulp, $));
gulp.task('server:browsersync', require('./tasks/server/browsersync')(gulp, browsersync, reload));


/* ======================================== 
 * Test sub-modules 
 * ======================================== */ 
gulp.task('jsTest:lint', require('./tasks/tests/jsTest-lint')(gulp, $));
gulp.task('jsTest:unit', require('./tasks/tests/jsTest-unit')(gulp, Karma, $));
gulp.task('jsTest:regression', require('./tasks/tests/jsTest-regression')(gulp, $));


/* ======================================== 
 * Utility sub-modules 
 * ======================================== */ 
gulp.task('util:reloadBrowser', require('./tasks/utilities/utilReloadBrowser')(gulp, reload));
