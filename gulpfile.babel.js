import gulp from 'gulp';
import babel from 'gulp-babel';
import mocha from 'gulp-mocha';
import webpack from 'webpack';
import { log, PluginError } from 'gulp-util';

gulp.task('transpile:server', () => {
  return gulp.src('src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('build'));
});

gulp.task('copy:server', () => {
  return gulp.src('src/**/*.json')
    .pipe(gulp.dest('build'));
});

gulp.task('webpack:client', done => {
  let webpackConfig = require('./client/webpack.development.config.babel');
  if (process.env.NODE_ENV === 'production') {
    webpackConfig = require('./client/webpack.production.config.babel');
  }
  webpack(webpackConfig, (err, stats) => {
    if (err) throw new PluginError('webpack', err);
    log('[webpack]', stats.toString());
    done();
  });
});

gulp.task('build:server', ['copy:server', 'transpile:server']);
gulp.task('build:client', ['webpack:client']);
gulp.task('build', ['build:server', 'build:client']);

gulp.task('test:server', () => {
  return gulp.src('test/**/*.js')
    .pipe(mocha({
      compilers: ['js:babel-core/register']
    }));
});

gulp.task('test:client', () => {
  return gulp.src([
    '!client/test/support/**/*',
    'client/test/**/*@(.js|.jsx)'
  ]).pipe(mocha({
    compilers: ['js:babel-core/register'],
    require: ['./client/test/support/test-helper.js']
  }));
});

gulp.task('test', ['test:client', 'test:server']);
