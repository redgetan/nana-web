const gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  watch = require('gulp-watch'),
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
const ENTRY       = "./client/application.js"
const WATCH_DIRS = ["./client/**/*.js"]
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
  const bundleApp = () => {
    console.log("Rebuilding dist/app.js")

    browserify({
      entries: [ENTRY]
    })
    .external(VENDORS) 
    .transform(babelify)
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(gulp.dest(DESTINATION));
  }

  watch(WATCH_DIRS, bundleApp);
  bundleApp();

});



