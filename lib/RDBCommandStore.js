var sqlite = require('./sqlite.js');

/**
    The RDBCommandStore class provides access to the Commands portion of an RDB.
    <pre>

    Author: Team 10    

	Domain:
		connection: A handle to the relational database.
        
    Invariants:
        INVARIANT: RDBCommandStore can always access or create a valid read/write connection with a relational Database.

    Constructor Specification:
        PRE: Parameters provide access to the database, either by providing credentials or a file location (for SQLite)
        POST: RDBCommandStore is now connected to an RDB and is able to manipulate and run queries against it.
    </pre>

    @class RDBCommandStore
    @constructor
*/
var RDBCommandStore = (function() {

	function RDBCommandStore(database){
		this.rdb = new sqlite.sqlite(database);
	}

	/**
	Adds a command to the provided game's command list.
	<pre>
		PRE: gameId is a valid game in the database.
		POST: The command list for the specified game now is associated with this command.
	</pre>
	@method addCommand
	@param {Number} gameId The game id to connect the command with in the database
	@param {String} commandJson The JSON representation of the command to add.
	@return {Number} Returns the id of the command after being added to the database
	*/

	RDBCommandStore.prototype.addCommand = function(gameId, commandJson, callback){
		
		//Append command to proper game's command list
		var commandId = null;

		this.rdb.insert("Commands", ["gameid", "command"], [gameId, JSON.stringify(commandJson)], function(id) {
			if (callback)
			{
				callback(commandId);
			}
		});

	}

	/**
	Gets and returns all the commands for the specified game.
	<pre>
		PRE: gameId is a valid game ID in the database
		POST: The database has not been modified.
		POST: An array of that game's commands is returned.
	</pre>
	@method getCommands
	@param {Number} gameId Determines which game's commands should be returned from the database
	@return {List<String>} Returns an array of JSON-encoded commands.
	*/
	RDBCommandStore.prototype.getCommands = function(gameId){
		var commands = [];
		//fill commands array with JSON commands from DB for given game

		return commands;
	}

	/**
	Starts a transaction with the database
    <pre>
        PRE: A valid connection is established with the DB.
        POST: A transaction has been started.
    </pre>
    @method startTransaction
    */
	RDBCommandStore.prototype.startTransaction = function() {
		console.log("Start Transaction");
	}


	/**
	Ends the current transaction with the database.
    <pre>
        PRE: A transaction exists.
        POST: All changes to the DB are either saved or rolled back
        POST: No transaction remains
    </pre>
    @method startTransaction
    */
	RDBCommandStore.prototype.endTransaction = function() {
		console.log("End Transaction");
	}

	return RDBCommandStore;
})();

exports.RDBCommandStore = RDBCommandStore;