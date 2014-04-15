var sqlite3 = require("sqlite3").verbose();
var fs = require("fs");
var path = require("path");

var sqlite = function()
{

	function sqlite(file)
	{
		this.setDatabaseFile(file);
	}

	/**
	 * [setDatabaseFile sets the file that will be used as the sqlite database]
	 * @method setDatabaseFile
	 * @param {string} file path to the sqlite file
	 */
	sqlite.prototype.setDatabaseFile = function(file)
	{
		var exists = fs.existsSync(file);

		if(exists)
		{
			this.db = new sqlite3.Database(file);
		}
		else
		{
			throw new Error("Database file not found: " + path.resolve(file));
		}
	};

	sqlite.prototype.close = function()
	{
		this.db.close();
	};

	/**
	 * function that inserts values into the database
	 * @method insert
	 * @param {string} table name of the table to insert into
	 * @param {list<string>} columns list containing all of the columns that will be inserted into
	 * @param {list<string>} values values to be inserted. Should be in the same order as the columns
	 * @param {function} callback the value of the lastId inserted will be passed into the callback function
	 */
	sqlite.prototype.insert = function(table, columns, values, callback)
	{

		var col = "";
		var vals = "";

		if(columns.length != values.length)
		{
			throw new Error("SQLITE: Missmatching columns and values when inserting");
		}

		for(var i=0; i<columns.length; ++i)
		{
			col += "'" + columns[i] + "'";
			vals += "?";

			if(i < columns.length - 1)
			{
				col += ",";
				vals += ",";
			}
		}

		var db = this.db;

		db.serialize(function() {

			var stmt = db.prepare("INSERT INTO '"+table+"' ("+col+") VALUES ("+vals+")");

			stmt.run(values, function(){
				if(callback)
					callback(this.lastID);
			});

			stmt.finalize();

		});

	};

	/**
	 * @method select
	 * @param {string} table name of the table to be selected from
	 * @param {List<string>} columns list containing names of the columns selected on. If this parameter is left out then select will retreive all.
	 * @param {object} restrictions json object defining what to select on
	 * @param {function} callback function to run when the select is finished
	 * @return {list<object>} list of json objects containing the rows retrieved from the select statement
	 */
	sqlite.prototype.select = function(table, restrictions, columns, callback)
	{

		if(arguments.length == 3)
		{
			callback = columns;
			columns = "*";
		}
		else 
		{
			columns = columns.toString();
		}

		var where = this.makeWhereClause(restrictions);
		var sql = "SELECT "+columns+" FROM "+table+where.clause;
		var db = this.db;

		db.serialize(function(){

			var stmt = db.prepare(sql);

			stmt.all(where.values, function(err, rows){
				if(callback)
					callback(rows);
			});

			stmt.finalize();

		});
	};

	/**
	 * @method update
	 * @param {string} table name of the table to update
	 * @param {object} changes json object that contains column value pairs of what to update in the database
	 * @param {object} restrictions json object defining what to update on
	 */
	sqlite.prototype.update = function(table, restrictions, changes, callback)
	{

		var updates = [];
		var values = [];

		for(var column in changes)
		{
			updates[updates.length] = column + "=?";
			values[values.length] = changes[column];
		}

		var where = this.makeWhereClause(restrictions);
		var sql = "UPDATE " + table + " SET " + updates.toString() + where.clause;
		var db = this.db;

		db.serialize(function(){

			var stmt = db.prepare(sql);

			stmt.run(values.concat(where.values), function(){
				if(callback)
					callback(this.changes);
			});

			stmt.finalize();
		});
	};

	/**
	 * deletes rows from the database
	 * @param  {string}   table        name of the table to delete from 
	 * @param  {object}   restrictions object containg key value pairs of what to delete on
	 * @param  {Function} callback     callback function
	 * @return {int}               returns the numbers of rows deleted in the callblack function
	 */
	sqlite.prototype.del = function(table, restrictions, callback)
	{

		var where = this.makeWhereClause(restrictions);
		var sql = "DELETE FROM " + table + where.clause;
		var db = this.db;

		db.serialize(function(){

			var stmt = db.prepare(sql);

			stmt.run(where.values, function(){
				if(callback)
					callback(this.changes);
			});

			stmt.finalize();
		});

	};

	sqlite.prototype.all = function(sql, callback)
	{

		this.db.all(sql, function(err, response){
			if(callback)
				callback(response);
		});

	};
	
	/**
	 * builds a where clause given restrictions of what to select on 
	 * @param  {object} restrictions contains key value pairs of "column:value" deciding what to select on
	 * @return {string} formulated where clause
	 */
	sqlite.prototype.makeWhereClause = function(restrictions)
	{
		var where = "";
		var values = [];
		if(restrictions != null && !this.isEmpty(restrictions))
		{
			where += " WHERE "
			var first = true;

			for(key in restrictions)
			{
				if(!first)
					where += " AND ";
				else
					first = false;

				where += key + "=?";
				values[values.length] = restrictions[key]
			}
		}

		return {
			clause:where,
			values:values
		};

	};

	/**
	 * returns true if the argument is an empty object
	 * @param  {object}  obj a json object
	 * @return {Boolean} true if the object is an empty object {}
	 */
	sqlite.prototype.isEmpty = function(obj)
	{

	    for(var prop in obj)
	    {
	        if(obj.hasOwnProperty(prop))
	            return false;
	    }

	    return true;

	}

	return sqlite;

}();

exports.sqlite = sqlite;