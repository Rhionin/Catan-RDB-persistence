var sqlite = require('./sqlite.js');

/**
 * The RDBGameStore class is returned by RDBPersistenceFactory and follows the IGameStore convention (interface)  
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

	function RDBGameStore(database, tableName, checkpointTable)
	{
		this.rdb = new sqlite.sqlite(database);
		this.tableName = tableName;
		this.checkpointTable = checkpointTable;
		this.setLogging(true);
	}

	/**
	 * Enables or Disables the logging feature
	 * @param {boolean} logging weather or not you want the logging feature turned on
	 */
	RDBGameStore.prototype.setLogging = function(logging)
	{
		this.logging = logging;
	};

	/**
    passes the id of the model created into the parameter of the callback function 

    @method addModel
    @param {ServerModel} model
    
	*/

	RDBGameStore.prototype.addGame = function(gameJson, callback) {

		var that = this;
		
		that.rdb.insert(this.tableName, ["data"], [JSON.stringify(gameJson)], function(id){
			gameJson.id = id;
			that.updateGame(gameJson, id, function(changes){
				if(callback)
					callback(id);
			});
		});

	};

	/**
    Replaces the latest checkpoint of the game specified by gameId
    Returns the number of rows changed in the parameter of the callback function

    @method updateGame
    @param {String} gameJson
    @param {int} gameId
    
	*/
	RDBGameStore.prototype.updateGame = function(gameJson, callback) {	
		
		this.rdb.update(this.tableName, {id:gameJson.id}, {data:JSON.stringify(gameJson)}, function(changes){
			if(callback)
				callback();
		});

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

		var rdb = this.rdb;
		var tableName = this.tableName;
		var checkpointTable = this.checkpointTable;


		// Remove the game
		rdb.del(tableName, {id:id}, function(changes){
			// Remove all checkpoints associated with the game
			rdb.del(checkpointTable, {"gameid":id}, function(changes){
				if(callback)
					callback(changes);
			});
		});



	};

	/**
    Sets a new checkpoint for the given gameId
    Returns the id of the checkpoint added in the parameter of the callback function

    @method getCheckpoint
    @param {int} gameId
    
	*/
	RDBGameStore.prototype.addCheckpoint = function(gameId, gameJson, callback) {
		
		this.rdb.insert(this.checkpointTable, ["gameid", "data"], [gameId, JSON.stringify(gameJson)], function(id){
			if(callback)
				callback(id);
		});

	};	

	/**
    Returns a game model from the last checkpoint as a parameter to the callback function

    @method getCheckpoint
    @param {int} id
    @return {ServerModel} the game model of the last checkpoint
    
	*/
	RDBGameStore.prototype.getCheckpoint = function(id, callback) {

		this.rdb.select(this.checkpointTable, {gameid:id}, function(rows){
			callback(JSON.parse(rows[rows.length-1].data));
		});

	};

	/**
    Loads game models into memory from the RDB 

    @method initialize
    @param {function} callback a callback function
    @return {ServerModel[]} An array of JSON server models as the parameter to the callback function
    
	*/
	RDBGameStore.prototype.initialize = function(callback) 
	{
		var logging = this.logging;
		if(logging)
			console.log("\nINITIALIZING RELATIONAL DATABASE");

		var models = [];
		var modelNames = [];

		this.rdb.select(this.tableName, {}, function(rows){

			if(rows)
			{
				for(var i=0; i<rows.length; ++i)
				{
					models[models.length] = JSON.parse(rows[i].data);
					modelNames[modelNames.length] = JSON.parse(rows[i].data).title;	
				}
				
				if(logging)
					console.log("Games loaded:", modelNames);
			}


			callback(models);

		});

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