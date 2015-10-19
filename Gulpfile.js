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
    stylish = require('jshint-stylish'),
    
    $ = require('gulp-load-plugins')();

/* ======================================== 
 * Default task
 * ======================================== */ 
gulp.task('default', ['browsersync', 'nodemon'], function() {
    gulp.watch('app/styles/sass/**/*.scss', ['sassCombine']);
    gulp.watch('app/**/*.html', ['browsersyncReload']);
    gulp.watch('app/scripts/src/*.js', ['jsCombine']);
    gulp.watch('test/scripts/src/*.js', ['jsTestCombine']);
});


/* ======================================== 
 * Sass module sub-tasks 
 * ======================================== */ 
gulp.task('sassLint', require('./tasks/sass/sassLint')(gulp, $));
gulp.task('sassBuild', require('./tasks/sass/sassBuild')(gulp, autoprefixer, browsersync, $));
gulp.task('sassCombine', require('./tasks/sass/sassCombine')(gulp, sequence));


/* ======================================== 
 * Javascript module sub-tasks 
 * ======================================== */ 
gulp.task('esLint', require('./tasks/javascript/esLint')(gulp, $));
gulp.task('jsBuild', require('./tasks/javascript/jsBuild')(gulp, babelify, browserify, source, $));
gulp.task('jsTestBuild', require('./tasks/javascript/jsTestBuild')(gulp, browserify, source, $));
gulp.task('jsTest', require('./tasks/javascript/jsTest')(gulp, beep, $));
gulp.task('jsCombine', require('./tasks/javascript/jsCombine')(gulp, sequence));
gulp.task('jsTestCombine', require('./tasks/javascript/jsTestCombine')(gulp, sequence));


/* ======================================== 
 * Server module sub-tasks 
 * ======================================== */ 
gulp.task('browsersync', require('./tasks/server/browsersync')(gulp, browsersync));
gulp.task('browsersyncreload', require('./tasks/server/browsersyncReload')(gulp, browsersync));
gulp.task('nodemon', require('./tasks/server/nodemon')(gulp, $));


/* ======================================== 
 * Build module sub-tasks 
 * ======================================== */ 
gulp.task('destRemove', require('./tasks/dest/destRemove.js')(gulp, del, paths, $));

/* ======================================== 
 * Build tasks 
 * ======================================== */ 
/* Remove the build folder, minify CSS, copy index */
gulp.task('build', function() {
	'use strict';
    sequence(
        'build-remove',
        ['build-index', 'css-min', 'js-min', 'copy-js', 'critical']
    );
});

/* Create the index.html file in /build */
gulp.task('build-index', function () {
	'use strict';
    return gulp.src(['app/index.html'])
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
        .pipe(gulp.dest('build'))
        .pipe($.notify('Copying index.html'));
});

/* Copy the stylesheet so it can be minified */
gulp.task('copy-styles', function() {
	'use strict';
    return gulp.src(['build/styles/main.css'])
        .pipe($.rename({
            basename: 'site'
        }))
        .pipe(gulp.dest('build/styles'));
});

/* Minify and remove unused CSS */
gulp.task('css-min', function() {
	'use strict';
    return gulp.src('app/styles/css/main.css')
        .pipe($.uncss({
            html: ['app/*.html']
        }))
        .pipe($.csso())
        .pipe(gulp.dest('build/styles'))
        .pipe($.notify({
            onLast: true,
            message: 'Done removing unused CSS and minifying'
        }));
});

/* Create the critical inline css in index.html */
gulp.task('critical', ['build-index','css-min', 'copy-styles'], function() {
	'use strict';
    critical.generateInline({
        base: 'build/',
        src: 'index.html',
        styleTarget: 'styles/main.css',
        htmlTarget: 'index.html',
        width: 960,
        height: 768,
        minify: true
    });
}, function(err){ if (err) {console.log(err);}});

/* Copy the lib directory from app to build */
gulp.task('copy-js', function() {
    'use strict';
    return gulp.src(['app/lib/**/*.js'])
        .pipe(gulp.dest('build/lib'))
        .pipe($.notify({
            onLast: true,
            message: 'Done copying /lib directory Javascript'
        }));
});

/* Minify and uglify the Javascript */
gulp.task('js-min', function() {
	'use strict';
    return gulp.src('./app/scripts/out/output.js')
        .pipe(buffer())
        .pipe($.sourcemaps.init({
            loadMaps: true
        }))
        .pipe($.uglify())
        .pipe($.sourcemaps.write('./'))
        .pipe(gulp.dest('build/scripts'))
        .pipe($.notify('Done uglifying Javascript'));
});

