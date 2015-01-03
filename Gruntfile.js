/* jslint camelcase: false */
'use strict';
module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      server: {
        options: {
          jshintrc: 'server.jshintrc'
        },
        src: ['Gruntfile.js', 'app.js', 'controllers/**/*.js', 'test/**/*.js']
      },
      client: {
        options: {
          jshintrc: 'client.jshintrc',
          extract: 'auto'
        },
        src: ['public/*.html']
      }
    },
    env: {
      serverTest: {
        XUNIT_FILE: 'test-results/server.xml'
      },
      e2eTest: {
        SERVER_URL: 'http://127.0.0.1:9898/'
      }
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'xunit-file',
          require: 'xunit-file'
        },
        src: ['test/server/**/*.js']
      }
    },
    mocha_istanbul: {
      coverage: {
        src: 'test/server'
      },
      options: {
        harmony: true,
        coverageFolder: 'coverage/server',
        reportFormats : ['lcov', 'cobertura']
      }
    },
    karma: {
      singleRun: {
        options: {
          configFile: 'karma.conf.js',
          singleRun: true
        }
      },
      multiRun: {
        options: {
          configFile: 'karma.conf.js'
        }
      }
    },
    webdriver: {
      options: {
        desiredCapabilities: {
          browserName: 'chrome'
        },
        reporter: 'XUnit',
        output: 'test-results/e2e.xml'
      },
      test: {
        tests: ['test/e2e/**/*.js']
      }
    },
    nodemon: {
      dev: {
        script: 'app.js',
        options: {
          env: {
            PORT: 9898
          },
          nodeArgs: ['--harmony'],
          legacyWatch: true,
          ignore: ['node_modules/', 'test/']
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-mocha-istanbul');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-webdriver');
  grunt.registerTask('make-test-results', function(){
    require('fs').mkdir('test-results');
  });
  grunt.registerTask('server-test', ['make-test-results', 'env:serverTest', 'mochaTest']);
  grunt.registerTask('e2e-test', ['env:e2eTest', 'webdriver']);
  grunt.registerTask('default', ['jshint', 'server-test', 'mocha_istanbul', 'karma:singleRun', 'e2e-test']);
  grunt.registerTask('serve', ['nodemon']);
};
