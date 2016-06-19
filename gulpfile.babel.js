import gulp from 'gulp';
import babel from 'gulp-babel';
import mocha from 'gulp-mocha';

gulp.task('build', () => {
  return gulp.src('src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('build'));
});

gulp.task('test', () => {
  return gulp.src('test/*.js')
    .pipe(mocha({
      compilers: ['js:babel-core/register']
    }));
});
