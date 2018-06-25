var gulp = require('gulp');
var sass = require('gulp-sass')

var mock = require('./mock');
var server = require('gulp-webserver');

// gulp.task('css', function() {
//     gulp.src('src/scss/*.scss')
//         .pipe(sass())
//         .pipe(gulp.dest('src/css'))
// });
// gulp.task('Css', function() {
//     gulp.src('src/scss/*.css')
//         .pipe(gulp.dest('src/css'))
// })
// gulp.task('wath', function() {
//     gulp.watch('src/scss/*.scss', ['css'])
//     gulp.watch('src/scss/*.css', ['Css'])
// });
gulp.task('server', function() {
    gulp.src('src')
        .pipe(server({
            port: 8080,
            open: true,
            middleware: function(req, res, next) {
                if (req.url === '/favicon.ico') {
                    return;
                }
                var pathname = require('url').parse(req.url, true).pathname;
                pathname = pathname == '/' ? '/index.html' : pathname;
                if (/\/api/g.test(req.url)) {
                    var data = mock(decodeURI(req.url));
                    res.end(JSON.stringify(data))
                };
                next();
            }
        }))
});
gulp.task('default', ['server'])