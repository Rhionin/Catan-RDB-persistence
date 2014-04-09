var assert = require('assert');
var sqlite = require('../lib/sqlite.js');
var _ = require('underscore');

describe("Sqlite interface", function() {

	it('Insert into the database', function() {

	    var rdb = new sqlite.sqlite("data/catan.sqlite");
	    rdb.insert("Users", ["username", "password"], ["tyson2", "tysonpassword"]);
	    rdb.close();

	    // player.fromJSON(samplePlayer);

	    // assert.equal(player.getRoads(), 13);

	});

	it('Select from the database', function(done) {

	    var rdb = new sqlite.sqlite("data/catan.sqlite");
	    rdb.select("Users", {username:"tyson"}, ["id","username", "password"], function(response){console.log(response); done(); });
	    rdb.close();

	    // player.fromJSON(samplePlayer);

	    // assert.equal(player.getRoads(), 13);

	});

});
