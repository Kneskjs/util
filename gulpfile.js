const gulp = require("gulp");
const gutil = require("gulp-util");
const browserify = require("browserify");
const buffer = require("vinyl-buffer");
const uglify = require("gulp-uglify");
const sourcemaps = require("gulp-sourcemaps");
const source = require("vinyl-source-stream");
// const concat = require("gulp-concat")

gulp.task("browserify", function() {
    const b = browserify({
        standalone: 'Util', 
        entries: "./index.js",
        debug: true,
    });

    return b
    .transform("babelify", {
        presets: ["@babel/env"],
        plugins: [
            [
                "@babel/plugin-transform-runtime", {
                    "helpers": false,
                    "regenerator": true,
                }
            ],
            // ["@babel/plugin-proposal-decorators", { "legacy": true }],
            // '@babel/plugin-proposal-object-rest-spread',
            // '@babel/plugin-proposal-do-expressions'
        ],
    })
    .bundle()
    .pipe(source("util.min.js"))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .on("error", gutil.log)
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("./dist/"));
});