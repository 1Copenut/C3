/**
 * tabPanel is a constructor function for an ARIA-enabled tabpanel.
 * Code provided and modified from Open Ajax Alliance:
 * http://oaa-accessibility.org/example/34/
 *
 * Accessibility requirements:
 * Section 508
 * WCAG 2.0 Level AA 
 *
 * @requires utilities/keyCodes
 *
 * @main main
 * 
 * Usage: Requires a div container and children as follow:
 * 1. tabs/accordian headers have class 'tab'
 * 2. panels are divs with class 'panel'
 */

import KeyCodes from '../utilities/keyCodes';
import $ from 'jquery';

/**
 * @class TabPanel
 * @constructor
 * @param id {String} id of the div containing tabPanel
 * @param {Boolean} true if TabPanel should operate as accordian
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
    this.keys = new KeyCodes();

    // Bind event handlers
    // this.bindHandlers();

    // Initialize the tab panel
    // this.init();
  }

  /**
   * @method init
   * Initiates tabs, sets base class on first
   */
  init() {
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
   * @param $curTab {String} The current, selected tab
   * @param $newTab {String} The tab to show
   *
   * @param id {String} id of the div containing tabPanel
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
}

export default TabPanel;
