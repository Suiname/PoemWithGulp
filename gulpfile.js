var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var watch = require('gulp-watch')



watch(['./clientReact/*.js'], function(){
  console.log('aspp has been modified lets recompile')
  gulp.start('default')
})

gulp.task('default', function(){
  return browserify('./clientReact/app.js')
          .transform('babelify', {presets: ["react"]})
          .bundle()
          .pipe(source('build.js'))
          .pipe(gulp.dest('./server/public'))
})
