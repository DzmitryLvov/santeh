module.exports = function (grunt) {
  // Load all grunt-* packages from package.json
  require('load-grunt-tasks')(grunt);
  
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-angular-templates');
  
  grunt.initConfig({
    paths: {
      src: {
        js: 'app/**/*.js'
        , jsComponents: ['node_modules/angular/angular.min.js',
          'node_modules/angular-ui-router/release/angular-ui-router.min.js',
          'node_modules/datejs/build/production/date.js',
          'node_modules/underscore/underscore-min.js',
          'node_modules/angular-underscore/index.js',
          'node_modules/jquery/jquery.min.js',
          'node_modules/bootstrap/dist/js/bootstrap.min.js',
          'node_modules/firebase/firebase.js',
          'node_modules/firebase/firebase-app.js',
          'node_modules/firebase/firebase-database.js',
          'node_modules/textangular/dist/textAngular-rangy.min.js',
          'node_modules/textangular/dist/textAngular-sanitize.min.js',
          'node_modules/textangular/dist/textAngular.min.js',
          'node_modules/angular-aria/angular-aria.js',
          'node_modules/angular-animate/angular-animate.js',
          'node_modules/angular-material/angular-material.min.js',
          'node_modules/magnific-popup/dist/jquery.magnific-popup.min.js',
          'node_modules/angularfire/dist/angularfire.min.js'],
        css: 'assets/css/*.css',
        cssComponents: ['node_modules/bootstrap/dist/css/bootstrap.min.css',
          'node_modules/textangular/dist/textAngular.css',
          'node_modules/angular-material/angular-material.css',
          'node_modules/font-awesome/css/font-awesome.min.css',
          'node_modules/magnific-popup/dist/magnific-popup.css']
      }
      , dest: {
        js: 'dist/all.js',
        jsComponents: 'dist/components.min.js'
        , jsMin: 'dist/all.min.js'
        , css: 'dist/all.css'
        , cssComponents: 'dist/components.css'
      }
    }
    , concat: {
      js: {
        options: {
          separator: ';'
        }
        , src: '<%= paths.src.js %>'
        , dest: '<%= paths.dest.js %>'
      }
      , jsComponents: {
        options: {
          separator: grunt.util.linefeed + ';' + grunt.util.linefeed
        }
        , src: '<%= paths.src.jsComponents %>'
        , dest: '<%= paths.dest.jsComponents %>'
      },
      css: {
          src: '<%= paths.src.css %>'
        , dest: '<%= paths.dest.css %>'
      },
      cssComponents: {
          src: '<%= paths.src.cssComponents %>'
        , dest: '<%= paths.dest.cssComponents %>'
      }
    }
    , uglify: {
      options: {
        compress: false
        , mangle: true
        , sourceMap: true
      }
      , target: {
        src: '<%= paths.src.js %>'
        , dest: '<%= paths.dest.jsMin %>'
      }
    },
   cssmin: {
    css: {
      files: [{
        expand: true,
        cwd: 'dist',
        src: 'all.css',
        dest: 'dist',
        ext: '.min.css'
      }, {
        expand: true,
        cwd: 'dist',
        src: 'components.css',
        dest: 'dist',
        ext: '.min.css'
      }]
    }
   }
  });
  grunt.registerTask('default', 'concat vs. uglify', function (concat) {
    // grunt default:true
    if (concat) {
      // Update the uglify dest to be the result of concat
      var dest = grunt.config('concat.js.dest');
      grunt.config('uglify.target.src', dest);
      grunt.task.run('concat');
      
    }
    // grunt default
    grunt.task.run('uglify');
    grunt.task.run('concat');
    grunt.task.run('cssmin');
  });
};