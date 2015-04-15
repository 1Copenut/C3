'use strict';
var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    browserify = require('browserify'),
    buffer = require('vinyl-buffer'),
    critical = require('critical'),
    csso = require('gulp-csso'),
    del = require('del'),
    htmlbuild = require('gulp-htmlbuild'),
    jshint = require('gulp-jshint'),
    rename = require('gulp-rename'),
    paths = require('vinyl-paths'),
    sass = require('gulp-sass'),
    sasslint = require('gulp-scss-lint'),
    sequence = require('run-sequence'),
    server = require('gulp-express'),
    shim = require('browserify-shim'),
    source = require('vinyl-source-stream'),
    sourcemaps = require('gulp-sourcemaps'),
    stylish = require('jshint-stylish'),
    transform = require('vinyl-transform'),
    uglify = require('gulp-uglify'),
    uncss = require('gulp-uncss'),
    
    $ = require('gulp-load-plugins')();


/* ======================================== 
 * Build tasks 
 * ======================================== */ 
/* Remove the build folder, minify CSS, copy index */
gulp.task('build', function() {
    sequence(
        'build-remove',
        ['build-index', 'css-min', 'js-min']
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

/* Create the critical inline css */
gulp.task('critical', ['build-index','css-min', 'copy-styles'], function() {
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


/* ======================================== 
 * Development tasks - CSS
 * ======================================== */ 
/* Concatenate sass files, add source maps and Autoprefix CSS */
gulp.task('sass', ['sass-lint'], function() {
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
        .pipe(gulp.dest('app/styles/css'))
        .pipe($.notify({
            onLast: true,
            message: 'Concatenating CSS'
        }));
});

/* Style check the sass */
gulp.task('sass-lint', function() {
    return gulp.src('app/styles/sass/*.scss')
        .pipe($.cached('sasslint'))
        .pipe(sasslint())
        .pipe($.notify({
            onLast: true,
            message: 'Linting SCSS files'
        }));
});

/* Minify and remove unused CSS */
gulp.task('css-min', function() {
    return gulp.src('app/styles/css/main.css')
        .pipe(uncss({
            html: ['app/*.html']
        }))
        .pipe(csso())
        .pipe(gulp.dest('build/styles'))
        .pipe($.notify({
            onLast: true,
            message: 'Minifying and removing unused CSS'
        }));
});


/* ======================================== 
 * Development tasks - Javascript
 * ======================================== */ 
/* Assemble and lint JS files with Browserify */
gulp.task('browserify', ['jshint'], function() {
    var b = browserify({
        entries: './app/scripts/src/main.js'
    });

    return b.bundle()
        .pipe(source('output.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('app/scripts/out'))
        .pipe($.notify({
            onLast: true,
            message: 'Concatenating Javascript files'
        }));
});

gulp.task('jshint', function() {
    return gulp.src('./app/scripts/src/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe($.notify('Linting Javascript files'));
});

gulp.task('js-min', function() {
    return gulp.src('./app/scripts/out/output.js')
        .pipe(uglify())
        .pipe(gulp.dest('build/scripts'))
        .pipe($.notify('Uglifying Javascript'));
});

/* ======================================== 
 * Server tasks
 * ======================================== */ 
/* Start Express server instance */
gulp.task('server', function() {
    server.run(['server/server.js']); 
    console.log('App is running on port 3000');
});


/* ======================================== 
 * Utility tasks 
 * ======================================== */
/* Rename main css file for critical path inlining */
gulp.task('copy-styles', function() {
    return gulp.src(['build/styles/main.css'])
        .pipe(rename({
            basename: 'site'
        }))
        .pipe(gulp.dest('build/styles'));
});
