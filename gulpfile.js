var gulp = require('gulp'),
    $ = require('gulp-load-plugins')();

var merge = require('merge-stream');

gulp.task('sass', function() {
    return gulp.src('./css/style.scss')
        .pipe($.plumber({errorHandler: $.notify.onError()}))
        .pipe($.sass())
        .pipe(gulp.dest('./css/'))
        .pipe($.minifyCss())
        .pipe($.rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./css/'))
});

gulp.task('sprite', function() {
    var spriteData =
        gulp.src('./img/icons/**/*')
            .pipe($.plumber({errorHandler: $.notify.onError()}))
            .pipe($.spritesmith({
                imgName: '../img/sprite.png',
                cssName: '_sprite.scss',
                cssTemplate: './css/_sprite.scss.handlebars',
                padding: 5,
                'functions': true,
                'variableNameTransforms': ['dasherize']
            }));

    var imgStream = spriteData.img
        .pipe($.plumber({errorHandler: $.notify.onError()}))
        .pipe($.imagemin())
        .pipe(gulp.dest('./img/'));

    var cssStream = spriteData.css
        .pipe(gulp.dest('./css/'));

    return merge(imgStream, cssStream);
});

gulp.task('imagemin', function() {
    return gulp.src(['./img/**/*', '!img/icons/**/*'])
        .pipe($.plumber({errorHandler: $.notify.onError()}))
        .pipe($.imagemin())
        .pipe(gulp.dest('./img/'));
});

gulp.task('js', function() {
    return gulp.src('./js/main.js')
        .pipe($.plumber({errorHandler: $.notify.onError()}))
        //.pipe(gulp.dest('./js/'))
        .pipe($.uglifyjs())
        .pipe($.rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./js/'));
});

gulp.task('serve', $.serve({
    root: './',
    port: 3000
}));

gulp.task('watch', function() {
    gulp.watch('css/**/*.{scss,sass}', ['sass']);
    gulp.watch('img/icons/**/*', ['sprite']);
    gulp.watch(['img/**/*', '!img/icons/**/*', '!img/sprite.png'], ['imagemin']);
    gulp.watch(['js/**/*.js', '!**/*.min.js'], ['js']);
});

// Creating a default task
gulp.task('default', ['watch', 'serve']);