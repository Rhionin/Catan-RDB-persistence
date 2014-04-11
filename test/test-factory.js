var assert = require('assert');
var RDBFactory = require('../factory.js');
var fs = require("fs");
var _ = require('underscore');

describe("RDB Factory interface", function() {

	it('Wipe the database', function(done) {

		RDBFactory.clean(function(){
			done();
		});

	});
});
