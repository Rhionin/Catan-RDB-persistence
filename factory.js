var _ = require("underscore"),
	commands = require("./lib/RDBCommandStore"),
	game = require("./lib/RDBGameStore"),
	user = require("./lib/RDBUserStore");

var commandStore = new commands.RDBCommandStore();
var gameStore = new game.RDBGameStore();
var userStore = new user.RDBUserStore();

_.extend(exports, {
	getCommandStore: function()
	{
		return commandStore;
	},
	getGameStore: function()
	{
		return gameStore;
	},
	getUserStore: function()
	{
		return userStore;
	}
});