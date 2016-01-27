const gulp = require('gulp');
const babel = require('gulp-babel');
const watch = require('gulp-watch');
const uglify = require('gulp-uglify');
const cssmin = require('gulp-minify-css');
gulp.task('js', () => {
    return gulp.src(["src/*.js"])
        .pipe(babel({
            presets: ['es2015'],
            // plugins: ['transform-runtime']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});
gulp.task('css',()=>{
    return gulp .src(["src/*.css"])
        .pipe(cssmin())
        .pipe(gulp.dest('dist'));
});
gulp.task('img',()=>{
    return gulp .src(["src/*.gif","src/*.png","src/*.jpg"])
        .pipe(gulp.dest('dist'));
});
gulp.task('w',()=>{
    watch(["src/*.*"],()=>{
    	gulp.start(['js','css','img']);
    })
});
gulp.task('default',()=>{
    gulp.start(['js','css','img']);
});