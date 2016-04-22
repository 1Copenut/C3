'use strict';

module.exports = {
  karma: {
    browsers: ['Chrome', 'Firefox'],
    reporters: ['mocha', 'coverage'],
    coverageReporter: {
      type: 'html'
    },
    autoWatch: false,
    singleRun: true
  }
};

