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
        Historical = require('../../../../app/scripts/src/historical');
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
        it('Should contain the History API initialization methods', function() {
            historicalTest.should.have.property('init');
            historicalTest.should.have.property('historyEvent');
            historicalTest.should.have.property('popEvent');
            historicalTest.should.have.property('windowPopState');
        });

        it('Should invoke the History API initialization methods', function() {
            historicalTest.should.respondTo('historyEvent');
        });
        
        it('Should verify browser understands the HTML5 History API', function() {
            var initLogic = function(bool1, bool2) {
                if (bool1 !== true || bool2 !== true) {
                    return false;
                } else {
                    return true;
                }
            }
            
            initLogic(true, true).should.be.true;
            initLogic(false, true).should.be.false;
            initLogic(true,false).should.be.false;
            initLogic(false,false).should.be.false;
        });
    });
});


