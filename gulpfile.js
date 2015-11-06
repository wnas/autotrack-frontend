'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var jade = require('gulp-jade');
var watch = require('gulp-watch');
var livereload = require('gulp-livereload');
var image = require('gulp-image');

var pages = './dist/*.html';


gulp.task('sass', function () {
  gulp.src('./scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('templates', function() {
  gulp.src('./**/*.jade')
    .pipe(jade({
      pretty: true,
      client: false
    }))
    .pipe(gulp.dest( './dist/' ))
});

gulp.task('image', function(){
    gulp.src('./img/*')
        .pipe(image())
        .pipe(gulp.dest('./dist/img'));
})

gulp.task('default', ['sass', 'templates','image'], function(){

  livereload.listen();

  gulp.watch('./scss/**/*.scss', ['sass']);
  gulp.watch('./**/*.jade', ['templates']);

  gulp.watch(['./scss/**/*.scss','./**/*.jade'], function() {
    livereload.reload('./dist/*');
  })
});
