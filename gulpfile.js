const gulp = require('gulp'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    ejs = require("gulp-ejs")
    htmlbeautify = require('gulp-html-beautify')
    cssmin = require('gulp-cssmin')
;

gulp.task('html', function () {
    return gulp.src("./src/views/*.ejs")
        .pipe(ejs({}))
        .pipe(rename({ extname: '.html' }))
        .pipe(htmlbeautify())
        .pipe(browserSync.reload({ stream: true }))
        .pipe(gulp.dest("./dist"));
});

gulp.task('sass', function () {
	return gulp.src('src/scss/style.scss')
		.pipe(sass({ outputStyle: 'compressed' }))
		.pipe(rename({ suffix: '.min' }))
		.pipe(autoprefixer({
			overrideBrowserslist: ['last 8 version']
		}))
		.pipe(gulp.dest('./dist/css'))
		.pipe(browserSync.reload({ stream: true }));
});

gulp.task('style', function () {
	return gulp.src([
		'node_modules/normalize.css/normalize.css',
	    ])
		.pipe(concat('libs.min.css'))
		.pipe(cssmin())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('js', function () {
	return gulp.src('src/js/**/*.js')
        .pipe(browserSync.reload({ stream: true }))
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('image', function () {
	return gulp.src('src/images/**/**')
        .pipe(browserSync.reload({ stream: true }))
        .pipe(gulp.dest('./dist/images'));
});

gulp.task('browser-sync', function () {
	browserSync.init({
		server: {
			baseDir: 'dist/'
		}
	});
});

gulp.task('watch', function () {
	gulp.watch('src/images/**/**', gulp.parallel('image'));
	gulp.watch('src/scss/*.scss', gulp.parallel('sass'));
	gulp.watch('src/js/*.js', gulp.parallel('js'));
	gulp.watch('src/views/**/*.ejs', gulp.parallel('html'));
})

gulp.task('default', gulp.parallel('style', 'image', 'html', 'sass', 'watch', 'browser-sync'))
