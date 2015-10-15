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
 * Sass module sub-tasks 
 * ======================================== */ 
gulp.task('sasslint', require('./tasks/sasslint')(gulp, $));
gulp.task('sassbuild', require('./tasks/sassbuild')(gulp, autoprefixer, browsersync, $));
gulp.task('sasscombine', require('./tasks/sasscombine')(gulp, sequence));


/* ======================================== 
 * Javascript module sub-tasks 
 * ======================================== */ 
gulp.task('eslint', require('./tasks/eslint')(gulp, $));
gulp.task('jsbuild', require('./tasks/jsbuild')(gulp, babelify, browserify, source, $));


/* ======================================== 
 * Server module sub-tasks 
 * ======================================== */ 
gulp.task('browsersync', require('./tasks/browsersync')(gulp, browsersync));
gulp.task('browsersyncreload', require('./tasks/browsersyncreload')(gulp, browsersync));
gulp.task('nodemon', require('./tasks/nodemon')(gulp, $));


/* ======================================== 
 * Default task
 *
 * Default task starts the server, listens
 * for changed files, and syncs multiple
 * windows' scroll position.
 * ======================================== */ 
gulp.task('default', ['browsersync', 'nodemon'], function() {
    gulp.watch('app/styles/sass/**/*.scss', ['sasscombine']);
    gulp.watch('app/**/*.html', ['browsersyncreload']);
    gulp.watch('app/scripts/src/*.js', ['browserify-app', 'test', 'browsersyncreload']);
    gulp.watch('test/scripts/src/*.js', ['test', 'browsersyncreload']);
});


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

/* Assemble and lint JS test files with Browserify */
gulp.task('browserify-test', ['jshint'], function() {
	'use strict';
    var b = browserify({
        entries: './test/scripts/src/main.js',
        insertGlobals: true
    });

    return b.bundle()
        .pipe(source('output-test.js'))
        .pipe(gulp.dest('test/scripts/out'))
        .pipe($.notify({
            onLast: true,
            message: 'Concatenating Javascript test files'
        }));
});


/* ======================================== 
 * Test tasks
 * ======================================== */ 
/* Run the Mocha Phantom test */
gulp.task('test', ['browserify-test'], function() {
    'use strict';
    return gulp.src('test/index.html')
        .pipe($.plumber({
            errorHandler: handleError
        }))
        .pipe($.mochaPhantomjs({
            reporter: 'spec'
        }))
        .pipe($.notify({
            onLast: true,
            message: "Done testing JS with Mocha"
        }));
});


/* ======================================== 
 * Utility tasks
 * ======================================== */ 
/* Print errors to the console and trigger a beep warning */
var handleError = function(err) {
    beep(2);
    console.log(err.toString());
    this.emit('end');
};
