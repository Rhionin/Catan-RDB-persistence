var assert = require('assert');
var RDBUserStore = require('../lib/RDBUserStore.js');
var fs = require("fs");
var _ = require('underscore');
var database = "data/catan-test.sqlite";

describe("RDB User Store", function() {

	it('Add/Get/Delete a user', function(done) {

		var userStore = new RDBUserStore.RDBUserStore(database);

		userStore.addUser("Tyson","Password", function(id){
			userStore.getUserByName("Tyson", function(user){

				assert.equal(user.name, "Tyson");
				assert.equal(user.password, "Password");
				userStore.deleteUser(id, function(changes){
					assert.equal(changes, 1);
					done();
				});
			});
		});

	});

});
