var gulp = require('gulp');
var browserSync = require('browser-sync');
var server = require('gulp-server-livereload');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-csso');
var concat = require('gulp-concat');
var del = require('del');

//server
gulp.task('serv', function () {
    gulp.src('app')
        .pipe(server({
             livereload: true,
             open: true
        }));
});

//clean public
gulp.task('clean', function() {
    return del.sync('public');
});

//styles
gulp.task('style', function(){
    return gulp.src('app/sass/**/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(prefix({
        browsers: ['last 15 versions']
    }))
    .pipe(gulp.dest('app/css'));
});

//build
gulp.task('build', ['clean'], function () {
    
    var build = gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulp.dest('public'));
    
    var buildFonts = gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('public/fonts'));
    
    var buildImg = gulp.src('app/img/**/*')
    .pipe(gulp.dest('public/img'));
    
    var buildJson = gulp.src('app/json/**/*')
    .pipe(gulp.dest('public/json'));
});

gulp.task('watch', function(){
    gulp.watch('app/sass/**/*.sass', ['style']);
})

// using browser-sync

//gulp.task('browser-sync', function() {
//   browserSync({
//       server: {
//           baseDir: 'app'
//       },
//       notify: false //виключення повідомлень
//   }); 
//});

//gulp.task('watch', function(){
//    gulp.watch('app/sass/**/*.sass', ['style']);
//    gulp.watch('app/*.html', browserSync.reload);
//    gulp.watch('app/js/**/*.js', browserSync.reload);
//});



gulp.task('default', ['serv', 'watch']);
//gulp.task('default', ['browser-sync', 'watch']);
