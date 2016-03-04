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

  describe('#Fixture Defaults', function() {
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
  });

  describe('#Constructor()', function() {
    let tabPanel;

    beforeEach(function() {
      tabPanel = new TabPanel('tabpanel1', false);
      tabPanel.init();
    });

    it('Tab panel should be an object', function(done) {
      tabPanel.should.be.an('object');

      done();
    });

    it('Tab panel should have 2 properties, ID and accordian', function(done) {
      tabPanel.should.have.property('id');
      tabPanel.should.have.property('accordian');

      done();
    });

    it('Tab panel properties should be correct type', function(done) {
      tabPanel.id.should.be.a('string');
      tabPanel.accordian.should.be.a('boolean');

      done();
    });
  });

  describe('#Init()', function() {
    let tabPanel;

    beforeEach(function() {
      tabPanel = new TabPanel('tabpanel1', false);
      tabPanel.init();
    });

    it('Tab panels should have attribute aria-hidden', function(done) {
        let $tabPanels = $(this.result).find('.panel');

        $tabPanels.each(function(i) {
          var $this = $(this);
          $this.attr('aria-hidden').should.exist;
        });

        done();
      });

    it('All panels should be hidden except first one', function(done) {
      let $tabPanels = $(this.result).find('.panel').not('#panel1');

      $tabPanels.each(function(i) {
        var $this = $(this);
        $this.is(':hidden').should.equal(true);
      });

      done();
    });

    it('First tab should have class "selected"', function(done) {
      let tabs = tabPanel.$tabs;

      tabs[0].getAttribute('class').should.equal('tab selected');

      done();
    });
    
    it('First tab panel should be visible', function(done) {
      let $firstPanel = $(this.result).find('#panel1');

      $firstPanel.is(':visible').should.equal(true);

      done();
    });

    it('First tab panel aria-hidden should be "false"', function(done) {
      let $firstPanel = $(this.result).find('#panel1');

      $firstPanel.attr('aria-hidden').should.equal('false');

      done();
    });
  });

  describe('#SwitchTabs()', function() {
    let tabPanel;
    let $curTab;
    let $newTab;
    let $curPanel;
    let $newPanel;

    beforeEach(function() {
      tabPanel = new TabPanel('tabpanel1', false);
      $curTab = $(this.result).find('#tab1');
      $newTab = $(this.result).find('#tab2');
      $curPanel = $(this.result).find('#panel1');
      $newPanel = $(this.result).find('#panel2');

      tabPanel.switchTabs($curTab, $newTab);
    });

    it('Selected class should be updated dynamically', function(done) {
      $curTab[0].getAttribute('class').should.equal('tab');
      $newTab[0].getAttribute('class').should.equal('tab selected');

      done();
    });

    it('Tabs\' aria-selected should be updated dynamically', function(done) {
      $curTab[0].getAttribute('aria-selected').should.equal('false');
      $newTab[0].getAttribute('aria-selected').should.equal('true');
      
      done();
    });

    it('Panels\' aria-hidden should be updated dynamically', function(done) {
      $curPanel[0].getAttribute('aria-hidden').should.equal('true');
      $newPanel[0].getAttribute('aria-hidden').should.equal('false');
      
      done();
    });

    it('Shown panel should be updated dynamically', function(done) {
      $curPanel.is(':hidden').should.equal(true);
      $newPanel.is(':visible').should.equal(true);

      done();
    });

    it('Tabindex should be updated dynamically', function(done) {
      $curTab[0].getAttribute('tabindex').should.equal('-1');
      $newTab[0].getAttribute('tabindex').should.equal('0');

      done();
    });
  });

  describe('#TabKeyDown()', function() {
    let tabPanel;
    let $curTab;
    let $lastTab;

    beforeEach(function() {
      tabPanel = new TabPanel('tabpanel1', false);
      $curTab = $(this.result).find('#tab1');
      $lastTab = $(this.result).find('#tab3');

      tabPanel.init();
      tabPanel.bindHandlers();
    });

    it('Last tab should be selected on left arrow keydown', function(done) {
      let e = $.Event('keypress');
      e.which = 37; // Left arrow key
      $curTab.trigger(e);

      console.log(e);

      done();
    });
  });

  describe('#Accessibility', function() {
    it('Tab panel should have 0 accessibility errors', function(done) {
      let tabPanel = new TabPanel('tabpanel1', false);
      let tabNav = document.querySelector('div.tabs__container');
      tabPanel.init();

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

