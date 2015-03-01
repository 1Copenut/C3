var gulp = require('gulp'),
    server = require('gulp-express'),
    sass = require('gulp-sass');

gulp.task('server', function() {
   server.run(['server/server.js']); 
});

gulp.task('sass', function() {
    gulp.src('app/styles/sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./app/styles/css'));
});
