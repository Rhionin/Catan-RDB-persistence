/**
    A factory for the RDB based DAO classes
    <pre>

    Domain:
        commands {RDBCommandStore}
        game {RDBGameStore}
        user {RDBUserStore}

    Invariants:
        INVARIANT: none

    Constructor Specification:
        PRE: none
        POST: none
    </pre>

    @class RDBfactory
    @constructor    
*/

var _ = require("underscore"),
	commands = require("./lib/RDBCommandStore"),
	game = require("./lib/RDBGameStore"),
	user = require("./lib/RDBUserStore"),
	fse = require("fs-extra");

var commandStore = new commands.RDBCommandStore();
var gameStore = new game.RDBGameStore(__dirname + "/data/catan.sqlite", "Games", "Checkpoints");
var userStore = new user.RDBUserStore();

_.extend(exports, {
	/**
	 * [getCommandStore description]
	 *
	 * 	    Domain: None
	      
	    Invariants:
	        INVARIANT: None
	    
	    	PRE: None
	    	POST: a valid commandStore is returned
	    </pre>
	 * @method getCommandStore
	 * @return {RDB}
	 */
	getCommandStore: function()
	{
		return commandStore;
	},
	/**
	 * [getGameStore description]
	 *
	 * 	    Domain: None
	      
	    Invariants:
	        INVARIANT: None
	    
	    	PRE: None
	    	POST: a valid getStore is returned
	    </pre>
	 * @method getGameStore
	 * @return {[type]}
	 */
	getGameStore: function()
	{
		return gameStore;
	},
	/**
	 * [getUserStore description]
	 * 	    Domain: None
	      
	    Invariants:
	        INVARIANT: None
	    
	    	PRE: None
	    	POST: a valid userStore is returned
	    </pre>
	 * @method getUserStore
	 * @return {[type]}
	 */
	getUserStore: function()
	{
		return userStore;
	},

	clean: function()
	{
		fse.unlink('data/catan.sqlite', function (err) {
			if (err) throw err;

			console.log("\tRDB:\tDeleted 'catan.sqlite'");

			fs.copy('data/catan-empty.sqlite', 'data/catan.sqlite', function(err){
				if (err) return console.error(err);

				console.log("\tRDB\tcopied 'catan-emtpy.sqlite' to 'catan.sqlite'");

			});

		});
	}
});