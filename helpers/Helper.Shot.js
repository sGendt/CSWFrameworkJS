function Shot(cbSuccess, cbError)
{
	this.img = null;
	this.error =  null;

	this.cbSuccess = cbSuccess;
	this.cbError = cbError;

	this.init();
}

Shot.prototype.init = function()
{
	var that = this;
	
	navigator.camera.getPicture
	(
		function(imageDatas)
		{
			that.onShotSuccess(imageDatas);
		}, 
		function(error)
		{
			that.onShotError(error);
		}, 
		{ 
			saveToPhotoAlbum: true,
			correctOrientation: true,
			destinationType: Camera.DestinationType.DATA_URL
		}
	);
}

Shot.prototype.onShotSuccess = function(imageDatas)
{
	/*npath = imageData.replace("file://localhost",'');
	var path = imageData.replace("file://localhost",'');*/

	this.img = imageDatas;
	this.cbSuccess(imageDatas);
}

Shot.prototype.onShotError = function(error)
{
	this.error = error;
	this.cbError(error);
}