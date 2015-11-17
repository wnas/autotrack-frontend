'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');
var jade = require('gulp-jade');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var watch = require('gulp-watch');
var livereload = require('gulp-livereload');
var image = require('gulp-image');
var autoprefixer = require('gulp-autoprefixer');

var pages = './dist/*.html';




gulp.task('sass', function () {
  gulp.src('./scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
    .pipe(gulp.dest('./dist/css'));
});

var scripts = ['js/*.js','!js/html5shim.js'];

// Lint Task
gulp.task('lint', function() {
    return gulp.src
        .pipe(jshint(scripts))
        .pipe(jshint.reporter('default'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src(scripts)
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
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

gulp.task('default', ['sass', 'templates', 'scripts','image'], function(){

  livereload.listen();
  gulp.watch('js/*.js', ['scripts']);
  gulp.watch('./scss/**/*.scss', ['sass']);
  gulp.watch('./**/*.jade', ['templates']);

  gulp.watch(['./scss/**/*.scss','./**/*.jade'], function() {
    livereload.reload('./dist/*');
  })
});
