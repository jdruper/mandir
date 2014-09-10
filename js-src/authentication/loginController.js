authenticationController = angular.module('login.controller',['authentication.service']);
authenticationController.controller('loginCtrl', ['$scope', '$routeParams', '$location','$window', '$modal', 'UserService', 'authenticationStorage', 'PasswordService', function($scope,$routeParams,$location,$window, $modal, User, authenticationStorage, PasswordService) {		
		
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

	$scope.open = function (size) {

	    var modalInstance = $modal.open({
	      templateUrl: '/partials/modals/olvidoPassword.html',
	      controller: 'changePasswordModalCtrl',
	      size: size,
	      backdrop: 'static',
	      resolve: {
	        items: function () {
	          return $scope.items;
	        }
	      }
	    });

	};
}]).controller('changePasswordModalCtrl', ['$scope', '$routeParams', '$location','$window', '$modal', '$modalInstance', 'UserService', 'authenticationStorage', 'PasswordService', '$timeout', function($scope,$routeParams,$location,$window, $modal, $modalInstance, User, authenticationStorage, PasswordService, $timeout) {  

	$scope.user2 = new PasswordService;
	$scope.mensaje = '';
	$scope.show = false;
	$scope.success = false;

	$scope.close = function() {  

		$modalInstance.dismiss();

	};   

	$scope.sendMail = function() {   

		$scope.user2.$changePassword(function(data) {
			if (data.isTrue == true) {
				$scope.show = false;
				$scope.successClase = 'fadeIn';
				$scope.success = true;
				$timeout(function() {
					$modalInstance.dismiss();
				}, 3000);
			}
			else {
				$scope.clase = 'fadeIn';
				$scope.show = true;
				$timeout(function() {
					$scope.clase = 'fadeOut';
				}, 2800);
				$timeout(function() {
					$scope.show = false;
				}, 3500);
			}
		});
	};   

}]);
