function Geolocation(cbSuccess, cbError)
{
	this.position = null;
	this.error = null;

	this.cbSuccess = cbSuccess;
	this.cbError = cbError;

	this.init();
}

Geolocation.prototype.init = function()
{
	var that = this;

	navigator.geolocation.getCurrentPosition
	(
		function(position)
		{
			that.onPositionSuccess(position);
		},
		function(error)
		{
			that.onPositionError(error);
		},
		{ 
			timeout: 3000
		}
	);
}

/**

alert('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n');

*/

Geolocation.prototype.onPositionSuccess = function(position)
{
	this.position = position;
	this.cbSuccess(position);
}

Geolocation.prototype.onPositionError = function(error)
{
	this.error = error;
	this.cbError(error);
}