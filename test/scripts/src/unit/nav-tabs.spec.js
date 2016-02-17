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

  it('Tablist object should have a length of 3', function() {
    let tablist = $(this.result).find('.tablist li');

    tablist.length.should.equal(3);
  });

  it('Tabpanel object should have a length of 3', function() {
    let tabpanels = $(this.result).find('.panel');

    tabpanels.length.should.equal(3);
  });

  it('Should have zero accessibility errors', function() {
    let tabNav = $('div.tab-container');

    axe.a11yCheck(tabNav, null, function(results) {
      results.violations.length.should.equal(0);
      done();
    });
  }); 
});

