'use strict';

import $ from 'jquery';
import chai from 'chai';
import { render } from '../utilities/loadFixture.js';
import TabPanel from '../../../app/scripts/src/components/nav-tabPanel';

const should = chai.should();

describe('Navigation--Accessible Tab Panel', function() {

  before(function() {
    fixture.setBase('test/fixtures');
  });

  beforeEach(function() {
    this.result = fixture.load('tmpl__navigation--tabPanel.html');
    render('#fixtures', this.result);
  });

  afterEach(function() {
    fixture.cleanup();
  });

  describe('#Constructor', function() {
    it('Tab panel should be an object', function(done) {
      let tabPanel = new TabPanel();

      tabPanel.should.be.an('object');

      done();
    });

    it('Tab panel should have 2 properties, ID and accordian', function(done) {
      let tabPanel = new TabPanel('test-id', true);

      tabPanel.should.have.property('id');
      tabPanel.should.have.property('accordian');

      done();
    });

    it('Tab panel properties should be correct type', function(done) {
      let tabPanel = new TabPanel('test-id', false);

      tabPanel.id.should.be.a('string');
      tabPanel.accordian.should.be.a('boolean');

      done();
    });
  });
  
  describe('#DOM Interaction', function() {
    it('Tab list jQuery object should have a length of 3', function(done) {
      let $tabList = $(this.result).find('.tablist li');

      $tabList.should.have.length(3);

      done();
    });

    it('Tab panel jQuery object should have a length of 3', function(done) {
      let $tabPanels = $(this.result).find('.panel');

      $tabPanels.should.have.length(3);

      done();
    });

    it('Tab panels should have attribute aria-hidden', function(done) {
      let tabPanel = new TabPanel('tabpanel1', false);
      let $tabPanels = $(this.result).find('.panel');

      $tabPanels.each(function(i) {
        var $this = $(this);

        $this.attr('aria-hidden').should.exist;
      });

      done();
    });

    it('All panels should be hidden except first one', function(done) {
      let tabPanel = new TabPanel('tabpanel1', false);
      let $tabPanels = $(this.result).find('.panel').not('#panel1');

      $tabPanels.each(function(i) {
        var $this = $(this);

        $this.is(':hidden').should.equal(true);
      });

      done();
    });

    it('First tab should have class "selected"', function(done) {
      let tabPanel = new TabPanel('tabpanel1', false);
      let $tabs = tabPanel.$tabs;

      $tabs[0].getAttribute('class').should.equal('tab selected');

      done();
    });

    it('First tab panel should be visible', function(done) {
      let tabPanel = new TabPanel('tabpanel1', false);
      let $firstPanel = $(this.result).find('#panel1');

      $firstPanel.is(':visible').should.equal(true);

      done();
    });
  });

  describe('#Accessibility', function() {
    it('Tab panel should have 0 accessibility errors', function(done) {
      let tabPanel = new TabPanel('tabpanel1', false);
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
});

