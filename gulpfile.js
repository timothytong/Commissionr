const gulp = require('gulp');
const babel = require('gulp-babel');
const flow = require('gulp-flowtype');
const html = require('gulp-html');
const sourcemaps = require('gulp-sourcemaps');
const webpack = require('webpack-stream');
const yarn = require('gulp-yarn');
const zip = require('gulp-zip');
const runSequence = require('run-sequence');

gulp.task('scripts', () => {
    return gulp.src(['!src/static/**/*', 'src/**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('build'));
});

gulp.task('html', () => {
    return gulp.src('src/static/*.html')
        .pipe(sourcemaps.init())
        .pipe(html())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('build/static'));
});

gulp.task('support', () => {
    return gulp.src('src/static/support/**/*')
        .pipe(gulp.dest('build/static/support'));
});

gulp.task('webpack', () => {
    return gulp.src('src/app-client.js')
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('build/static/js'));
});

gulp.task('flow', () => {
    return gulp.src('src/**/*.js').pipe(flow({
        killFlow: false,
        declarations: './flow-typed'
    }));
});

gulp.task('set-prod-node-env', () => {
    return process.env.NODE_ENV = 'production';
});

gulp.task('set-staging-node-env', () => {
    return process.env.NODE_ENV = 'staging';
})

gulp.task('prod-build', ['set-prod-node-env'], (cb) => {
    runSequence(['flow', 'scripts', 'html', 'support', 'webpack'], cb);
});

gulp.task('staging-build', ['set-staging-node-env'], (cb) => {
    runSequence(['flow', 'scripts', 'html', 'support', 'webpack'], cb);
});

gulp.task('zip-prod', ['prod-build'], () => {
    return gulp.src(['package.json', 'build/**'], {base: './'})
        .pipe(zip('build-prod.zip'))
        .pipe(gulp.dest('release'));
});

gulp.task('zip-staging', ['staging-build'], () => {
    return gulp.src(['package.json', 'build/**'], {base: './'})
        .pipe(zip('build-staging.zip'))
        .pipe(gulp.dest('release'));
});

gulp.task('build', ['webpack', 'scripts', 'html', 'support',]);

gulp.task('yarn', () => {
    return gulp.src(['package.json'])
        .pipe(yarn());
});

gulp.task('watch', ['webpack', 'flow', 'scripts', 'html', 'support'], () => {
    gulp.watch(['src/**/*.js'], ['flow', 'scripts', 'html']);
    gulp.watch(['src/static/*.html'], ['html']);
    gulp.watch(['src/components/**/*.js', 'src/components/*.js', 'src/components/*.jsx', 'src/components/**/*.jsx'], ['webpack']);
    gulp.watch(['package.json'], ['yarn']);
});

gulp.task('default', ['watch']);
