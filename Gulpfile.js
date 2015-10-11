/* global require */
var gulp = require('gulp'),
    autoprefixer = require('autoprefixer'),
    beep = require('beepbeep'),
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
 * Development tasks - CSS
 * ======================================== */ 
/* Concatenate sass files, add source maps and Autoprefix CSS */
gulp.task('sass', ['sass-lint'], function() {
	'use strict';
    var filter = $.filter(['*.css', '!*.map']);
    
    return gulp.src('app/styles/sass/*.scss')
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe($.sass({
            errLogToConsole: true
        }))
        .pipe($.sourcemaps.write('./'))
        .pipe(filter)
        .pipe($.postcss([
            autoprefixer({ browsers: ['last 3 versions'] })
        ]))
        .pipe(filter.restore())
        .pipe(gulp.dest('app/styles/css'))
        .pipe(browsersync.stream({match: '**/*.css'}))
        .pipe($.notify({
            onLast: true,
            message: 'Done concatenating CSS'
        }));
});

/* Style check the sass */
gulp.task('sass-lint', function() {
	'use strict';
    return gulp.src('app/styles/sass/*.scss')
        .pipe($.cached('scssLint'))
        .pipe($.scssLint())
        .pipe($.notify({
            onLast: true,
            message: 'Done linting SCSS files'
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

/* Run the JSHint on all files to ensure proper coding */
gulp.task('jshint', function() {
	'use strict';
    return gulp.src('./app/scripts/src/*.js')
        .pipe($.jshint())
        .pipe($.jshint.reporter(stylish))
        .pipe($.notify({
            onLast: true,
            message: 'Done linting Javascript files'
        }));
});


/* ======================================== 
 * Server tasks
 * ======================================== */ 
/* Start Express server instance */
gulp.task('server', ['browsersync'], function() {
	'use strict';
    console.log('App is running on port 3000');
});

/* Start the Browser Sync task to automatically reload the page */
gulp.task('browsersync', ['nodemon'], function() {
    'use strict';

    browsersync.init(null, {
        proxy: 'http://localhost:3000',
        files: ['app/**/*.html'],
        browser: 'google chrome',
        port: 7000
    });

    gulp.watch('app/*.html', ['browsersync-reload']);
    gulp.watch('app/styles/sass/*.scss', ['sass']);
    gulp.watch('app/scripts/src/*.js', ['browserify-app', 'test', 'browsersync-reload']);
    gulp.watch('test/scripts/src/*.js', ['test', 'browsersync-reload']);
});

/* Make the Browsersync reload a Gulp task */
gulp.task('browsersync-reload', function() {
    browsersync.reload();
});

/* Fire up Express and Nodemon as our development server */
gulp.task('nodemon', function(cb) {
    var started = false;

    return $.nodemon({ 
        script: 'server/server.js'
    }).on('start', function() {
        if (!started) {
            cb();
            started = true;
        }
    });
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

