module.exports = function(grunt) {
  'use strict';

  // Load Grunt Tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    uglify: {
      minify: {
        src: ['dist/zoetrope.js'],
        dest: 'dist/zoetrope.min.js'
      },
      bundle: {
        src: ['dist/bower.js', 'dist/zoetrope.js'],
        dest: 'dist/zoetrope.bundle.min.js'
      }
    },
    bower_concat: {
      build: {
        bowerOptions: {
          offline: true
        },
        dest: 'dist/bower.js'
      }
    },
    watchify: {
      build: {
        src: './source/**/*.js',
        dest: './dist/zoetrope.js'
      },
      options: {
        debug: true
      }
    },
    watch: {
      options: {
        debounceDelay: 250,
        livereload: true
      },

      build: {
        files: ['source/**/*'],
        tasks: ['scripts']
      },

      test: {
        files: ['test/**/*.js'],
        tasks: ['testling']
      },
    },
    testling: {
      build: { }
    }
  });

  // register subtasks
  grunt.registerTask('scripts', ['watchify']);
  grunt.registerTask('bundle', ['bower_concat', 'scripts', 'uglify']);

  // register main tasks
  grunt.registerTask('test', ['bundle', 'testling', 'watch']);
  grunt.registerTask('default', ['bundle', 'watch:build']);
};
