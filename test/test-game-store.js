var assert = require('assert');
var RDBGameStore = require('../lib/RDBGameStore.js');
var _ = require('underscore');

var tableName = "Games";
var database = "data/catan-test.sqlite";

describe("RDB Game Store", function() {

	it('Add a game', function(done) {

		var gameStore = new RDBGameStore.RDBGameStore(database, tableName);

		gameStore.addGame([{id:0,title:"hello",model:{some:"stuff",goes:"here"}}], function(id){
			assert.notEqual(id, "undefined");
			gameStore.removeGame(id);
			gameStore.close();
			done();
		});

	});

	it('Get a game from the database', function(done) {

		var gameStore = new RDBGameStore.RDBGameStore(database, tableName);

		gameStore.addGame({id:0,title:"Tyson's Game",model:{some:"stuff",goes:"here"}}, function(id){
			gameStore.getGame(id, function(game){
				assert.equal(game.id, 0);
				assert.equal(game.title, "Tyson's Game");
				assert.equal(game.model.some, "stuff");
				assert.equal(game.model.goes, "here");
				gameStore.removeGame(id);
				gameStore.close();
				done();
			});
		});

	});

	it('Remove a game from the database', function(done) {

		var gameStore = new RDBGameStore.RDBGameStore(database, tableName);

		gameStore.addGame([{id:0,title:"hello",model:{some:"stuff",goes:"here"}}], function(id){
			gameStore.removeGame(id, function(){
				gameStore.getGame(id, function(game){
					assert.equal(game, null);
					done();
				})
			});
		});

	});

});
