const gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  babelify = require('babelify'),
  browserify = require('browserify'),
  watchify = require('watchify'),
  buffer = require('vinyl-buffer'),
  connect = require('gulp-connect'),
  source = require('vinyl-source-stream'),
  process = require('process'),
  rev = require('gulp-rev');


const env                = process.env.NODE_ENV || 'development';

const VENDORS = ['react'];
const ENTRY       = "./src/main.js"
const DESTINATION = "./dist/"

gulp.task('default', ['build:vendor', 'build:app']);

gulp.task('build:vendor', () => {
  const b = browserify();

  VENDORS.forEach(lib => {
    b.require(lib);
  });

  b.bundle()
  .pipe(source('vendor.js'))
  .pipe(buffer())
  .pipe(gulp.dest(DESTINATION));
  
});

gulp.task('build:app', () => {
  browserify({
    entries: [ENTRY]
  })
  .external(VENDORS) 
  .transform(babelify)
  .bundle()
  .pipe(source('app.js'))
  .pipe(buffer())
  .pipe(gulp.dest(DESTINATION));

});



