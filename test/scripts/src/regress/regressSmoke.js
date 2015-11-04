casper.test.begin('C3 is loaded and ready to test', 2, function suite(test) {
    casper.start('http://localhost:7000', function() {
        test.assertTitle('C3 Toolchain', 'C3 title is correct');
        test.assertExists('#wrapper', 'Div ID wrapper exists');
        
        /* Now take the screenshot */
        phantomcss.screenshot('#wrapper', 'divWrapper--index');
    });

    casper.run(function() {
        test.done();
    });
});
