const gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  watch = require('gulp-watch'),
  babelify = require('babelify'),
  minifyCSS = require('gulp-minify-css'),
  gulpif = require('gulp-if'),
  concat = require('gulp-concat'),
  browserify = require('browserify'),
  watchify = require('watchify'),
  buffer = require('vinyl-buffer'),
  connect = require('gulp-connect'),
  source = require('vinyl-source-stream'),
  rev = require('gulp-rev'),
  ejs = require("gulp-ejs"),
  rename = require('gulp-rename'),
  runSequence = require('run-sequence')

const  process = require('process')
const  fs = require('fs')


const env                = process.env.NODE_ENV || 'development'
let   isProduction       = env === "production"

const VENDORS = [
  'react', 
  'react-dom', 
  'react-router-dom', 
  'babel-polyfill',
  'request-promise-native',
  'formik',
  'react-stripe-elements'
]

const ENTRY       = "./client/application.js"
const STYLESHEETS = "./server/stylesheets/*.css"
const WATCH_DIRS = ["./client/**/*.js"]
const WATCH_VIEW_DIRS = ["./server/views/*.ejs"]
const DESTINATION = "./dist/"
const REV_MANIFEST_FILE = "dist/rev-manifest.json"
const REV_MANIFEST_FILE_WITHOUT_DIR = "rev-manifest.json"

gulp.task('default', ['build:all'])

gulp.task('build:all', (cb) => {
  runSequence('build:vendor', 'copy:images', 'build:stylesheets', 'build:javascript', 'build:revisionreplace', cb)
})

gulp.task('build', (cb) => {
  isProduction = true
  runSequence('build:vendor', 'copy:images', 'build:stylesheets', 'build:javascript', 'build:revisionreplace', cb)
})

gulp.task('build:vendor', () => {
  const b = browserify()

  VENDORS.forEach(lib => {
    b.require(lib);
  })

  return b.bundle()
    .pipe(source('vendor.js'))
    .pipe(buffer())
    .pipe(gulpif(isProduction, uglify()))
    .pipe(gulpif(isProduction, rev()))
    .pipe(gulp.dest(DESTINATION))
    .pipe(gulpif(isProduction, rev.manifest(REV_MANIFEST_FILE, { merge: true })))
    .pipe(rename(REV_MANIFEST_FILE_WITHOUT_DIR))
    .pipe(gulp.dest(DESTINATION))
  
})

gulp.task('build:stylesheets', () => {
  const bundleCSS = () => {
    console.log("Rebuilding dist/style.css")

    return gulp.src(STYLESHEETS)
      .pipe(concat('style.css'))
      .pipe(minifyCSS())
      .pipe(gulpif(isProduction, rev()))
      .pipe(gulp.dest(DESTINATION))
      .pipe(gulpif(isProduction, rev.manifest(REV_MANIFEST_FILE, { merge: true })))
      .pipe(rename(REV_MANIFEST_FILE_WITHOUT_DIR))
      .pipe(gulp.dest(DESTINATION))
  }

  if (!isProduction) watch(STYLESHEETS, bundleCSS)
  
  return bundleCSS()
})

gulp.task('copy:images', () => {
  gulp.src("./public/**/*").pipe(gulp.dest(DESTINATION + "/assets"))
})

gulp.task('build:javascript', () => {
  const bundleApp = () => {
    console.log("Rebuilding dist/app.js")

    return browserify({
      entries: [ENTRY],
      fullPaths: true
    })
    .external(VENDORS) 
    .transform(babelify)
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(gulpif(isProduction, uglify()))
    .pipe(gulpif(isProduction, rev()))
    .pipe(gulp.dest(DESTINATION))
    .pipe(gulpif(isProduction, rev.manifest(REV_MANIFEST_FILE, { merge: true })))
    .pipe(rename(REV_MANIFEST_FILE_WITHOUT_DIR))
    .pipe(gulp.dest(DESTINATION))
  }

  if (!isProduction) watch(WATCH_DIRS, bundleApp)
  
  return bundleApp()
})

gulp.task('build:revisionreplace', () => {
  let manifest = {}

  if (isProduction) {
    manifest = JSON.parse(fs.readFileSync(REV_MANIFEST_FILE, 'utf8'));
  }

  const bundleLayout = () => {
    console.log("Rebuilding server/views/index.ejs")

    return gulp.src("./server/views/index.ejs")
      .pipe(ejs({ assetPath: function(path){
        return isProduction ? manifest[path] : path
      }}))
      .on('error', function(e){ console.log(e); })
      .pipe(rename("index.html"))
      .pipe(gulp.dest(DESTINATION));
  }

  if (!isProduction) watch(WATCH_VIEW_DIRS, bundleLayout)
  return bundleLayout()
})


