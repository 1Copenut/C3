/* global window, require, should */
var should = require('chai').should();

/**
 *
 * @class Historical Test
 * @constructor
 */

describe('Historical module', function() {
    var Historical, historicalTest;

    before(function(done) {
        'use strict';
        Historical = require('../../../app/scripts/src/historical');
        historicalTest = new Historical('#navigation li', '#navigation a');
        done()
    });
    
    describe('#constructor', function() {
        it('Should create an instance of the Historical object', function() {
            'use strict';
            historicalTest.should.be.an.instanceof(Historical);
            historicalTest.should.have.property('list', '#navigation li');
            historicalTest.should.have.property('links', '#navigation a');
        });
    });

    describe('#init', function() {
        it('Should respond to the History API initialization methods', function() {
            historicalTest.should.respondTo('init');
            historicalTest.should.respondTo('historyEvent');
            historicalTest.should.respondTo('popEvent');
            historicalTest.should.respondTo('windowPopState');
        });

        it('Should check browser understands the HTML5 History API', function() {
            historicalTest.init().should.be.true;
        });

        it('Should invoke the History API initialization methods', function() {
            historicalTest.init().should.respondTo('historyEvent');
        });
    });
});


