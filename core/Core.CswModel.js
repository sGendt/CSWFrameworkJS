function CswModel() 
{
    //...
}


/**
 *
 */

CswModel.prototype.createTable = function(callback)
{
    var properties = this.getProperties();
    var propertiesName = [];

    for(var i  in properties)
        propertiesName.push(i + ' ' + properties[i].sqlType);


    var request = 'CREATE TABLE IF NOT EXISTS ' + this.getClass() + ' (' + propertiesName.join(', ') + ')';

    var db = new CswDb(DB,  DBV, DB, DBSIZE);

    db.prepare
    (
        request,
        function(datas)
        {
            callback(datas);
        }
    );


    db.execute();
}


/**
 *
 */

CswModel.prototype.load = function(id, callback) 
{
    this.callback = callback;

    var that = this;
    var request = 'SELECT * FROM ' + this.getClass() + ' WHERE id = ' + id;

    var db = new CswDb(DB,  DBV, DB, DBSIZE);
    
    db.prepare
    (
        request, 
        function(datas)
        {
            that.hydrate(datas);
        }
    );

    db.execute();
}

/**
 *
 */

CswModel.prototype.get = function(id, callback) 
{
    var that = this;
    var request = 'SELECT * FROM ' + this.getClass() + ' WHERE id = ' + id;

    var db = new CswDb(DB,  DBV, DB, DBSIZE);
    
    db.prepare
    (
        request, 
        function(datas)
        {
            callback(datas);
        }
    );

    db.execute();
}



/**
 *
 */

CswModel.prototype.getAll = function(callback) 
{
    var that = this;
    var request = 'SELECT * FROM ' + this.getClass();

    var db = new CswDb(DB,  DBV, DB, DBSIZE);
    
    db.prepare
    (
        request, 
        function(datas)
        {
            callback(datas);
        }
    );

    db.execute();
}


/**
 *
 */

CswModel.prototype.hydrate = function(datas)
{
    var rows = datas.results;

    for(var i in rows)
        for(var k in rows[i])
            this[k].value = rows[i][k];

    this.callback();
}


/**
 *
 */

CswModel.prototype.save = function(cbSuccess, cbError) 
{
    if(this.id.value != null && this.id.value.length > 0)
    {
        this.update();
        return;
    }

    var properties = this.getProperties();
    var propertiesName = [];
    var propertiesValue = [];

    for(var i  in properties)
    {
        if(i == 'id')
            continue;

        propertiesName.push(i);
        propertiesValue.push(properties[i].value);
    }

    var request = 'INSERT INTO ' + this.getClass() + ' (' + propertiesName.join(', ') + ') VALUES ("' + propertiesValue.join('", "') + '")';

    var db = new CswDb(DB,  DBV, DB, DBSIZE);
    
    db.prepare(request, cbSuccess, cbError);
    db.execute();
}


/**
 *
 */

CswModel.prototype.update = function() 
{
    var properties = this.getProperties();
    var propertiesValue = [];

    for(var i  in properties)
    {
        if(i == 'id')
            continue;

        propertiesValue.push(i + ' = "' + properties[i].value + '"');
    }

    var request = 'UPDATE ' + this.getClass() + ' SET ' + propertiesValue.join(', ') + ' WHERE id = ' + this.id.value;

    var db = new CswDb(DB,  DBV, DB, DBSIZE);
    
    db.prepare(request);
    db.execute();
}


/**
 *
 */

CswModel.prototype.del = function() 
{
    var request = 'DELETE FROM ' + this.getClass() + ' WHERE id = ' + this.id.value;
    console.log(request);

    var db = new CswDb(DB,  DBV, DB, DBSIZE);
    
    db.prepare(request);
    db.execute();
}


/**
 *
 */

CswModel.prototype.getClass = function() 
{
    return this.constructor.name;
}


/**
 *
 */

CswModel.prototype.getProperties = function() 
{
    var properties = {};

    for(var propertyName in this) 
        if(this.hasOwnProperty(propertyName)) 
            properties[propertyName] = this[propertyName];

    return properties;
}


/**
 *
 */

CswModel.prototype.getPropertiesValue = function() 
{
    var properties = {};

    for(var propertyName in this) 
        if(this.hasOwnProperty(propertyName)) 
            properties[propertyName] = this[propertyName].value;

    return properties;
}
