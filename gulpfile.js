const gulp = require('gulp');
const babel = require('gulp-babel');
const watch = require('gulp-watch');
const uglify = require('gulp-uglify');
gulp.task('default', () => {
    return gulp.src(["src/*.js"])
        .pipe(babel({
            presets: ['es2015'],
            // plugins: ['transform-runtime']
        }))
        // .pipe(uglify())
        .pipe(gulp.dest('dist'));
});
gulp.task('w',()=>{
	watch(["src/*.js"],()=>{
		gulp.start('default');
	})
})