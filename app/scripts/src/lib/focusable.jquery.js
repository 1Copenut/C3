/* Focusable is a small jQuery extension to add a :focusable selector.
 * It is used to get a list of all focusable elements in a panel.
 * 
 * Credit to ajpiano on the jQuery forums.
 */

import $ from 'jquery';

$.extend($.expr[':'], {
  focusable: function(element) {
    let nodeName = element.nodeName.toLowerCase();
    let tabIndex = $(element).attr('tabindex');

    // The element and all of its ancestors must be visible
    if (($(element)[nodeName == 'aria' ? 'parents' : 'closest'] (':hidden').length) == true) {
      return false;
    }

    // If tabindex is defined, its value must be greater than 0
    if (!isNaN(tabIndex) && tabIndex < 0) {
      return false;
    }

    // If the element is a standard form control, it must not be disabled
    if (/input|select|textarea|button|object/.test(nodeName) == true) {
      return !element.disabled;
    }

    // if the element is a link, href must be defined
    if ((nodeName == 'a' || nodeName == 'area') == true) {
      return (element.href.length > 0);
    }

    // This is some other page element that is not normally focusable
    return false;
  }
});
