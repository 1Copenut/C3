var navigationTest = require('./navigation-test'),
    historicalTest = require('./historical-test');

describe('Smoke test', function() {
    'use strict';
    var truth = true;
    it('should work', function() {
        truth.should.exist;
        truth.should.equal(true);
    });
});
