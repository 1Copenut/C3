var should = require('chai').should();

describe('Navigation module', function() {
    var Navigation, navigationTest;

    before(function(done) {
        'use strict';
        Navigation = require('../../../../app/scripts/src/navigation');
        navigationTest = new Navigation('#navigation li', '#navigation a', 'current');
        done();
    });

    it('#constructor', function() {
        'use strict';
        navigationTest.should.be.an.instanceof(Navigation);
        navigationTest.should.have.property('list', '#navigation li');
        navigationTest.should.have.property('links', '#navigation a');
        navigationTest.should.have.property('currentClass', 'current');
});

    it('#init', function() {
        'use strict';
        should.exist(navigationTest.init);    
        should.exist(navigationTest.fetchHistoryURL);
        should.exist(navigationTest.setCurrentClass);
        should.exist(navigationTest.switchClass);
    });
});
