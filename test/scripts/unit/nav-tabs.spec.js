'use strict';

import * as chai from 'chai';
import { render } from '../utilities/utils-unit.js';
import $ from 'jquery';

const should = chai.should();

describe('Navigation--Tabs and Panels', function() {

  before(function() {
    fixture.setBase('test/fixtures');
  });

  beforeEach(function() {
    this.result = fixture.load('tmpl__navigation--tabs.html');
    render('#fixtures', this.result);
  });

  afterEach(function() {
    fixture.cleanup();
  });

  it('Tablist jQuery object should have a length of 3', function(done) {
    let tablist = $(this.result).find('.tablist li');

    tablist.length.should.equal(3);
    done();
  });

  it('Tabpanel jQuery object should have a length of 3', function(done) {
    let tabpanels = $(this.result).find('.panel');

    tabpanels.length.should.equal(3);
    done();
  });

  it('Tab container should have 0 accessibility errors', function(done) {
    let tabNav = document.querySelector('div.tabs__container');

    axe.a11yCheck(tabNav, function(results) {
      if (results.violations.length > 0) {
        console.log(results.violations);
      }

      results.violations.length.should.equal(0);
      done();
    });
  }); 
});

