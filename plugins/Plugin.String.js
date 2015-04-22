function CswString(){ }


CswString.prototype.basename = function(path)
{
	return path.split('/').reverse()[0];
}


var string = new CswString();