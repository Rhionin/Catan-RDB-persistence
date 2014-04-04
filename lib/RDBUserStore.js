

var RDBUserStore = (function() {

	function RDBUserStore(){
	}

	RDBUserStore.prototype.addUser = function(userName, password){
		if(!this.canAddUser(userName))
			throw Error("User " + userName + " already exists.");

		this.startTransaction();
		//INSERT INTO usersTable (userName, password)
		//VALUES (userName, password);
		var userId = null;

		this.endTransaction();

		return userId;
	}

	RDBUserStore.prototype.deleteUser = function(id){
		console.log("Delete user");
	}

	RDBUserStore.prototype.getUserByName = function(name){
		
		var userJson = null; //usersTable where userName == name

		return userJson;
	}

	RDBUserStore.prototype.startTransaction = function() {
		console.log("Start Transaction");
	}

	RDBUserStore.prototype.endTransaction = function() {
		console.log("End Transaction");
	}

	return RDBUserStore;
})();

exports.RDBUserStore = RDBUserStore;