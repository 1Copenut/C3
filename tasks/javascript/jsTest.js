/* global module */
module.exports = function(gulp, beep, $) {
    function handleError(err) {
        'use strict';
        beep(2);
        console.log(err.toString());
        this.emit('end'); 
    };

    return function() {
        'use strict';
        gulp.src('test/index.html')
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
    };
};
