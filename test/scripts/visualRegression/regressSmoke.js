casper.test.begin('C3 is loaded and ready to test', 2, function suite(test) {
	casper.start('http://localhost:7000/dist/');
	
	/* Check the URL */
    casper.then(function() {
        this.echo('Page URL is ' + this.getCurrentUrl());
    });
	
	casper.then(function() {
	    /* Prove the page and element are loaded */
		test.assertTitle('C3 Toolchain', 'C3 title is correct');
        test.assertExists('#wrapper', 'Div ID wrapper exists');
        
        /* Now take the screenshot */
        phantomcss.screenshot('#wrapper', 'divWrapper--index');
	});

    /* Exit the test */
	casper.run(function() {
        this.test.done();
        this.test.renderResults(true);
    });
});
