authenticationService = angular.module('authentication.service', ['ngResource']);
authenticationService.factory('authenticationStorage',
	[
		'$resource',
		function($resource) {			
			return $resource('login', null, {
				'authorize':  {method:'POST'},
				'logout':  {method:'PUT'},
				'get_users': {method:'GET', isArray:true}
			});
		}
	]
);

authenticationService.service('UserService', [function($window) {
	var self = this;
	this.user = {};
	this.setUsername = function(newName) {
	   self.user['username'] = newName;
	}
	this.setUserId = function(newId) {
	   self.user['user_id'] = newId;
	}
	this.setRoleId = function(newRoleId) {
	   self.user['role_id'] = newRoleId;
	}
	this.setLoggedIn = function(status) {
	   self.user['isLogged'] = status;
	}
	this.getUser = function() {
	   return self.user;	    
	}

}]);

