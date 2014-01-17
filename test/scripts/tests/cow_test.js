define(['squire'], function(Squire) {
	var injector = new Squire();

	injector.require(['cow'], function(Cow) {
		describe('Cow', function() {
			describe('constructor', function() {
				it('should have a default name', function() {
					var cow = new Cow();
					expect(cow.name).to.equal('Anon cow');
				});
			});
		});

		mocha.run();
	},
	
	function(err) {
		console.log('Something went tragically wrong');
	});
});
