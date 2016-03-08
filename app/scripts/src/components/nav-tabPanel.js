/**
 * tabPanel is a constructor function for an ARIA-enabled tabpanel.
 * Code provided and modified from Open Ajax Alliance:
 * http://oaa-accessibility.org/example/34/
 *
 * Accessibility requirements:
 * Section 508
 * WCAG 2.0 Level AA 
 *
 * @main main
 * 
 * Usage: Requires a div container and children as follow:
 * 1. tabs/accordian headers have class 'tab'
 * 2. panels are divs with class 'panel'
 */

import KeyCode from '../utilities/keyCodes';
import $ from 'jquery';
import '../lib/focusable.jquery.js';

/**
 * @class TabPanel
 * @constructor
 * @param id {String} id of the div containing tabPanel
 * @param {Boolean} true if TabPanel should operate as accordian
 * @requires utilities/keyCodes
 */
class TabPanel {
  constructor(id, accordian) {
    this.id = id;
    this.accordian = accordian;

    /**
     * @property $panel 
     * @type Object|jQuery 
     */
    this.$panel = $('#' + id);

    /**
     * @property $tabs
     * @type Object|jQuery
     *
     * Array of tabs
     */
    this.$tabs = this.$panel.find('.tab');

    /**
     * @property $panels
     * @type Object|jQuery
     *
     * Array of panels
     */
    this.$panels = this.$panel.children('.panel');

    /**
     * @property keys
     * @type Object
     */
    this.keys = new KeyCode();
    
    // Initiate the instance
    this.init();

    // Bind listeners for keyboard and mouse events
    this.bindHandlers();
  }

  /**
   * @method init
   *
   */
  init() { // Initiates tabs, sets base class on first
    /**
     * @property $tab
     * @type Object|jQuery
     *
     * The selected tab, if one has been assigned
     */
    let $tab;

    // Add ARIA attributes to the panels 
    this.$panels.attr('aria-hidden', 'true');

    // Hide all tab panels
    this.$panels.hide();
    
    if($tab == undefined) {
      $tab = this.$tabs.first();
      $tab.addClass('selected');
    }

    // Get the selected tab 
    $tab = this.$tabs.filter('.selected');


    // Show the first panel, and swap aria-hidden
    this.$panel.find('#' + $tab.attr('aria-controls'))
      .show()
      .attr('aria-hidden', 'false');
  }

  /**
   * @method switchTabs 
   * @param $curTab {String} jQuery object for current, selected tab
   * @param $newTab {String} jQuery object for the tab to show
   *
   * Give focus to a new tabPanel or accordian header. If a
   * tabPanel, switchTabs hides the current panel and shows
   * the selected one. 
   */
  switchTabs($curTab, $newTab) {
    // Remove highlight from current tab
    // TODO: Add class focus to this function when needed
    $curTab.removeClass('selected');

    // Remove tab from teh tab order and update aria-selected
    $curTab.attr('tabindex', '-1')
      .attr('aria-selected', 'false');

    // Highlight the new tab and update aria-selected
    $newTab.addClass('selected')
      .attr('aria-selected', 'true');

    // If this is a tab panel, swap displayed tabs
    if (this.accordian === false) {
      // Hide the current tab panel and set aria-hidden to true
      this.$panel.find('#' + $curTab.attr('aria-controls'))
        .hide()
        .attr('aria-hidden', 'true');

      // Show the new tab panel and set aria-hidden to false
      this.$panel.find('#' + $newTab.attr('aria-controls'))
        .show()
        .attr('aria-hidden', 'false');
    }

    // Make new tab navigable
    $newTab.attr('tabindex', '0');

    // Give the new tab focus
    $newTab.focus();
  }
  
  // TODO: Add method togglePanel for accordian 

