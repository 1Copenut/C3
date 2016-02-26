/**
 * This is a component module for a fully accessible tabpanel.
 *
 * Accessibility requirements:
 * Section 508
 * WCAG 2.0 Level AA 
 *
 * @module components/tab-panel 
 * @requires utilities/key-codes
 * @main main
 */

// import KeyCodes from '../utilities/key-codes';

// var keycode = new KeyCodes();

class TabPanel {
  constructor(id, accordian) {
    this.id = id;
    this.accordian = accordian;
  }
}

export default TabPanel;
