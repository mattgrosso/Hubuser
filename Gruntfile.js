module.exports = function (grunt) {

  grunt.initConfig({

    jshint: {
      options: {
        jshintrc: true
      },
      all: ['js/*.js']
    },

    sass: {
      project: {
        files: {
          'build/css/main.css': 'scss/main.scss'
        }
      }
    },

    watch: {
      js: {
        files:['js/*.js'],
        tasks:['jsbuild']
      },
      sass: {
        files: ['scss/**/*.scss'],
        tasks: ['sass']
      },
      movehtml: {
        files: ['index.html'],
        tasks: ['copy:html']
      }
    },

    clean: ['build/'],

    copy: {
      html: {
        expand: true,
        src: ['index.html'],
        dest: 'build/'
      },
      vendorjs: {
        expand: true,
        src: ['jquery.js'],
        dest: 'build/js/vendor/',
        cwd: 'js/vendor/jquery/dist/'
      }
    },

    concat: {
      options: {
        seperator: ';',
        soureceMap: true
      },
      js: {
        src: ['js/*.js'],
        dest: 'build/js/main.js'
      }
    },

    mocha: {
      all: {
        // urls: ['localhost:8888/test/(((nameoftestharness))).html']
        //
        // This needs to be in the test harness.
        // if (navigator.userAgent.indexOf('PhantomJS') < 0) {
        //   mocha.run();
        // }
      }
    },

    connect: {
      server: {
        options: {
          port: 8888,
          base: '.'
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-contrib-connect');


  grunt.registerTask('default', [ 'clean', 'copy', 'jsbuild', 'css-build']);
  grunt.registerTask('jsbuild', ['jshint', 'concat:js']);
  grunt.registerTask('css-build', ['sass']);
  grunt.registerTask('test', ['connect', 'mocha']);

};
