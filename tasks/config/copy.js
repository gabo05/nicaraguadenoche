/**
 * `copy`
 *
 * ---------------------------------------------------------------
 *
 * Copy files and/or folders from your `assets/` directory into
 * the web root (`.tmp/public`) so they can be served via HTTP,
 * and also for further pre-processing by other Grunt tasks.
 *
 * #### Normal usage (`sails lift`)
 * Copies all directories and files (except CoffeeScript and LESS)
 * from the `assets/` folder into the web root -- conventionally a
 * hidden directory located `.tmp/public`.
 *
 * #### Via the `build` tasklist (`sails www`)
 * Copies all directories and files from the .tmp/public directory into a www directory.
 *
 * For usage docs see:
 *   https://github.com/gruntjs/grunt-contrib-copy
 *
 */
module.exports = function(grunt) {

  var dependencies = [
    {
      expand: true,
      cwd: './assets/libdev',
      src: ['angular/angular.min.js', 'bootstrap/dist/js/bootstrap.min.js', 'jquery/dist/jquery.min.js', 'moment/min/moment.min.js', 'underscore/underscore-min.js'
      , 'bxslider-4/dist/jquery.bxslider.min.js', 'desandro-matches-selector/matches-selector.js', 'downcount/jquery.downCount.js'
      , 'fullcalendar/dist/fullcalendar.min.js', 'malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js'
      , 'masonry/masonry.pkgd.min.js', 'angular-animate/angular-animate.min.js', 'angular-toastr/dist/angular-toastr.min.js'],
      dest: '.tmp/public/lib/js',
      flatten: true
    },
    {
      expand: true,
      cwd: './assets/libdev',
      src: ['bootstrap/dist/css/bootstrap.min.css', 'font-awesome/css/font-awesome.min.css', 'bxslider-4/dist/jquery.bxslider.min.css'
      , 'fullcalendar/dist/fullcalendar.min.css', 'malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.min.css'
      , 'angular-toastr/dist/angular-toastr.min.css'],
      dest: '.tmp/public/lib/css',
      flatten: true
    },
    {
      expand: true,
      cwd: './assets/libdev',
      src: ['font-awesome/fonts/**'],
      dest: '.tmp/public/lib/fonts',
      flatten: true
    },
    {
      expand: true,
      cwd: './assets/libdev',
      src: ['bxslider-4/dist/images/*'],
      dest: '.tmp/public/lib/css/images',
      flatten: true
    },
    {
      expand: true,
      cwd: './assets',
      src: ['**/*.!(coffee|less)', '!**/libdev/**'],
      dest: '.tmp/public'
    }
  ];
  console.log('copiando dependencies');
  grunt.config.set('copy', {
    dev: {
      files: dependencies
    },
    build: {
      files: [{
        expand: true,
        cwd: '.tmp/public',
        src: ['**/*'],
        dest: 'www'
      }]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
};
