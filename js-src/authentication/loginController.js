authenticationController = angular.module('login.controller',['authentication.service']);
authenticationController.controller('loginCtrl', ['$scope', '$routeParams', '$location','$window','UserService', 'authenticationStorage', function($scope,$routeParams,$location,$window, User, authenticationStorage) {		
		
	$scope.user = new authenticationStorage;
	$scope.mensaje = '';

	$scope.login = function() {			
		$scope.user.$authorize(function(data){		 				 	
			console.log(data);
			if (data.auth != null) {
				// succefull login
				User.setLoggedIn(true);
				User.setUsername(data.username);								
				User.setUserId(data.userid);
				User.setRoleId(data.roleid);
				$window.sessionStorage.token = data.auth;
				$window.sessionStorage.username = data.username;
				$window.sessionStorage.roleid = data.roleid;
				$window.sessionStorage.loggedIn = true;
				$window.sessionStorage.userid = data.userid;
				$window.sessionStorage.id_perfil = data.id_perfil;
				$window.sessionStorage.img_url = data.img_url;
				$window.location.href = 'http://yoga-mandir.com/certificados/#/perfil/'+data.id_perfil+'/edit';
				// $location.path('/perfil/'+data.id_perfil); // Redirect to detail view after a save
			}
			else {
				$scope.mensaje = 'Usuario o password incorrecto';
				User.isLogged = false;
				User.username = '';
				delete $window.sessionStorage.token;
				delete $window.sessionStorage.username;
				delete $window.sessionStorage.loggedIn;
				delete $window.sessionStorage.roleid;
				delete $window.sessionStorage.userid;
			}

		});		
	}

}]);
