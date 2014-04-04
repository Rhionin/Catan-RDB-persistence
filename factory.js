var _ = require("underscore"),
	commands = require("./lib/TextCommandStore"),
	game = require("./lib/TextGameStore"),
	user = require("./lib/TextUserStore");

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