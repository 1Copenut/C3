var gulp = require('gulp'),
    server = require('gulp-express'),
    plumber = require('gulp-plumber'),
    gulpFilter = require('gulp-filter'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    sasslint = require('gulp-scss-lint'),
    cache = require('gulp-cached');

gulp.task('server', function() {
    server.run(['server/server.js']); 
    console.log('App is running on port 3000');
});

gulp.task('sass', function() {
    var filter = gulpFilter(['*.css', '!*.map']);
    
    return gulp.src('app/styles/sass/*.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({ errLogToConsole: true }))
        .pipe(sourcemaps.write('./'))
        .pipe(filter)
        .pipe(autoprefixer({browsers: ['last 2 versions']}))
        .pipe(filter.restore())
        .pipe(gulp.dest('app/styles/css'));
});

gulp.task('sasslint', function() {
    return gulp.src('app/styles/sass/*.scss')
        .pipe(cache('sasslint'))
        .pipe(sasslint());
});
