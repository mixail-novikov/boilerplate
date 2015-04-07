var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

// Gulp Sass Task
gulp.task('sass', function() {
    gulp.src('./css/**/*.{scss,sass}')
        // Initializes sourcemaps
        .pipe(sourcemaps.init())
        .pipe(sass({
            errLogToConsole: true
        }))
        // Writes sourcemaps into the CSS file
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./css'));
});

// Watch scss folder for changes
gulp.task('watch', function() {
    // Watches the scss folder for all .scss and .sass files
    // If any file changes, run the sass task
    gulp.watch('./css/**/*.{scss,sass}', ['sass'])
});

// Creating a default task
gulp.task('default', ['sass', 'watch']);