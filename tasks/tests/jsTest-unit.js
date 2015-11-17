/* global require */
var handleError = require('../utilities/utilHandleErrors');
    fs = require('fs'),
    path = require('path'),


module.exports = function(gulp, Karma, $) {
    return function(done) {
        'use strict';

        var configFile = fs.readFile(path.normalize(__dirname + '/../../karma.conf.js'));

        var stream = new Karma({
            configFile: configFile,
        }, done).start();

        return stream;
    };
};

