// setup

var test = require("peezy-test-helper");
var logger = require("./../index.js");

// tests
	
	test.setup("Info method", "logger.info(msg, detail, newline)", function(done) {
	
		logger.info("hello world", {}, true);
		logger.inspect(["foo", "bar"], "inspecting an array");
		
		done();		
	
	});

	test.setup("Inspect method", "logger.inspect(arr, msg)", function(done) {
	
		logger.info("hello world", {}, true);
		logger.inspect(["foo", "bar"], "inspecting an array");
		
		done();
	
	});
