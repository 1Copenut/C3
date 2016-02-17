casper.test.begin('C3 contact form is loaded and ready to test', 2, function suite(test) {
    casper.start('http://localhost:7000/dist/contact.html');
	
    /* Log the URL */
	casper.then(function() {
        this.echo('Page URL is ' + this.getCurrentUrl());
    });
	
	casper.then(function() {
		/* Prove the page and element are loaded */
		test.assertTitle('Continuum Design', 'Contact form title is correct');
        test.assertExists('#wrapper form', 'Contact form exists');
		
        /* Now take the screenshot */
        phantomcss.screenshot('#wrapper form', 'divWrapper--contactForm');
	});

    /* Exit the test */
	casper.run(function() {
        this.test.done();
        this.test.renderResults(true);
    });
});
