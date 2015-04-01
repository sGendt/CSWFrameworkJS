function home($scope)
{
	// take a shot

    $scope.shot = null;

    $('.shot').click
    (
    	function(e)
        {
    		e.preventDefault();

    		$('.loader').show();
    		var shot = new Shot(onShotSuccess, onShotError);
    	}
    );


    function onShotSuccess(imageDatas)
    {
        $scope.shot = 'data:image/jpeg;base64,' + imageDatas;
        var geolocation = new Geolocation(onGeolocationSuccess, onGeolocationError);
    }

    function onShotError()
    {
    	$('.loader').hide();
    	popup.show('Shot Error: ' + error);
    }

    function onGeolocationSuccess(position)
    {
        popup.show('Geolocation success');

        saveFile
        (
            position.coords.longitude,
            position.coords.latitude
        );
    }

    function onGeolocationError(error)
    {
        popup.show('Geolocation Error: ' + error);
        saveFile();
    }

    function saveFile(longitude, latitude)
    {
        var date = new Date();
        var time = date.getTime();
        var userId = $('body').attr('data-session');
       
        var picture = new Picture();
        picture.file.value = $scope.shot;
        picture.time.value = time;
        picture.userId.value = userId;

        if(typeof longitude != 'undefined')
            picture.longi.value = longitude;

        if(typeof latitude != 'undefined')
            picture.lati.value = latitude;

        picture.save(onSaveSuccess, onSaveError);
    }

    function onSaveSuccess()
    {
    	$('.loader').hide();
    	//alert('Prendre une autre photographie');
    }

    function onSaveError(error)
    {
    	$('.loader').hide();
    	popup.show('Save Error: ' + error);
    }
}