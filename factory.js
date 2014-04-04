var _ = require("underscore"),
	commands = require("./lib/RDBCommandStore"),
	game = require("./lib/RDBGameStore"),
	user = require("./lib/RDBUserStore");

var commandStore = new commands.TextCommandStore();
var gameStore = new game.TextGameStore();
var userStore = new user.TextUserStore();

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