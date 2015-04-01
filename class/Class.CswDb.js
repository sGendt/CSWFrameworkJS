
function CswDb(name, version, display, size)
{
	this.name = name;
	this.version = version;
	this.display = display;
	this.size = size;

	this.db = null;
	this.connexion = null;

	this.query =  null;
	this.cbQuerySuccess = null;
	this.cbQueryError = null;
}


CswDb.prototype.prepare =  function(query, cbQuerySuccess, cbQueryError)
{
	this.query = query;
	this.cbQuerySuccess = cbQuerySuccess;
	this.cbQueryError = cbQueryError;
}


CswDb.prototype.execute = function()
{
	var that = this;

	if(!window.openDatabase)
	{
		alert('Erreur browser database');
		return;
	}

	this.db = window.openDatabase(this.name,  this.version, this.display, this.size);

	this.db.transaction
	(
		function(connexion)
		{
			that.transactionSuccess(connexion);
		}, 
		function(connexion, error)
		{
			that.transactionError(connexion, error);
		}
	);
}

CswDb.prototype.transactionSuccess = function(connexion)
{
	this.connexion = connexion;
	this.request();
}


CswDb.prototype.transactionError = function(connexion, error)
{
	$('.loader').hide();
	this.connexion = connexion;
	alert('error transaction');
	console.log('Erreur SQL');
	console.log(error);
}


CswDb.prototype.request = function()
{
	var that = this;

	this.connexion.executeSql
	(
		this.query,
		[], 
		function(connexion, datas)
		{
			that.onQuerySuccess(connexion, datas);
		}, 
		function(connexion, datas)
		{
			that.onQueryError(connexion, error);
		}
	);
}


CswDb.prototype.onQuerySuccess = function(connexion, datas)
{
	try
	{
		if(typeof this.cbQuerySuccess !== 'function')
    		throw new Error("Not a function");

    	var rows = this.fetch(datas);

		this.cbQuerySuccess
		(
			rows
		);
	}
	catch(e){ alert('---error success cb'); }
}


CswDb.prototype.onQueryError = function(connexion, error)
{
	try
	{
		if(typeof this.cbQueryError !== 'function')
    		throw new Error("Not a function");

		this.cbQueryError(error);
	}
	catch(e){ alert('error error cb'); }
}


CswDb.prototype.fetch = function(datas)
{
	var returns = datas;

	returns['results'] = {};

    for(var i = 0; i < datas.rows.length; i++)
    {
        returns['results'][i] = {};
        for(var k in datas.rows.item(i))
            returns['results'][i][k] = datas.rows.item(i)[k];
    }

    return datas;
}



