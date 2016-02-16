import * as chai from 'chai';
import util from '../utilities/utilTest.js';
import $ from 'jquery';

let should = chai.should();

describe('Navigation block with fixtures', function() {
  'use strict';

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

  it('Should have a length of 3', function() {
      var navNodes = $(this.result).find('.load-content li'),
          navLength = navNodes.length;

      console.log(navNodes);
      navLength.should.equal(3);
  });
});

