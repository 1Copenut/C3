var express = require("express"),
		app = express(),
		twig = require("twig");
		// d_products = require("../data/d_products"),
		// d_artists = require("../data/d_artists");

app.use( express.static( __dirname + "/../app" ) );
app.set( "view engine", "twig" );
app.set( "views", __dirname + "/../app/templates" );

// // map products to artists by cross-linking data
// for ( var id in d_products.products ) {
// 	d_products.products[ id ].artist = d_artists.artists[ d_products.products[ id ].artist.toString() ];
// }
// 
// // This is just a data call to fetch JSON
// app.get( "/results", function( req, res ) {
// 	var arr = [];
// 	for ( var result in d_products.products ) {
// 		arr.push( d_products.products[ result ] );	
// 	}
// 	res.send( { results: arr } );
// });
// 
// // This is just a data call to fetch JSON
// app.get( "/detail/:id", function( req, res ) {
// 	res.send( d_products.products[ req.params.id ] );
// });
// 
// // This is the detail rendered server-side so users without Javascript can
// // deep link to the product detail
// app.get( "/product/:id", function( req, res ) {
// 	res.render( "detail", d_products.products[ req.params.id ] );
// });

app.listen( 3000 );
console.log('App is running on port 3000');