import gulp from 'gulp'
import gulpif from 'gulp-if'
import { argv } from 'node:process'
import browserSync from 'browser-sync'
import injectSVG from 'gulp-inject-svg'
import del from 'del'
import imagemin from 'gulp-imagemin'
import dartSass from 'sass'
import gulpSass from 'gulp-sass'
import webp from 'gulp-webp'
import imageResize from 'gulp-image-resize'
import rename from 'gulp-rename'
import htmlMin from 'gulp-htmlmin'
import autoprefixes from 'gulp-autoprefixer'
import cleanCSS from 'gulp-clean-css'
import babel from 'gulp-babel'
import sourcemaps from 'gulp-sourcemaps'
import realFavicon from 'gulp-real-favicon'
import fs from 'fs'
import pug from 'gulp-pug'

const isProduction = argv.includes('--prod')
const FAVICON_DATA_FILE = 'src/faviconData.json'
const src = gulp.src
const dest = gulp.dest
const watch = gulp.watch
const series = gulp.series
const parallel = gulp.parallel
const sass = gulpSass(dartSass)
browserSync.create()

function clean() {
  return del(['dist', FAVICON_DATA_FILE])
}

function fonts() {
  return src('src/fonts/**').pipe(dest('dist/fonts'))
}

function vendor() {
  return src('src/vendor/**').pipe(dest('dist'))
}

function imgCopyResized() {
  return src('src/img/*.{jpg,jpeg,png,webp}')
    .pipe(imageResize({ percentage: 50 }))
    .pipe(dest('dist/img'))
}

function imgClean() {
  return del('dist/img')
}

function imgCopy() {
  return src('src/img/*.{jpg,jpeg,png}')
    .pipe(rename({ suffix: '@2x' }))
    .pipe(dest('dist/img'))
}

function imgMin() {
  return src('dist/img/*.{jpg,jpeg,png}')
    .pipe(imagemin())
    .pipe(dest('dist/img'))
}

function imgToWebp() {
  return src('dist/img/*.{jpg,jpeg,png}').pipe(webp()).pipe(dest('dist/img'))
}

function scss() {
  return src('src/css/**/*.scss')
    .pipe(gulpif(!isProduction, sourcemaps.init()))
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(
      autoprefixes({
        cascade: false,
      })
    )
    .pipe(
      cleanCSS({
        level: 2,
      })
    )
    .pipe(gulpif(!isProduction, sourcemaps.write()))
    .pipe(dest('dist'))
    .pipe(gulpif(!isProduction, browserSync.stream()))
}

function js() {
  return src('src/js/*.js')
    .pipe(gulpif(!isProduction, sourcemaps.init()))
    .pipe(
      babel({
        presets: ['@babel/preset-env'],
      })
    )
    .pipe(gulpif(!isProduction, sourcemaps.write()))
    .pipe(dest('dist'))
    .pipe(gulpif(!isProduction, browserSync.stream()))
}

function favicons(done) {
  realFavicon.generateFavicon(
    {
      masterPicture: 'src/img/favicon.svg',
      dest: 'dist',
      iconsPath: '/',
      design: {
        ios: {
          pictureAspect: 'backgroundAndMargin',
          backgroundColor: '#ffffff',
          margin: '28%',
          assets: {
            ios6AndPriorIcons: false,
            ios7AndLaterIcons: false,
            precomposedIcons: false,
            declareOnlyDefaultIcon: true,
          },
        },
        desktopBrowser: {
          design: 'raw',
        },
        windows: {
          pictureAspect: 'whiteSilhouette',
          backgroundColor: '#da532c',
          onConflict: 'override',
          assets: {
            windows80Ie10Tile: false,
            windows10Ie11EdgeTiles: {
              small: false,
              medium: true,
              big: false,
              rectangle: false,
            },
          },
        },
        androidChrome: {
          pictureAspect: 'shadow',
          themeColor: '#ffffff',
          manifest: {
            display: 'standalone',
            orientation: 'notSet',
            onConflict: 'override',
            declared: true,
          },
          assets: {
            legacyIcon: false,
            lowResolutionIcons: false,
          },
        },
        safariPinnedTab: {
          pictureAspect: 'silhouette',
          themeColor: '#ff862f',
        },
      },
      settings: {
        scalingAlgorithm: 'Mitchell',
        errorOnImageTooSmall: false,
        readmeFile: false,
        htmlCodeFile: false,
        usePathAsIs: false,
      },
      markupFile: FAVICON_DATA_FILE,
    },
    function () {
      done()
    }
  )
}

function html() {
  return src('src/*.pug')
    .pipe(pug())
    .pipe(injectSVG({ base: 'src/img/inline/' }))
    .pipe(
      realFavicon.injectFaviconMarkups(
        JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code
      )
    )
    .pipe(gulpif(isProduction, htmlMin({ collapseWhitespace: true })))
    .pipe(dest('dist'))
    .pipe(gulpif(!isProduction, browserSync.stream()))
}

function watchFiles() {
  gulpif(
    !isProduction,
    browserSync.init({
      server: {
        baseDir: 'dist',
      },
    })
  )
}

watch(['src/**/*.pug', 'src/img/inline/*.svg'], html)
watch('src/fonts/**', fonts)
watch('src/vendor/**', vendor)
watch('src/js/**/*.js', js)
watch('src/css/**/*.scss', scss)

const images = series(imgClean, imgCopyResized, imgCopy, imgToWebp, imgMin)
watch('src/img/*', images)

export { clean }
export default series(
  clean,
  parallel(fonts, vendor, images, series(favicons, html), scss, js),
  watchFiles
)
