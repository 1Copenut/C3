/* global require */
'use strict'
var $ = require('jquery');

module.exports = {
    render: function(el, fixture) {
        $(el).empty().prepend(fixture);
    }
};
