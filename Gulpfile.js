/* global require */
var gulp = require('gulp'),
    autoprefixer = require('autoprefixer'),
    beep = require('beepbeep'),
    babelify = require('babelify'),
    browserify = require('browserify'),
    browsersync = require('browser-sync').create(),
    buffer = require('vinyl-buffer'),
    colortest = require('postcss-colorblind'),
    critical = require('critical').stream,
    del = require('del'),
    minimist = require('minimist'),
    paths = require('vinyl-paths'),
    postcss = require('postcss'),
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
 * A11y tasks 
 * ======================================== */ 
gulp.task('colortest', require('./tasks/a11y/colortest-default.js')(gulp, sequence));


/* ======================================== 
 * Build task
 * ======================================== */ 
gulp.task('build', require('./tasks/dist/dist-all.js')(gulp, sequence));


/* ======================================== 
 * A11y sub-modules
 * ======================================== */ 
gulp.task('colortest:protanomaly', require('./tasks/a11y/colortest-protanomaly.js')(gulp, $, colortest));
gulp.task('colortest:protanopia', require('./tasks/a11y/colortest-protanopia.js')(gulp, $, colortest));
gulp.task('colortest:deuteranomaly', require('./tasks/a11y/colortest-deuteranomaly.js')(gulp, $, colortest));
gulp.task('colortest:deuteranopia', require('./tasks/a11y/colortest-deuteranopia.js')(gulp, $, colortest));
gulp.task('colortest:tritanomaly', require('./tasks/a11y/colortest-tritanomaly.js')(gulp, $, colortest));
gulp.task('colortest:tritanopia', require('./tasks/a11y/colortest-tritanopia.js')(gulp, $, colortest));
gulp.task('colortest:achromatomaly', require('./tasks/a11y/colortest-achromatomaly.js')(gulp, $, colortest));
gulp.task('colortest:achromatopsia', require('./tasks/a11y/colortest-achromatopsia.js')(gulp, $, colortest));


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
gulp.task('sass:lint', require('./tasks/sass/sassLint')(gulp, $));
gulp.task('sass:build', require('./tasks/sass/sassBuild')(gulp, autoprefixer, browsersync, reload, $));


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

