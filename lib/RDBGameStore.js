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

	function RDBGameStore(){
	}

	/**
    Returns modelId, the index where the model is stored  
    ID is optional. If specified, a checkpoint will be added instead of a new model

    @method addModel
    @param {ServerModel} model
    @return {int} The index of the new model 
    
	*/
	RDBGameStore.prototype.addModel = function(modelJson, id) {
		this.startTransaction();

		//INSERT INTO modelsTable...
		var modelId = null; 

		this.endTransaction();

		return modelId;
	}

	/**
    Returns the game model specified by id

    @method getModel
    @param {int} id
    @return {ServerModel} The game model specified
    
	*/
	RDBGameStore.prototype.getModel = function(id) {
		var modelJson = null; //modelsTable where modelId == id

       	return modelJson;
	}

	/**
    Removes the model specified by id from the table in the RDB

    @method removeModel
    @param {int} id
    @return void
    
	*/
	RDBGameStore.prototype.removeModel = function(id) {
		//DELETE FROM modelsTable
		//WHERE modelId=id;
	}

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
	}

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
	}

	/**
    Starts a transaction between the game and the RDB

    @method startTransaction
    @return {void}
    
	*/
	RDBGameStore.prototype.startTransaction = function() {
		console.log("Start Transaction");
	}

	/**
    Ends a transaction between the game and the RDB

    @method endTransaction
    @return {void}
    
	*/
	RDBGameStore.prototype.endTransaction = function() {
		console.log("End Transaction");
	}


	return RDBGameStore;
})();

exports.RDBGameStore = RDBGameStore;