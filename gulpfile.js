const { src, dest, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();
const nothing = () => {};

function scss() {
  return src('./scss/*.scss')
    .pipe(sass())
    .pipe(dest("./"))
    .pipe(browserSync.stream());
}

const jsWatched = false;
function js() {
  return src('./*.js')
    .pipe(uglify())
    .pipe(dest('./'))
}

function serve() {
  browserSync.init({
    server: "./"
  });

  jsWatched ? watch("./*.js", { ignoreInitial: false }).on('change', js) : nothing;
  watch('./*.js').on('change', browserSync.reload)
  watch("./*.html").on('change', browserSync.reload);
  watch('./scss/*.scss', { ignoreInitial: false }, scss);
}

module.exports.default = serve;