'use strict';

import * as chai from 'chai';
import { render } from '../utilities/utils-unit.js';
import $ from 'jquery';

const should = chai.should();

describe('Navigation--Unordered List Links', function() {

  before(function() {
    fixture.setBase('test/fixtures');
  });

  beforeEach(function() {
    this.result = fixture.load('tmpl__navigation.html');
    render('#fixtures', this.result);
  });

  afterEach(function() {
    fixture.cleanup();
  });

  describe('#DOM Interaction', function() {
    it('Navigation list jQuery object should have a length of 3', function(done) {
      let navNodes = $(this.result).find('.load-content li');

      navNodes.should.have.length(3);
      done();
    });
  });

  describe('#Accessibility', function() {
    it('Navigation list should have 0 accessibility errors', function(done) {
      let navList = document.getElementById('wrapper');

      axe.a11yCheck(navList, function(results) {
        if (results.violations.length > 0) {
          console.log(results.violations);
        }

        results.violations.length.should.equal(0);
        done();  
      });
    });
  });
});

