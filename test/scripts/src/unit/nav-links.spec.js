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

  it('Should have a length of 3', function() {
    let navNodes = $(this.result).find('.load-content li');
    let navLength = navNodes.length;

    navLength.should.equal(3);
  });
});

