/* global require */
var fs = require('fs'),
    path = require('path');

module.exports = function(gulp, Karma, $) {
    return function(done) {
        'use strict';

        var configFile = fs.readFile(path.normalize(__dirname + '/../../karma.conf.js'));

        return new Karma({
            configFile: configFile
        }, done).start();
    };
};

