'use strict';

module.exports = {
  karma: {
    browsers: ['Chrome'],
    reporters: ['mocha', 'coverage'],
    coverageReporter: {
      type: 'html'
    },
    autoWatch: false,
    singleRun: true
  }
};

