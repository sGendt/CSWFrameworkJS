function signin($scope, $window, $location)
{
	$scope.login = '';
	$scope.password = '';
	$scope.avatar = 'img/icon-login.png';

	var params = $location.search();

	if(typeof params.login != 'undefined')
	{
		$scope.login = params.login;

		var user = new User();
		user.load(params.id, onLoadUser);
	}

	function onLoadUser()
	{
	    $scope.avatar = user.avatar.value;
		$scope.$apply();
	}

	$scope.signin = function()
	{
		$('.loader').show();

		if
        (
            $scope.login == '' ||
            $scope.password == ''
        )
        {
            $('.loader').hide();
            popup.show('Tous les champs doivent être rempli', 'error');

            return;
        }

		var user = new User();
		user.signin($scope.login, $scope.password, onLoginSuccess, onLoginError);
	}

	function onLoginSuccess(datas)
	{
		$('.loader').hide();

		console.log(datas);

		if(datas.rows.length > 0)
		{
			$('body').attr('data-session', datas.results[0].id);
			$window.location.href = '#/home';
		}
		else
			popup.show('Nous n\'avons pas réussi à vous identifer', 'error');
	}

	function onLoginError(error)
	{
		$('.loader').hide();
		alert('Erreur: ' + error);	
	}
}