var assert = require('assert');
var RDBGameStore = require('../lib/RDBGameStore.js');
var _ = require('underscore');

var tableName = "Games";
var checkpointTable = "Checkpoints";
var database = "data/catan-test.sqlite";

describe("RDB Game Store", function() {

	it('Add a game', function(done) {

		var gameStore = new RDBGameStore.RDBGameStore(database, tableName, checkpointTable);

		gameStore.addGame({id:0,title:"hello",model:{some:"stuff",goes:"here"}}, function(id){
			assert.notEqual(id, "undefined");
			gameStore.removeGame(id);
			gameStore.close();
			done();
		});

	});

	it('Get a game from the database', function(done) {

		var gameStore = new RDBGameStore.RDBGameStore(database, tableName, checkpointTable);

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

		var gameStore = new RDBGameStore.RDBGameStore(database, tableName, checkpointTable);

		gameStore.addGame({id:0,title:"hello",model:{some:"stuff",goes:"here"}}, function(id){
			gameStore.removeGame(id, function(){
				gameStore.getGame(id, function(game){
					assert.equal(game, null);
					done();
				})
			});
		});

	});

	it('Update a game in the database', function(done) {

		var gameStore = new RDBGameStore.RDBGameStore(database, tableName, checkpointTable);

		gameStore.addGame({id:0,title:"hello",model:{some:"stuff",goes:"here"}}, function(id){
			gameStore.updateGame({id:1,title:"helloagain",model:{some:"stuff",goes:"here"}}, id, function(changes){

				assert.equal(changes, 1);

				gameStore.getGame(id, function(game){

					assert.equal(game.id, 1);
					assert.equal(game.title, "helloagain");
					gameStore.removeGame(id);
					done();

				});

			})
		});

	});

	it('Add a checkpoint', function(done) {

		var gameStore = new RDBGameStore.RDBGameStore(database, tableName, checkpointTable);

		assert.ok(false, "Test not build yet");

	});

	it('Get a checkpoint', function(done) {

		var gameStore = new RDBGameStore.RDBGameStore(database, tableName, checkpointTable);

		assert.ok(false, "Test not build yet");

	});

	it('Initialize with no games', function(done) {

		var gameStore = new RDBGameStore.RDBGameStore(database, tableName, checkpointTable);

		// Test without any games in the database
		gameStore.initialize(function(models){

			assert.equal(models.length, 0);
			done();
		});

	});

	it('Initialize with games', function(done) {

		var gameStore = new RDBGameStore.RDBGameStore(database, tableName, checkpointTable);


		// Test with some games
		gameStore.addGame({id:0,title:"Game1",model:{some:"stuff",goes:"here"}}, function(id){

			var id1 = id;

			gameStore.addGame({id:1,title:"Game2",model:{some:"stuff",goes:"here"}}, function(id){

				var id2 = id;

				gameStore.initialize(function(models){

					assert.equal(models.length, 2);
					assert.equal(models[0].title, "Game1");
					assert.equal(models[1].title, "Game2");

					gameStore.removeGame(id1, function(){
						gameStore.removeGame(id2, function(){
							done();
						});
					});

				});
			});
		});
	});


});