  /**
   * @method bindHandlers 
   *
   */
  bindHandlers() { // Bind event handlers for tabs and panels
    /**
     * @property thisObj 
     * @type Object
     *
     * Store this pointer for reference 
     */
    let thisObj = this;

    /*
     * Bind handlers for the tabs
     *
     * The bindHandlers method gathers four separate handlers:
     * keydown()
     * keypress()
     * click()
     * focus()
     * blur()
     */

    // Bind a tab keydown handler
    this.$tabs.keydown(function(e) {
      return thisObj.handleTabKeyDown($(this), e);
    });

    // Bind a tab keypress handler
    this.$tabs.keypress(function(e) {
      return thisObj.handleTabKeyPress($(this), e);
    });

    // Bind a tab click handler
    this.$tabs.click(function(e) {
      return thisObj.handleTabClick($(this), e);
    });

    // Bind a tab focus handler
    this.$tabs.focus(function(e) {
      return thisObj.handleTabFocus($(this), e);
    });

    // Bind a tab blur handler
    this.$tabs.blur(function(e) {
      return thisObj.handleTabBlur($(this), e);
    });

    // Bind a panel keydown handler
    this.$panels.keydown(function(e) {
      return thisObj.handlePanelKeyDown($(this), e);
    });

    // Bind a panel keypress handler
    this.$panels.keypress(function(e) {
      return thisObj.handlePanelKeyPress($(this), e);
    });
  }

  /**
   * @method handleTabKeyDown 
   * @param $tab {Object} jQuery object for tab being processed
   * @param e {Object} Associated event object
   *
   * Process keydown events for a tab
   */
  handleTabKeyDown($tab, e) {
    if (e.altKey) {
      // Do nothing
      return true;
    }

    switch (e.keyCode) {
      case this.keys.enter:
      case this.keys.space: {
        // Only process this if it is an accordian widget
        if (this.accordian === true) {
          // Display or collapse the panel
          this.togglePanel($tab);

          e.stopPropagation();
          return false;
        }

        return true;
      }

      case this.keys.left:
      case this.keys.up: {
        // let thisObj = this;
        // let $prevTab; // Holds jQuery object of tab from previous pass
        let $newTab; // Holds jQuery object of new tab

        if (e.ctrlKey) {
          // Ctrl + arrow moves focus from panel content to teh open
          // tab/accordian header
        } else {
          let curNdx = this.$tabs.index($tab);

          if (curNdx === 0) {
            // Tab is the first one
            // Set newTab to last tab
            $newTab = this.$tabs.last();
          } else {
            // Set newTab to previous
            $newTab = this.$tabs.eq(curNdx - 1);
          }

          // Switch to the new tab
          this.switchTabs($tab, $newTab);
        }

        e.stopPropagation();
        return false;
      }

      case this.keys.right:
      case this.keys.down: {
        // let thisObj = this;
        // let foundTab = false; // Set to true when current tab found
        let $newTab; // The new tab to switch to
        let curNdx = this.$tabs.index($tab);

        if (curNdx === this.$tabs.length - 1) {
          // Tab is the last one
          // Set newTab to first tab
          $newTab = this.$tabs.first();
        } else {
          // Set new tab to next tab
          $newTab = this.$tabs.eq(curNdx + 1);
        }

        // Switch to the new tab
        this.switchTabs($tab, $newTab);

        e.stopPropagation();
        return false;
      }

      case this.keys.home: {
        // Switch to the first tab
        this.switchTabs($tab, this.$tabs.first());

        e.stopPropagation();
        return false;
      }

      case this.keys.end: {
        // Switch to the last tab
        this.switchTabs($tab, this.$tabs.last());

        e.stopPropagation();
        return false;
      }
    }
  }

  /**
   * @method handleTabKeyPress 
   * @param $tab {Object} jQuery object for tab being processed
   * @param e {Object} Associated event object
   * @return {Boolean} Returns true if propagating, false if consuming event
   *
   * Process keypress events for a tab
   */
  handleTabKeyPress($tab, e) {
    if (e.altKey) {
      // Do nothing
      return true;
    }

    switch (e.keyCode) {
      case this.keys.enter:
      case this.keys.space:
      case this.keys.left:
      case this.keys.up:
      case this.keys.right:
      case this.keys.down:
      case this.keys.home:
      case this.keys.end: {
        e.stopPropagation();
        return false;
      }

      case this.keys.pageup:
      case this.keys.pagedown: {
        // The tab kepress handler must consume pageup andpagedown
        // keypresses to prevent Firefox from switching tabs on
        // ctrl+pageup and ctrl+pagedown
        if (!e.ctrlKey) {
          return true;
        }

        e.stopPropagation();
        return false;
      }
    }

    return true;
  }

