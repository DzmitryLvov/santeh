module.exports = function (grunt) {
  // Load all grunt-* packages from package.json
  require('load-grunt-tasks')(grunt);

  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-angular-templates');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-processhtml');

  grunt.initConfig({
    paths: {
      src: {
        js: 'app/**/*.js',
        jsComponents: ['node_modules/angular/angular.min.js',
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
        cssComponents: [
          'node_modules/textangular/dist/textAngular.css',
          'node_modules/angular-material/angular-material.css',
          'node_modules/magnific-popup/dist/magnific-popup.css']
      },
      dest: {
        bundle: 'dist/bundle.min.js',
        jsMin: 'dist/all.min.js',
        css: 'dist/css/all.css',
        cssComponents: 'dist/css/components.css'
      }
    },
    concat: {
      jsBundle: {
        options: {
          separator: grunt.util.linefeed
        },
        src: ['<%= paths.src.jsComponents %>', '<%= paths.dest.jsMin %>', '<%= ngtemplates.myApp.dest %>'],
        dest: '<%= paths.dest.bundle %>'
      },
      css: {
        src: '<%= paths.src.css %>',
        dest: '<%= paths.dest.css %>'
      },
      cssComponents: {
        options: {
          separator: grunt.util.linefeed
        },
        src: '<%= paths.src.cssComponents %>',
        dest: '<%= paths.dest.cssComponents %>'
      }
    },
    uglify: {
      options: {
        compress: false,
        mangle: true,
        sourceMap: false
      },
      target: {
        src: '<%= paths.src.js %>',
        dest: '<%= paths.dest.jsMin %>'
      }
    },
    cssmin: {
      css: {
        files: [{
          expand: true,
          cwd: 'dist/css',
          src: 'all.css',
          dest: 'dist/css',
          ext: '.min.css'
      }, {
          expand: true,
          cwd: 'dist/css',
          src: 'components.css',
          dest: 'dist/css',
          ext: '.min.css'
      }]
      }
    },
    copy: {
      img: {
        files: [{
          expand: true,
          cwd: 'assets/img',
          src: ['**'],
          dest: 'build/assets/img'
        }]
      },
      fonts: {
        files: [{
          expand: true,
          cwd: 'node_modules/bootstrap/dist/fonts/',
          src: ['**'],
          dest: 'build/fonts'
        }]
      },
      bootstrap: {
        files: [{
          expand: true,
          cwd: 'node_modules/bootstrap/dist/css',
          src: 'bootstrap.min.css',
          dest: 'build/css/'
        }]
      },
      css: {
        files: [{
          expand: true,
          cwd: 'dist/css',
          src: '*.min.css',
          dest: 'build/css/'
        }]
      },
      js: {
        files: [{
          expand: true,
          cwd: 'dist',
          src: 'bundle.min.js',
          dest: 'build/'
        }]
      }
    },
    ngtemplates: {
      myApp: {
        cwd: 'app',
        src: '**/*.html',
        dest: 'dist/app.templates.js',
        options: {
          htmlmin: {
            collapseBooleanAttributes: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true,
            removeComments: true,
            removeEmptyAttributes: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true
          },
          prefix: 'app/'
        }
      }
    },
    processhtml: {
      build: {
        files: {
          'build/index.html': ['index.html']
        }
      }
    }
  });

  grunt.registerTask('default', 'concat vs. uglify', function (concat) {
    grunt.task.run('ngtemplates');
    grunt.task.run('uglify');
    grunt.task.run('concat');
    grunt.task.run('cssmin');
    grunt.task.run('copy');
    grunt.task.run('processhtml');
  });
}