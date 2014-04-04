

var RDBCommandStore = (function() {

	function RDBCommandStore(){
	}

	RDBCommandStore.prototype.addCommand = function(gameId, commandJson){
		this.startTransaction();
		
		//Append command to proper game's command list
		var commandId = null;

		this.endTransaction();

		return commandId;
	}

	RDBCommandStore.prototype.getCommands = function(gameId){
		var commands = [];
		//fill commands array with JSON commands from DB for given game

		return commands;
	}

	RDBCommandStore.prototype.startTransaction = function() {
		console.log("Start Transaction");
	}

	RDBCommandStore.prototype.endTransaction = function() {
		console.log("End Transaction");
	}

	return RDBCommandStore;
})();

exports.RDBCommandStore = RDBCommandStore;