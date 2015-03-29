var gulp = require('gulp'),
    server = require('gulp-express'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    sasslint = require('gulp-scss-lint'),
    cache = require('gulp-cached');

gulp.task('server', function() {
    server.run(['server/server.js']); 
    console.log('App is running on port 3000');
});

gulp.task('sass', function() {
    gulp.src('app/styles/sass/*.scss')
        .pipe(sourcemaps.init())
            .pipe(sass())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/styles/css'));
});

gulp.task('sasslint', function() {
    gulp.src('app/styles/sass/*.scss')
        .pipe(cache('sasslint'))
        .pipe(sasslint());
});
