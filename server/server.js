var express = require("express"),
	app = module.exports.app = exports.app = express(),
    baseDir = __dirname + '/../';
//	twig = require("twig");

/* Base route */
app.use( '/', express.static(baseDir + 'app') );

/* Dist (build) route */
app.use( '/dist', express.static(baseDir + 'dist') );

/* Test route */
app.use( '/test', express.static(baseDir + 'test') );

app.listen( 3000 );
