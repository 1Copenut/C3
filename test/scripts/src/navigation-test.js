var should = require('chai').should();

describe('Navigation test suite', function() {
    var Navigation, navigationTest;

    before(function(done) {
        'use strict';
        Navigation = require('../../../app/scripts/src/navigation');
        Historical = require('../../../app/scripts/src/historical');
        navigationTest = new Navigation('#navigation li', '#navigation a', 'current');
        historicalTest = new Historical();
        done();
    });

    it('#constructor', function() {
        'use strict';
        should.exist(navigationTest.init);    
        should.exist(navigationTest.fetchHistoryURL);
        should.exist(navigationTest.setCurrentClass);
        should.exist(navigationTest.switchClass);
        should.exist(navigationTest.windowPopState);
    });

    it('#init', function() {
        should.exist(navigationTest.currentClass);
    });

    it('#fetchHistoryURL', function() {
        should.exist(navigationTest.links);
        should.exist(navigationTest.currentClass);
        should.exist(historicalTest);
    });
});
