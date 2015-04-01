function signup($scope, $window)
{
	// Trips tools

    $scope.login = '';
    $scope.password = '';
    $scope.scanPassword = '';
    $scope.avatar = '';

    $('.selfshot').click(
    	function(){
    		var shot = new Shot(onSelfShotSuccess, onSelfShotError);
    	}
    );

    $scope.$watch
    (
        'avatar',
        function(nv, ov)
        {
            alert('old:'+ov+'\n new lengt:'+ nv.length + '\n new:' + nv);
        }
    );

    $scope.onSubmit = function()
    {
        $('.loader').show();

        if
        (
            $scope.login == '' ||
            $scope.password == '' ||
            $scope.scanPassword == ''
        )
        {
            $('.loader').hide();
            popup.show('Tous les champs doivent être rempli', 'error');

            return;
        }

        /*if($scope.avatar == '')
        {
            $('.loader').hide();
            popup.show('Prenez une photo', 'error');

            return;
        }*/

        if($scope.password != $scope.scanPassword)
        {
            $('.loader').hide();
            popup.show('Mots de passe différents', 'error');

            return;
        }



        var user = new User();
        user.exist($scope.login, onUserExistSuccess, onUserExistError);
    }


    /***/

    function onUserExistSuccess(datas)
    {
        console.log(datas);

        if(datas.rows.length == 0)
        {
            var user = new User();

            user.login.value = $scope.login;
            user.password.value = $scope.password;
            user.time.value = new Date().getTime();
            user.avatar.value = $scope.avatar;

            user.save(onSaveSuccess, onSaveError);
        }
        else
        {
            $('.loader').hide();
            popup.show('L\'utilisateur existe déjà', 'error');
        }
    }

    function onUserExistError(error)
    {
        $('.loader').hide();
        popup.show('Error: ' + error);
    }


    /***/

    function onSaveSuccess(datas)
    {
        $('body').attr('data-session', datas.insertId);
        $('.loader').hide();

        console.log(datas);

        $window.location.href = '#/home';
    }

    function onSaveError(error)
    {
        $('.loader').hide();
        popup.show('Error: ' + error);
    }

    /***/

    function onSelfShotSuccess(imageDatas)
    {
        $('.selfshot .img img').attr('src', 'data:image/jpeg;base64,' + imageDatas);
        $scope.avatar = 'data:image/jpeg;base64,' + imageDatas;

        $scope.$apply();

        //var geolocation = new Geolocation(onGeolocationSuccess, onGeolocationError);
    }

    function onSelfShotError(error)
    {
        popup.show('Error: ' + error);
    }

    /***/

    function onGeolocationSuccess(position)
    {
        console.log(position);
    }


    function onGeolocationError(error)
    {
        popup.show('code: '    + error.code    + '\n' + 'message: ' + error.message);
    }
}