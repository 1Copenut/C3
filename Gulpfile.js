'use strict';
var gulp = require('gulp'),
    server = require('gulp-express'),
    plumber = require('gulp-plumber'),
    gulpFilter = require('gulp-filter'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    sasslint = require('gulp-scss-lint'),
    cache = require('gulp-cached'),
    uncss = require('gulp-uncss'),
    csso = require('gulp-csso'),
    critical = require('critical'),
    rename = require('gulp-rename'),
    htmlbuild = require('gulp-htmlbuild'),
    es = require('event-stream');

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
gulp.task('sass', function() {
    var filter = gulpFilter(['*.css', '!*.map']);
    
    return gulp.src('app/styles/sass/*.scss')
        .pipe(plumber())
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

gulp.task('sass-lint', function() {
    return gulp.src('app/styles/sass/*.scss')
        .pipe(cache('sasslint'))
        .pipe(sasslint());
});

/* ======================================== 
 * Build tasks 
 * ======================================== */ 
gulp.task('build', function() {
    return gulp.start(['css-min', 'build-index']);
});

/* Create the index.html file in /build */
gulp.task('build-index', function () {
    return gulp.src(['app/index.html'])
        .pipe(htmlbuild({
            css: htmlbuild.preprocess.css(function (block) {
                block.end('styles/main.css');
            }),
            
            /* TODO: Add loadCSS async function after critical path working */

            remove: function(block) {
                block.end();
            }
        }))
        .pipe(gulp.dest('build'));
});

/* Minify and remove unused CSS */
gulp.task('css-min', function() {
    return gulp.src('app/styles/css/main.css')
        .pipe(uncss({
            html: ['app/*.html']
        }))
        .pipe(csso())
        .pipe(gulp.dest('build/styles'));
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
gulp.task('critical', ['build', 'copy-styles'], function() {
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
