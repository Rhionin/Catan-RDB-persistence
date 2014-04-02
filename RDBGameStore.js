var ServerModelClass = require('../../models/server_model.js');

var RDBGameStore = (function() {

	function RDBGameStore(){
	}

	RDBGameStore.prototype.addModel = function(model) {
		var modelJson = model.toJSON();

		//INSERT INTO modelsTable...
		var modelId = null; 

		return modelId;
	}

	RDBGameStore.prototype.getModel = function(id) {
		var model = null; //modelsTable where modelId == id

       	return model;
	}

	RDBGameStore.prototype.removeModel = function(id) {
		//DELETE FROM modelsTable
		//WHERE modelId=id;
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

	return RDBGameStore;
})();

exports.RDBGameStore = RDBGameStore;