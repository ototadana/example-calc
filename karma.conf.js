module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'chai'],
    customLaunchers: {
      Chrome_NS: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },
    browsers: ['Chrome_NS'],
    reporters: ['progress', 'coverage', 'junit'],
    preprocessors: {
      'test/client/**/*.html': ['html2js'],
      'public/*.js': ['coverage']
    },
    junitReporter: {
      outputFile: 'test-results/client.xml'
    },
    coverageReporter: {
      reporters : [
        {type: 'lcov', subdir: '.'},
        {type: 'cobertura', subdir: '.'}
      ],
      dir : 'coverage/client/'
    },
    basePath: '.',
    files: [
      'test/client/**/*',
      {pattern: 'public/components/async/lib/async.js', watch: false},
      {pattern: 'public/components/sinon-1.12.2/index.js', watch: false},
      {pattern: 'public/**', included: false}
    ]
  });
};
