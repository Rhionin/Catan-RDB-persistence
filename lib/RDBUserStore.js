var sqlite = require('./sqlite.js');
/**
    The RDBUserStore class provides access to the Users table of a Relational Database
    <pre>

    Author: Team 10    

    Domain:
		connection: A handle to the relational database.
        
    Invariants:
        INVARIANT: RDBUserStore can always access or create a valid read/write connection with a relational Database.

    Constructor Specification:
        PRE: Parameters provide access to the database, either by providing credentials or a file location (for SQLite)
        POST: RDBUserStore is now connected to an RDB and is able to manipulate and run queries against it.
    </pre>

    @class RDBUserStore
    @constructor
*/
var RDBUserStore = (function() {

	function RDBUserStore(){
        var rdb = new sqlite.sqlite(__dirname + "/../data/catan.sqlite");
	}

	/**
	Adds a user to the database and returns the user's primary key.
    <pre>
        PRE: The userName doesn't exist already in the database
		PRE: userName is a valid user name as defined in the specs
        PRE: password is a valid password as defined in the specs.
        POST: The Users table of the RDB contains exactly one more entry than before.
        POST: The user has been added to the database with his or her corresponding password
        POST: The user's primary key in the database is returned.
    </pre>
    @method addUser
	@param {String} userName The user name of the user to be added to the database
	@param {String} password The raw string value of the password.
	@return {Number}  Return the pk of the user just added.
    */
	RDBUserStore.prototype.addUser = function(userName, password){
		if(!this.canAddUser(userName))
			throw Error("User " + userName + " already exists.");

		this.startTransaction();
		//INSERT INTO usersTable (userName, password)
		//VALUES (userName, password);
        rdb.insert("Users", ["username", "password"], [userName, password]);

        var userId = null;

        // assign ID
         rdb.select("Users", {username:userName}, ["id","username", "password"], function(response){
           userID= response[0].id; 
        });
		

		this.endTransaction();

		return userId;
	}

	/**
	Deletes a user from the database.
    <pre>
        PRE: The 'id' is found in the database
        POST: The Users table of the RDB contains exactly one less entry than before.
        POST: The user with 'id' no longer is in the database.
    </pre>
    @method deleteUser
	@param {Number} id The primary key of the user to delete from the database
    */
	RDBUserStore.prototype.deleteUser = function(id){
		console.log("Delete user");
	}

	/**
	Returns the JSON representation of a user from the RDB with a given username
    <pre>
        PRE: 'name' is a valid user name in the database
        POST: Returns exactly 1 result who matches the parameter
    </pre>
    @method getUserByName
	@param {String} name The user name of the user you are retrieving from the RDB.
    @return {String} Returns the JSON representation of that user.
    */
	RDBUserStore.prototype.getUserByName = function(name){
		
		var userJson = null; //usersTable where userName == name

		return userJson;
	}

	/**
	Starts a transaction with the database
    <pre>
        PRE: A valid connection is established with the DB.
        POST: A transaction has been started.
    </pre>
    @method startTransaction
    */
	RDBUserStore.prototype.startTransaction = function() {
		console.log("Start Transaction");
	}

	/**
	Ends the current transaction with the database.
    <pre>
        PRE: A transaction exists.
        POST: All changes to the DB are either saved or rolled back
        POST: No transaction remains
    </pre>
    @method endTransaction
    */
	RDBUserStore.prototype.endTransaction = function() {
		console.log("End Transaction");
	}

	return RDBUserStore;
})();

exports.RDBUserStore = RDBUserStore;