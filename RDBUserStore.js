

var RDBUserStore = (function() {

	function RDBUserStore(){
	}

	RDBUserStore.prototype.addUser = function(user, password){
		if(!this.canAddUser(user))
			throw Error("User " + user + " already exists.");

		//INSERT INTO usersTable (user, password)
		//VALUES (user, password);
		var userId = null;

		return userId;
	}

	RDBUserStore.prototype.getUserById = function(id){
		
		var user = null; //usersTable where userId == id

		return user;
	}

	RDBUserStore.prototype.getUserByName = function(name){
		
		var user = null; //usersTable where userName == name

		return user;
	}

	RDBUserStore.prototype.getUserList = function() {

		var users = []; //usersTable

		return users;
	}

	RDBUserStore.prototype.canAddUser = function(user){
		console.log("=========================================================================================");
		console.log("RDBUserStore.canAddUser method should be removed once database enforces unique user names");
		console.log("=========================================================================================");
		var user = this.getUserByName(user);
		return (user == null);
	}

	return RDBUserStore;
})();

exports.RDBUserStore = RDBUserStore;