  /**
   * @method handleTabClick 
   * @param $tab {Object} jQuery object for tab being processed
   * @return {Boolean} returns true
   *
   * Process click events for a tab
   */
  handleTabClick($tab) {
    // Remove the highlighting from all tabs
    this.$tabs.removeClass('selected');

    // Remove all tabs from the tab order and reset aria-selected attribute
    this.$tabs.attr('tabindex', '-1').attr('aria-selected', 'false');

    // Hide all tab panels
    this.$panels.hide();

    // Highlight the clicked tab and update aria-selected attribute
    $tab.addClass('selected').attr('aria-selected', 'true');

    // Show the clicked tab panel
    this.$panel.find('#' + $tab.attr('aria-controls')).show();

    // Make clicked tab navigable
    $tab.attr('tabindex', '0');

    // Give clicked tab focus
    $tab.focus();

    return true;
  }

  /**
   * @method handleTabFocus 
   * @param $tab {Object} jQuery object for tab being processed
   * @return {Boolean} returns true
   *
   * Process focus events for a tab
   */
  handleTabFocus($tab) {
    // Add the focus class to the tab
    $tab.addClass('focus');

    return true;
  }

  /**
   * @method handleTabBlur 
   * @param $tab {Object} jQuery object for tab being processed
   * @return {Boolean} returns true
   *
   * Process blur events for a tab
   */
  handleTabBlur($tab) {
    // Remove the focus class from the tab
    $tab.removeClass('focus');

    return true;
  }

  /**
   * @method handlePanelKeyDown
   * @param $elem {Object} jQuery object for element being processed
   * @param e {Object} e is the associated event object 
   * @return {Boolean} returns true if propagating, false if consuming event
   *
   * Process keydown events for a panel 
   */
  handlePanelKeyDown($elem, e) {
    if (e.altKey) {
      // Do nothing
      return true;
    }

    switch (e.keyCode) {
      case this.keys.esc: {
        e.stopPropagation();
        return false;
      }

      case this.keys.left:
      case this.keys.up: {
        if (!e.ctrlKey) {
          // Do not process
          return true;
        }

        // Get the jQuery object of the tab
        var $tab = $('#' + $elem.attr('aria-labelledby'));

        // Move focus to the tab
        $tab.focus();

        e.stopPropagation();
        return false;
      }

      case this.keys.pageup: {
        let $newTab;

        if (!e.ctrlKey) {
          // Do not process
          return true;
        }

        // Get the jQuery object of the tab
        let curNdx = this.$tabs.index($tab);

        if (curNdx === 0) {
          // This is the first tab, set focus on the last one
          $newTab = this.$tabs.last();
        } else {
          // Set focus on the previous tab
          $newTab = this.$tabs.eq(curNdx - 1);
        }

        // Switch to the new tab
        this.switchTabs($tab, $newTab);

        e.stopPropagation();
        e.preventDefault();
        return false;
      }

      case this.keys.pagedown: {
        let $newTab;

        if (!e.ctrlKey) {
          // Do not process
          return true;
        }

        // Get the jQuery object of the tab
        let $tab = $('#' + $elem.attr('aria-labelledby'));

        // Get the index of the tab in the tab list
        let curNdx = this.$tabs.index($tab);

        if (curNdx === this.$tabs.length - 1) {
          // This is the last tab, set focus on the first one
          $newTab = this.$tabs.first();
        } else {
          // Set focus on the next tab
          $newTab = this.$tabs.eq(curNdx + 1);
        }

        // Switch to the new tab
        this.switchTabs($tab, $newTab);

        e.stopPropagation();
        e.preventDefault();
        return false;
      }
    }

    return true;
  }

  /**
   * @method handlePanelKeyPress
   * @param $elem {Object} jQuery object for element being processed
   * @param e {Object} e is the associated event object 
   * @return {Boolean} returns true if propagating, false if consuming event
   *
   * Process keypress events for a panel 
   */
  handlePanelKeyPress($elem, e) {
    if (!e.altKey) {
      // Do not process
      return true;
    }

    if (e.ctrlKey && (e.keyCode == this.keys.pageup || e.keyCode == this.keys.pagedown)) {
      e.stopPropagation();
      e.preventDefault();
      return false;
    }

    switch (e.keyCode) {
      case this.keys.esc: {
        e.stopPropagation();
        e.preventDefault();
        return false;
      }
    }

    return true;
  }
}

export default TabPanel;
