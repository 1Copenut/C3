/* global module */
module.exports = function(gulp, $) {
  return function() {
    'use strict';

    var stream = gulp.src(['app/styles/sass/core/*.scss', 'app/styles/sass/components/*.scss', '!app/styles/sass/lib/**/*.scss'])
    .pipe($.scssLint())
    .pipe($.notify({
      onLast: true,
      message: 'Done linting SCSS files'
    }));

    return stream;
  };
};

