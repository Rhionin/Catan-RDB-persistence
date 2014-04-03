var ServerModelClass = require('../../models/server_model.js');

var RDBGameStore = (function() {

	function RDBGameStore(){
	}

	//ID is optional. If specified, a checkpoint will be added instead of a new model
	RDBGameStore.prototype.addModel = function(modelJson, id) {
		this.startTransaction();

		//INSERT INTO modelsTable...
		var modelId = null; 

		this.endTransaction();

		return modelId;
	}

	RDBGameStore.prototype.getModel = function(id) {
		var modelJson = null; //modelsTable where modelId == id

       	return modelJson;
	}

	RDBGameStore.prototype.removeModel = function(id) {
		//DELETE FROM modelsTable
		//WHERE modelId=id;
	}

	RDBGameStore.prototype.getCheckpoint = function(id) {
		//Get latest checkpoint for given game id
		var modelJson = null;

		return modelJson;
	}

	RDBGameStore.prototype.initialize = function() {
		console.log("\nINITIALIZING DATA STORE");
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

	RDBGameStore.prototype.startTransaction = function() {
		console.log("Start Transaction");
	}

	RDBGameStore.prototype.endTransaction = function() {
		console.log("End Transaction");
	}


	return RDBGameStore;
})();

exports.RDBGameStore = RDBGameStore;