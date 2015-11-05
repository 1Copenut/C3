/* global require, should */
var should = require('chai').should(),
    $ = require('jquery');

/* Use BEM for naming fixtures */
var navMenu = {
    template:
        '<ul class="load-content">'
        + '<li><a href="about.html">About</a></li>'
        + '<li><a href="services.html">Services</a></li>'
        + '<li><a href="contact.html">Contact</a></li>'
        + '</ul>',

    render: function(el) {
            $(el).empty().prepend(this.template);
    }
};

describe('Navigation block with fixtures', function() {
    var Historical, historicalTest;

    before(function() {
        'use strict';
        this.$fixture = $('<nav id="navigation" role="navigation"></nav>');
    });

    beforeEach(function() {
        'use strict';

        this.$fixture
            .empty()
            .prepend($('#fixtures'));

        navMenu.render(this.$fixture);
    });

    afterEach(function() {
        'use strict';
        $('#fixtures').empty();
    });
    
    describe('#Nav menu', function() {
        it('Should have a length of 3', function() {
            'use strict';

            var navNodes = this.$fixture.find('.load-content li'),
                navLength = navNodes.length;

            navLength.should.equal(3);
        });
    });
});


