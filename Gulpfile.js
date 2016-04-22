/* global require */
var gulp = require('gulp'),
    autoprefixer = require('autoprefixer'),
    beep = require('beepbeep'),
    babelify = require('babelify'),
    browserify = require('browserify'),
    browsersync = require('browser-sync').create(),
    buffer = require('vinyl-buffer'),
    critical = require('critical').stream,
    colorblind = require('postcss-colorblind'),
    del = require('del'),
    minimist = require('minimist'),
    paths = require('vinyl-paths'),
    reload = browsersync.reload,
    sequence = require('run-sequence'),
    source = require('vinyl-source-stream'),
    $ = require('gulp-load-plugins')();

var knownOptions = {
  string: 'env',
  default: { env: process.env.NODE_ENV || 'development' }
};

/* ======================================== 
 * Default task
 * ======================================== */ 
gulp.task('default', ['server:nodemon', 'server:browsersync'], function() {
    gulp.watch('app/**/*.html', ['util:reloadBrowser']);
    gulp.watch('app/pages/*.nunjucks', ['nunjucks']);
    gulp.watch('app/templates/**/*.nunjucks', ['nunjucks']);
    gulp.watch('app/styles/sass/**/*.scss', ['sass']);
    gulp.watch('app/scripts/src/**/*.js', ['js']);
});


/* ======================================== 
 * A11y sub-modules 
 * ======================================== */ 
gulp.task('colorblind', require('./tasks/a11y/colorblind.js')(gulp, colorblind, $));


/* ======================================== 
 * Build task
 * ======================================== */ 
gulp.task('build', require('./tasks/dist/dist-all.js')(gulp, sequence));


/* ======================================== 
 * Build sub-modules 
 * ======================================== */ 
gulp.task('dist:remove', require('./tasks/dist/distRemove.js')(gulp, del, paths, $));
gulp.task('dist:index', ['nunjucks'], require('./tasks/dist/distIndex.js')(gulp, $));
gulp.task('dist:removeStyles', require('./tasks/dist/distRemoveStyles')(gulp, $));
gulp.task('dist:critical', require('./tasks/dist/distCritical')(gulp, critical, $));
gulp.task('dist:copyScripts', require('./tasks/dist/distCopyScripts')(gulp, $));
gulp.task('dist:uglifyScripts', require('./tasks/dist/distUglifyScripts')(gulp, buffer, $));


/* ======================================== 
 * Javascript sub-modules 
 * ======================================== */ 
gulp.task('js', require('./tasks/javascript/js-all')(gulp, sequence));
gulp.task('js:build', require('./tasks/javascript/js-build')(gulp, babelify, browserify, source, $));
gulp.task('js:doc', require('./tasks/javascript/js-doc')(gulp, $));
gulp.task('js:lint', require('./tasks/javascript/js-lint')(gulp, $));


/* ======================================== 
 * Sass sub-modules 
 * ======================================== */ 
gulp.task('sass', require('./tasks/sass/sass-default')(gulp, sequence, $));
gulp.task('sassLint', require('./tasks/sass/sassLint')(gulp, $));
gulp.task('sassBuild', require('./tasks/sass/sassBuild')(gulp, autoprefixer, browsersync, reload, $));


/* ======================================== 
 * Server sub-modules 
 * ======================================== */ 
gulp.task('server:nodemon', ['nunjucks'], require('./tasks/server/nodemon')(gulp, $));
gulp.task('server:browsersync', require('./tasks/server/browsersync')(gulp, browsersync, reload));


/* ======================================== 
 * Template sub-modules 
 * ======================================== */ 
gulp.task('nunjucks', ['js', 'sass'], require('./tasks/templates/tmplBuild')(gulp, $));


/* ======================================== 
 * Test sub-modules 
 * ======================================== */ 
gulp.task('jsTest:unit', $.shell.task('npm run full-test'));
gulp.task('jsTest:regression', require('./tasks/tests/jsTest-regression')(gulp, $));


/* ======================================== 
 * Utility sub-modules 
 * ======================================== */ 
gulp.task('util:reloadBrowser', require('./tasks/utilities/utilReloadBrowser')(gulp, reload));

