/* global require, should */
var should = require('chai').should(),
    $ = require('jquery');

describe('Navigation block with fixtures', function() {
    before(function() {
        'use strict';
        fixture.setBase('test/fixtures');
    });

    beforeEach(function() {
        'use strict';
        this.result = fixture.load('tmpl__navigation.html');
    });

    afterEach(function() {
        'use strict';
        fixture.cleanup();
    });
    
    describe('#Nav menu', function() {
        it('Should have a length of 3', function() {
            'use strict';

            var navNodes = $(this.result).find('.load-content li'),
                navLength = navNodes.length;

            navLength.should.equal(3);
        });
    });
});
