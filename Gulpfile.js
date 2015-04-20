/* global require */
var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    browserify = require('browserify'),
    buffer = require('vinyl-buffer'),
    chai = require('chai'),
    critical = require('critical'),
    csso = require('gulp-csso'),
    del = require('del'),
    htmlbuild = require('gulp-htmlbuild'),
    jshint = require('gulp-jshint'),
    mocha = require('mocha'),
    mochaPhantom = require('gulp-mocha-phantomjs'),
    paths = require('vinyl-paths'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    sasslint = require('gulp-scss-lint'),
    sequence = require('run-sequence'),
    server = require('gulp-express'),
    /* shim = require('browserify-shim'), */
    source = require('vinyl-source-stream'),
    sourcemaps = require('gulp-sourcemaps'),
    stream = require('event-stream'),
    stylish = require('jshint-stylish'),
    uglify = require('gulp-uglify'),
    uncss = require('gulp-uncss'),
    watch = require('gulp-watch'),
    
    $ = require('gulp-load-plugins')();


/* ======================================== 
 * Build tasks 
 * ======================================== */ 
/* Remove the build folder, minify CSS, copy index */
gulp.task('build', function() {
	'use strict';
    sequence(
        'build-remove',
        ['build-index', 'css-min', 'js-min', 'copy-js']
    );
});

/* Remove the build folder each time we rebuild */
gulp.task('build-remove', function() {
	'use strict';
    return gulp.src('build/')
        .pipe($.notify('Removing the build directory'))
        .pipe(paths(del));
});

/* Create the index.html file in /build */
gulp.task('build-index', function () {
	'use strict';
    return gulp.src(['app/index.html'])
        .pipe(htmlbuild({
            css: htmlbuild.preprocess.css(function (block) {
                block.end('styles/main.css');
            }),

            js: htmlbuild.preprocess.js(function(block) {
                block.end('scripts/output.js');
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


/* ======================================== 
 * Development tasks - CSS
 * ======================================== */ 
/* Concatenate sass files, add source maps and Autoprefix CSS */
gulp.task('sass', ['sass-lint'], function() {
	'use strict';
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
	'use strict';
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
	'use strict';
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
gulp.task('browserify-app', ['jshint'], function() {
	'use strict';
    var b = browserify({
        entries: './app/scripts/src/main.js',
        insertGlobals: true
    });

    return b.bundle()
        .pipe(source('output.js'))
        .pipe(gulp.dest('app/scripts/out'))
        .pipe($.notify({
            onLast: true,
            message: 'Concatenating Javascript application files'
        }));
});

gulp.task('browserify-test', ['jshint'], function() {
	'use strict';
    var b = browserify({
        entries: './test/scripts/src/main.js',
        insertGlobals: true
    });

    return b.bundle()
        .pipe(source('output.js'))
        .pipe(gulp.dest('test/scripts/out'))
        .pipe($.notify({
            onLast: true,
            message: 'Concatenating Javascript test files'
        }));
});

gulp.task('jshint', function() {
	'use strict';
    return gulp.src('./app/scripts/src/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe($.notify({
            onLast: true,
            message: 'Linting Javascript files'
        }));
});

gulp.task('js-min', function() {
	'use strict';
    return gulp.src('./app/scripts/out/output.js')
        .pipe(buffer())
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('build/scripts'))
        .pipe($.notify('Uglifying Javascript'));
});

/* ======================================== 
 * Server tasks
 * ======================================== */ 
/* Start Express server instance */
gulp.task('server', function() {
	'use strict';
    server.run(['server/server.js']); 
    console.log('App is running on port 3000');
});


/* ======================================== 
 * Test tasks
 * ======================================== */ 
/* Run the Mocha Phantom test */
gulp.task('test', ['browserify-test'], function() {
    return gulp.src('test/index.html')
        .pipe(mochaPhantom({
            reporter: 'spec'
        }))
        .pipe($.notify({
            onLast: true,
            message: "Testing JS with Mocha"
        }));
});

/* ======================================== 
 * Utility tasks 
 * ======================================== */
/* Rename main css file for critical path inlining */
gulp.task('copy-js', function() {
    'use strict';
    return gulp.src(['app/lib/**/*.js'])
        .pipe(gulp.dest('build/lib'))
        .pipe($.notify({
            onLast: true,
            message: 'Copying /lib directory Javascript'
        }))
});

gulp.task('copy-styles', function() {
	'use strict';
    return gulp.src(['build/styles/main.css'])
        .pipe(rename({
            basename: 'site'
        }))
        .pipe(gulp.dest('build/styles'));
});

gulp.task('watch', function() {
    gulp.watch('app/styles/sass/*.scss', ['sass']);
    gulp.watch('app/scripts/src/*.js', ['browserify-app', 'test']);
    gulp.watch('test/scripts/src/*.js', ['test']);
});
