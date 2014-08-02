authenticationController = angular.module('authentication.controller',['authentication.service']);
authenticationController.controller('authenticationCtrl', ['$scope', '$routeParams', '$location','$window','UserService', 'authenticationStorage', function($scope,$routeParams,$location,$window, User, authenticationStorage) {		
		
	$scope.user = new authenticationStorage;		
	$scope.mensaje = '';
	$scope.username = User.getUser().username || $window.sessionStorage.username;
	$scope.img_url = $window.sessionStorage.img_url || 'img/avatar/avatar.jpg';

	if(!$window.sessionStorage.token){
			$scope.user.$logout(function(){		 				
				$window.location.href = 'http://yoga-mandir.com/certificados/';
		});	
	}

	$scope.logout = function() {
		$scope.user.$logout(function(){		 				
				$window.location.href = 'http://yoga-mandir.com/certificados/';
		});	
	}

 	$scope.isActive = function(route) {
        return route === $location.path();
    }

}]);
