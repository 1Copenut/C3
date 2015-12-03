/* global require, should */
'use strict';

var should = require('chai').should(),
    $ = require('jquery');

function render(el, fixture) {
    $(el).empty().prepend(fixture);
};

describe('Navigation block with fixtures', function() {
    before(function() {
        fixture.setBase('test/fixtures');
    });

    beforeEach(function() {
        'use strict';
        this.result = fixture.load('tmpl__navigation.html');
        render('#fixtures', this.result);
    });

    afterEach(function() {
        fixture.cleanup();
    });
    
    describe('#Nav menu', function() {
        it('Should have a length of 3', function() {
            var navNodes = $(this.result).find('.load-content li'),
                navLength = navNodes.length;

            navLength.should.equal(3);
        });
    });
});
