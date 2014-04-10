var assert = require('assert');
var sqlite = require('../lib/sqlite.js');
var fs = require("fs");
var _ = require('underscore');

describe("Sqlite interface", function() {

	// Setup test by copying an empty database
	// fs.createReadStream('data/catan-empty.sqlite').pipe(fs.createWriteStream('data/catan-test.sqlite'));

	var rdb = new sqlite.sqlite("data/catan-test.sqlite");

	it('Insert into the database', function() {

	    rdb.insert("Users", ["username", "password"], ["tyson2", "tysonpassword"]);

	});

	it('Select from the database', function(done) {

	    rdb.select("Users", {username:"tyson2"}, ["id","username", "password"], function(response){assert.equal(response[0].username, "tyson2"); done(); });

	});

	it('Update a row in the database', function(done) {

	    rdb.update("Users", {username:"tyson2"}, {username:"tyson3",password:"newpassword"});
	    rdb.select("Users", {username:"tyson3"}, ["id","username", "password"], function(response){
	    	assert.equal(response[0].username, "tyson3");
	    	assert.equal(response[0].password, "newpassword");
	    	done(); 
	    });

	});

	it('Delete a row in the database', function(done) {

	    rdb.del("Users", {username:"tyson3"});
	    rdb.select("Users", {username:"tyson3"}, ["id","username", "password"], function(response){
	    	assert.equal(response.length, 0);
	    	done(); 
	    });

	});


});
