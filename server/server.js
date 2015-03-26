var express = require("express"),
	app = module.exports.app = exports.app = express();
//	twig = require("twig");

app.use( express.static( __dirname + "/../app" ) );
// app.set( "view engine", "twig" );
// app.set( "views", __dirname + "/../app/templates" );

app.listen( 3000 );
