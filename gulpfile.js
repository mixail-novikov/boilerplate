var gulp = require('gulp'),
    $ = require('gulp-load-plugins')();

gulp.task('sass', function() {
    gulp.src('./css/style.scss')
        .pipe($.sourcemaps.init())
        .pipe($.sass({
            errLogToConsole: true
        }))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest('./css'));
});

// Watch scss folder for changes
gulp.task('watch', function() {
    gulp.watch('css/**/*.{scss,sass}', ['sass']);
});

// Creating a default task
gulp.task('default', ['sass', 'watch']);