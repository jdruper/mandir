authenticationController = angular.module('authentication.controller',['authentication.service']);
authenticationController.controller('authenticationCtrl', ['$scope', '$routeParams', '$location','$window','UserService', 'authenticationStorage', function($scope,$routeParams,$location,$window, User, authenticationStorage) {		
		
	$scope.user = new authenticationStorage;		
	$scope.mensaje = '';
	$scope.username = User.getUser().username || $window.sessionStorage.username || '';

	$scope.login = function() {			
		$scope.user.$authorize(function(data){		 				 	
			if (data.auth != null) {
				// succefull login
				User.setLoggedIn(true);
				User.setUsername(data.username);								
				$window.sessionStorage.token = data.auth;
				$window.sessionStorage.username = data.username;
				$window.sessionStorage.roleid = data.roleid;
				$window.sessionStorage.loggedIn = true;
				$window.location.href = 'http://test.yoga-mandir.com';
				//$location.path('/aplicaciones'); // Redirect to detail view after a save
			}
			else {
				$scope.mensaje = 'Usuario o password incorrecto';
				User.isLogged = false;
				User.username = '';
				delete $window.sessionStorage.token;
				delete $window.sessionStorage.username;
				delete $window.sessionStorage.loggedIn;
				delete $window.sessionStorage.roleid;
			}

		});		
	}

	$scope.logout = function() {
		$scope.user.$logout(function(){		 				
				$window.location.href = 'http://test.yoga-mandir.com/';
		});	
	}
}]);
