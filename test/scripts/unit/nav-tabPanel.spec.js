'use strict';

// Assertion library
import chai from 'chai';

// Hand-rolled utilities
import { render } from '../utilities/loadFixture.js';

// jQuery and keyboard function libs
import '../lib/bililiteRange.js';
import $ from 'jquery';
import '../lib/jquery.simulate.js';
import '../lib/jquery.simulate.ext.js';
import '../lib/jquery.simulate.key-combo.js';

// Class under test
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

    it('Tab panel should be an object', function(done) {
      tabPanel = new TabPanel('tabpanel1', false);
      tabPanel.should.be.an('object');

      done();
    });

    it('Tab panel should have 2 properties, ID and accordian', function(done) {
      tabPanel = new TabPanel('tabpanel1', false);
      tabPanel.should.have.property('id');
      tabPanel.should.have.property('accordian');

      done();
    });

    it('Tab panel properties should be correct type', function(done) {
      tabPanel = new TabPanel('tabpanel1', false);
      tabPanel.id.should.be.a('string');
      tabPanel.accordian.should.be.a('boolean');

      done();
    });
  });

  describe('#Init()', function() {
    let tabPanel;

    beforeEach(function() {
      tabPanel = new TabPanel('tabpanel1', false);
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
      $newTab[0].getAttribute('class').should.equal('tab selected focus');

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

  describe('#HandleTabKeyDown()', function() {
    let tabPanel;
    let $curTab;
    let $secondTab;
    let $lastTab;

    beforeEach(function() {
      tabPanel = new TabPanel('tabpanel1', false);
      $curTab = $(this.result).find('#tab1');
      $secondTab = $(this.result).find('#tab2');
      $lastTab = $(this.result).find('#tab3');
    });

    it('First tab should be selected on home keydown', function(done) {
      tabPanel.handleTabKeyDown($curTab, $curTab.simulate('keydown', { keyCode: 39 }));
      tabPanel.handleTabKeyDown($curTab, $curTab.simulate('keydown', { keyCode: 36 }));

      $curTab[0].getAttribute('class').should.equal('tab selected focus');
      $curTab[0].getAttribute('tabindex').should.equal('0');
      $curTab[0].getAttribute('aria-selected').should.equal('true');

      done();
    });

    it('Second tab should be selected on right arrow keydown', function(done) {
      tabPanel.handleTabKeyDown($curTab, $curTab.simulate('keydown', { keyCode: 39 }));

      $secondTab[0].getAttribute('class').should.equal('tab selected focus');
      $secondTab[0].getAttribute('tabindex').should.equal('0');
      $secondTab[0].getAttribute('aria-selected').should.equal('true');

      done();
    });

    it('Second tab should be selected on down arrow keydown', function(done) {
      tabPanel.handleTabKeyDown($curTab, $curTab.simulate('keydown', { keyCode: 40 }));

      $secondTab[0].getAttribute('class').should.equal('tab selected focus');
      $secondTab[0].getAttribute('tabindex').should.equal('0');
      $secondTab[0].getAttribute('aria-selected').should.equal('true');

      done();
    });
    
    it('Last tab should be selected on left arrow keydown', function(done) {
      tabPanel.handleTabKeyDown($curTab, $curTab.simulate('keydown', { keyCode: 37 }));

      $lastTab[0].getAttribute('class').should.equal('tab selected focus');
      $lastTab[0].getAttribute('tabindex').should.equal('0');
      $lastTab[0].getAttribute('aria-selected').should.equal('true');

      done();
    });

    it('Last tab should be selected on up arrow keydown', function(done) {
      tabPanel.handleTabKeyDown($curTab, $curTab.simulate('keydown', { keyCode: 38 }));

      $lastTab[0].getAttribute('class').should.equal('tab selected focus');
      $lastTab[0].getAttribute('tabindex').should.equal('0');
      $lastTab[0].getAttribute('aria-selected').should.equal('true');

      done();
    });
    
    it('Last tab should be selected on end keydown', function(done) {
      tabPanel.handleTabKeyDown($curTab, $curTab.simulate('keydown', { keyCode: 35 }));

      $lastTab[0].getAttribute('class').should.equal('tab selected focus');
      $lastTab[0].getAttribute('tabindex').should.equal('0');
      $lastTab[0].getAttribute('aria-selected').should.equal('true');

      done();
    });
  });

  describe('#HandleTabKeyPress()', function() {
    let tabPanel;
    let $curTab;

    beforeEach(function() {
      tabPanel = new TabPanel('tabpanel1', false);
      $curTab = $(this.result).find('#tab1');
    });

    it('First tab should remain selected on keypress', function(done) {
      tabPanel.handleTabKeyPress($curTab, $curTab.simulate('keypress', { keyCode: 13 }));

      $curTab[0].getAttribute('class').should.equal('tab selected');
      $curTab[0].getAttribute('tabindex').should.equal('0');
      $curTab[0].getAttribute('aria-selected').should.equal('true');

      done();
    });
  });

  describe('#HandleTabClick()', function() {
    let tabPanel;
    let $curTab;
    let $secondTab;
    let secondTabDOM;

    beforeEach(function() {
      tabPanel = new TabPanel('tabpanel1', false);
      $curTab = $(this.result).find('#tab1');
      $secondTab = $(this.result).find('#tab2');
    });

    it('Class, tabindex, and aria-selected should be updated on tab click', function(done) {
      tabPanel.handleTabClick($secondTab, $secondTab.simulate('click', { keyCode: 13 }));

      $curTab[0].getAttribute('class').should.equal('tab');
      $curTab[0].getAttribute('tabindex').should.equal('-1');
      $curTab[0].getAttribute('aria-selected').should.equal('false');
      $secondTab[0].getAttribute('class').should.contain('selected');
      $secondTab[0].getAttribute('tabindex').should.equal('0');
      $secondTab[0].getAttribute('aria-selected').should.equal('true');

      done();
    });
  });
  
  describe('#HandlePanelKeyDown()', function() {
    let tabPanel;
    let $curTab;
    let $curPanel;
    let $curElem;

    beforeEach(function() {
      tabPanel = new TabPanel('tabpanel1', false);
      $curTab = $(this.result).find('#tab1');
      $curPanel = $(this.result).find('#panel1');
      $curElem = $(this.result).find('#p1_opt1');
    });

    it('Ctrl+left should change focus to tab from panel element', function(done) {
      $curTab[0].getAttribute('class').should.equal('tab selected');

      $curElem.simulate('click', { keyCode: 13 });
      tabPanel.handlePanelKeyDown($curElem, $curElem.simulate('key-combo', { combo: 'ctrl+left-arrow' }));

      $curTab[0].getAttribute('class').should.contain('tab selected');

      done();
    });

    it('Ctrl+up should change focus to tab from panel element', function(done) {
      $curTab[0].getAttribute('class').should.equal('tab selected');

      $curElem.simulate('click', { keyCode: 13 });
      tabPanel.handlePanelKeyDown($curElem, $curElem.simulate('key-combo', { combo: 'ctrl+up-arrow' }));

      $curTab[0].getAttribute('class').should.contain('tab selected');

      done();
    });

    it('Esc should not change focus to tab from panel element', function(done) {
      $curTab[0].getAttribute('class').should.equal('tab selected');

      $curElem.simulate('keyDown', { keyCode: 27 });

      $curTab[0].getAttribute('class').should.equal('tab selected');

      done();
    });
  });

  describe('#HandlePanelKeyPress()', function() {
    let tabPanel;
    let $curTab;
    let $curPanel;
    let $curElem;

    beforeEach(function() {
      tabPanel = new TabPanel('tabpanel1', false);
      $curTab = $(this.result).find('#tab1');
      $curPanel = $(this.result).find('#panel1');
      $curElem = $(this.result).find('#p1_opt1');
    });

    it('Esc should not change focus to tab from panel element', function(done) {
      $curTab[0].getAttribute('class').should.equal('tab selected');

      $curElem.simulate('keyPress', { keyCode: 27 });

      $curTab[0].getAttribute('class').should.equal('tab selected');

      done();
    });
  });

  describe('#Accessibility', function() {
    it('Tab panel should have 0 accessibility errors', function(done) {
      let tabPanel = new TabPanel('tabpanel1', false);
      let tabNav = document.querySelector('div.tabs-container');

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

