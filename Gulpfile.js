'use strict';
var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    browserify = require('browserify'),
    critical = require('critical'),
    csso = require('gulp-csso'),
    del = require('del'),
    htmlbuild = require('gulp-htmlbuild'),
    rename = require('gulp-rename'),
    paths = require('vinyl-paths'),
    sass = require('gulp-sass'),
    sasslint = require('gulp-scss-lint'),
    sequence = require('run-sequence'),
    server = require('gulp-express'),
    shim = require('browserify-shim'),
    source = require('vinyl-source-stream'),
    sourcemaps = require('gulp-sourcemaps'),
    transform = require('vinyl-transform'),
    uglify = require('gulp-uglify'),
    uncss = require('gulp-uncss'),
    
    $ = require('gulp-load-plugins')();

/* ======================================== 
 * Server task
 * ======================================== */ 
gulp.task('server', function() {
    server.run(['server/server.js']); 
    console.log('App is running on port 3000');
});

/* ======================================== 
 * Development tasks - CSS
 * ======================================== */ 

/* Concatenate sass files, add source maps and Autoprefix CSS */
gulp.task('sass', function() {
    var filter = $.filter(['*.css', '!*.map']);
    
    return gulp.src('app/styles/sass/*.scss')
        .pipe($.plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({
            errLogToConsole: true
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(filter)
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(filter.restore())
        .pipe(gulp.dest('app/styles/css'));
});

/* Style check the sass */
gulp.task('sass-lint', function() {
    return gulp.src('app/styles/sass/*.scss')
        .pipe($.cached('sasslint'))
        .pipe(sasslint());
});

/* ======================================== 
 * Development tasks - Javascript
 * ======================================== */ 
gulp.task('browserify', function() {
    return browserify('./app/scripts/main.js')
        .bundle()
        .pipe(source('output.js'))
        .pipe(gulp.dest('build/scripts'))
        .pipe($.notify('Hey, it worked!'));
});

/* ======================================== 
 * Build tasks 
 * ======================================== */ 

/* Remove the build folder, minify CSS, copy index */
gulp.task('build', function() {
    sequence(
        'build-remove',
        ['css-min', 'build-index']
    );
});

/* Remove the build folder each time we rebuild */
gulp.task('build-remove', function() {
    return gulp.src('build/')
        .pipe($.notify('Removing the build directory'))
        .pipe(paths(del));
});

/* Create the index.html file in /build */
gulp.task('build-index', function () {
    return gulp.src(['app/index.html'])
        .pipe(htmlbuild({
            css: htmlbuild.preprocess.css(function (block) {
                block.end('styles/main.css');
            }),

            remove: function(block) {
                block.end();
            }
        }))
        .pipe(gulp.dest('build'))
        .pipe($.notify('Copying index.html'));
});

/* Minify and remove unused CSS */
gulp.task('css-min', function() {
    return gulp.src('app/styles/css/main.css')
        .pipe(uncss({
            html: ['app/*.html']
        }))
        .pipe(csso())
        .pipe(gulp.dest('build/styles'))
        .pipe($.notify('Minifying and removing unused CSS'));
});

/* Rename main css file for critical path inlining */
gulp.task('copy-styles', function() {
    return gulp.src(['build/styles/main.css'])
        .pipe(rename({
            basename: 'site'
        }))
        .pipe(gulp.dest('build/styles'));
});

/* Create the critical inline css */
gulp.task('critical', ['css-min', 'build-index', 'copy-styles'], function() {
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
