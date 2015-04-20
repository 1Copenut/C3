var expect = require('chai').should(),
    navigationTest = require('./navigation-test');

describe('Smoke test', function() {
    'use strict';
    var truth = true;
    it('should work', function() {
        truth.should.exist;
        truth.should.equal(true);
    });
});
