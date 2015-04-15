var express = require("express"),
	app = module.exports.app = exports.app = express(),
    baseDir = __dirname + '/../';
//	twig = require("twig");

app.use( '/', express.static(baseDir + 'app') );

app.listen( 3000 );
