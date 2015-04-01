function User()
{
	this.id = 
	{
		value : null,
		required : null,
		pattern : null,
		sqlType : INT +' '+ NOTNULL +' '+ PRIMARYKEY +' '+ AUTOINCREMENT
	};
	
	this.login = 
	{
		value : null,
		required : null,
		pattern : null,
		sqlType : VARCHAR + '(50)'
	};
	
	this.password = 
	{
		value : null,
		required : null,
		pattern : null,
		sqlType : VARCHAR + '(255)'
	};
	
	this.time = 
	{
		value : null,
		required : null,
		pattern : null,
		sqlType : INT
	};

	this.avatar = 
	{
		value : null,
		required : null,
		pattern : null,
		sqlType : MEDIUMTEXT
	};

} extending(User, CswModel);


User.prototype.exist = function(login, cbSuccess, cbError)
{
	var request = 'SELECT * FROM ' + this.getClass() + ' WHERE login = "' + login + '"';


    var db = new CswDb(DB,  DBV, DB, DBSIZE);
    
    db.prepare(request, cbSuccess, cbError);
    db.execute();
}

User.prototype.signin = function(login, password, cbSuccess, cbError)
{
	var request = 'SELECT * FROM ' + this.getClass() + ' WHERE login = "' + login + '" AND password = "' + password + '"';


    var db = new CswDb(DB,  DBV, DB, DBSIZE);
    
    db.prepare(request, cbSuccess, cbError);
    db.execute();
}