/**
 *
 * @class Historical Test
 * @constructor
 * /

/* global window, require, should */
var should = require('chai').should();

/**
 * Test the Historical module that is plugging into the History
 * API to take advantage of HTML5 pushState behavior
 *
 * @param {String} list Array of list items to become a jQuery object
 * @param {String} links Array of links to apply Historical behavior
 * @return {Boolean} Returns true on passing test
 */
describe('Historical module', function() {
    var Historical, historicalTest;

    before(function(done) {
        'use strict';
        Historical = require('../../../app/scripts/src/historical');
        historicalTest = new Historical('#navigation li', '#navigation a');
        done()
    });
    
    it('#constructor', function() {
        'use strict';
        historicalTest.should.be.an.instanceof(Historical);
        historicalTest.should.have.property('list', '#navigation li');
        historicalTest.should.have.property('links', '#navigation a');
    });
});


