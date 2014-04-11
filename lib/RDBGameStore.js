var sqlite = require('./sqlite.js');

// var ServerModelClass = require('../../models/server_model.js');

	/**
    The RDBGameStore class is returned by RDBPersistenceFactory and follows the IGameStore convention (interface)  
    <pre>

    Domain: None
      
    Invariants:
        INVARIANT: None
    
    Constructor Specification:
    	PRE: None
    	POST: None
    </pre>

    @class RDBGameStore
    @constructor
    
	*/
var RDBGameStore = (function() {

	function RDBGameStore(database, tableName)
	{
		this.rdb = new sqlite.sqlite(database);
		this.tableName = tableName;
	}

	/**
    passes the id of the model created into the parameter of the callback function 

    @method addModel
    @param {ServerModel} model
    
	*/

	RDBGameStore.prototype.addGame = function(gameJson, callback) {
		
		this.rdb.insert(this.tableName, ["data"], [JSON.stringify(gameJson)], function(id){
			callback(id);
		});

	};

	/**
    Replaces the latest checkpoint of the game specified by gameId

    @method updateGame
    @param {String} gameJson
    @param {int} gameId
    @return {int} the gameId
    
	*/
	RDBGameStore.prototype.updateGame = function(gameJson, gameId) {	
		//update game

		return id;
	};

	/**
    Returns the game specified by id as a parameter to the callback function

    @method getGame
    @param {int} gameId
    
	*/
	RDBGameStore.prototype.getGame = function(id, callback) {

		this.rdb.select(this.tableName, {id:id}, function(row){
			if(row[0])
				callback(JSON.parse(row[0].data));
			else
				callback(null);
		});

	};

	/**
    Removes the model specified by id from the table in the RDB
    return the number of rows deleted as a parameter to the callback function

    @method removeModel
    @param {int} id
    @param {funtion} callback optional callback function
    
	*/
	RDBGameStore.prototype.removeGame = function(id, callback) {

		this.rdb.del(this.tableName, {id:id}, function(changes){
			if(callback)
				callback(changes);
		});

	};

	/**
    Sets a new checkpoint for the given gameId

    @method getCheckpoint
    @param {int} gameId
    @return {int} the checkpoint index for the given gameId
    
	*/
	RDBGameStore.prototype.addCheckpoint = function(gameId) {
		var index = null;

		return index;
	};	

	/**
    Returns a game model from the last checkpoint

    @method getCheckpoint
    @param {int} id
    @return {ServerModel} the game model of the last checkpoint
    
	*/
	RDBGameStore.prototype.getCheckpoint = function(id) {
		//Get latest checkpoint for given game id
		var modelJson = null;

		return modelJson;
	};

	/**
    Loads game models into memory from the RDB 

    @method initialize
    @return {ServerModel[]} An array of game models
    
	*/
	RDBGameStore.prototype.initialize = function() {
		console.log("\nINITIALIZING RELATIONAL DATABASE");
		var models = [];
		var modelNames = [];

		//for each modelJson in DB:
			// model = new ServerModelClass.ServerModel();
			// model.fromJSON(modelJson);
			// model.title = modelJson.title;
			// modelNames.push(model.title);
			// models.push(model);

		console.log("Model files loaded:", modelNames);

		return models;
	};

	/**
    Starts a transaction between the game and the RDB

    @method startTransaction
    @return {void}
    
	*/
	RDBGameStore.prototype.startTransaction = function() {
		console.log("Start Transaction");
	};

	/**
    Ends a transaction between the game and the RDB

    @method endTransaction
    @return {void}
    
	*/
	RDBGameStore.prototype.endTransaction = function() {
		console.log("End Transaction");
	};

	/**
	 * closes the connection to the database
	 * @method  close
	 */
	RDBGameStore.prototype.close = function()
	{
		this.rdb.close();
	};


	return RDBGameStore;
})();

exports.RDBGameStore = RDBGameStore;