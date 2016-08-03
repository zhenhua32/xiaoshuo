var gulp = require('gulp');
var csslint = require('gulp-csslint');
var less = require('gulp-less');
var LessAutoprefix = require('less-plugin-autoprefix');
var autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] });
var uglify = require('gulp-uglify');
var pump = require('pump');

gulp.task('default', function() {
  // place code for your default task here
});

gulp.task('css', function() {
  gulp.src('client/css/*.css')
    .pipe(csslint())
    .pipe(csslint.reporter());
});

gulp.task('less', function () {
   gulp.src('./less/**/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ],
      plugins: [autoprefix]
    }))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('uglify', function() {
  gulp.src('src/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('lib/*js'));
})
