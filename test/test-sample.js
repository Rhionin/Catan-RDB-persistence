var assert = require("assert");

describe("a sample module", function() {

	it("should be true", function() {
		assert.ok(true, "it's true");
	});

	it("should be false", function() {
		assert.equal(false, false, "it's false");
	});

});