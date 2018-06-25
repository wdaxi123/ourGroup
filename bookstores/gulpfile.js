var gulp = require('gulp');
var sass = require('gulp-sass');
var clean = require('gulp-clean');
var autoprefixer = require('gulp-autoprefixer');
var minCss = require('gulp-clean-css');
var webserver = require('gulp-webserver');
var sequence = require('gulp-sequence');

var mock = require('./mock');

gulp.task('clean', function() {
    return gulp.src('./src/css')
        .pipe(clean());
});

gulp.task('minCss', function() {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4']
        }))
        .pipe(minCss())
        .pipe(gulp.dest('./src/css'));
});
gulp.task('css', function() {
    return gulp.src('./src/scss/*.css')
        .pipe(gulp.dest('./src/css'));
});
gulp.task('watch', function() {
    gulp.watch('./src/scss/*.scss', ['minCss']);
});

gulp.task('server', function() {
    gulp.src('src')
        .pipe(webserver({
            port: 8778,
            livereload: true,
            open: true,
            middleware: function(req, res, next) {
                // console.log(req.url)
                if (/\/api/g.test(req.url)) {
                    // console.log(mock(req.url));
                    var url = decodeURI(req.url)
                    var data = mock(url);
                    res.end(JSON.stringify(data))
                }

            }
        }));
});

gulp.task('default', function(cb) {
    sequence('clean', ['css', 'minCss'], 'server', 'watch', cb);
});