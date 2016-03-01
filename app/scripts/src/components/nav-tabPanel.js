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
    this.init();
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

    /* Add ARIA attributes to the panels */
    this.$panels.attr('aria-hidden', 'true');

    /* Hide all tab panels */
    this.$panels.hide();
    
    /* Get the selected tab */
    $tab = this.$tabs.filter('.selected');

    if($tab === undefined) {
      $tab = this.$tabs.first();
      $tab.addClass('selected');
    }

    /* Show the first panel, and swap aria-hidden */
    this.$panel.find('#' + $tab.attr('aria-controls'))
      .show()
      .attr('aria-hidden', 'false');
  }
}

export default TabPanel;
