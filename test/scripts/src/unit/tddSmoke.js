/* global require, should */
'use strict';
var should = require('chai').should(),
    util = require('../utilities/utilTest.js'),
    $ = require('jquery');

describe('Navigation block with fixtures', function() {
    before(function() {
        fixture.setBase('test/fixtures');
    });

    beforeEach(function() {
        this.result = fixture.load('tmpl__navigation.html');
        util.render('#fixtures', this.result);
    });

    afterEach(function() {
        fixture.cleanup();
    });
    
    describe('#Nav menu', function() {
        it('Should have a length of 3', function() {
            var navNodes = $(this.result).find('.load-content li'),
                navLength = navNodes.length;

            console.log(navNodes);
            navLength.should.equal(3);
        });
    });
});

