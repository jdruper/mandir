var mandirAdminApp = angular.module(
	'mandirAdmin',
	[
    'ngRoute',
		'aplicacion',
		'authentication'
		//ModuleInsertReference
	]
);

mandirAdminApp.factory('authInterceptor', [ '$rootScope','$q','$window', function ($rootScope, $q, $window) {
  return {
    request: function (config) {
      config.headers = config.headers || {};
      if ($window.sessionStorage.token) {
        config.headers.Authorization = $window.sessionStorage.token;
      }      
      return config;
    },
    response: function (response) {
      if (response.status === 401) {
        // handle the case where the user is not authenticated
      }
      return response || $q.when(response);
    }
  };
}]);

mandirAdminApp.config([
	'$routeProvider', '$httpProvider',
	function($routeProvider, $httpProvider) {
        $routeProvider.
      when("/", {templateUrl: '/partials/index.html', isFree: true}).
			when('/aplicaciones', {templateUrl: 'partials/aplicacion/list.html', controller: 'aplicacionListCtrl', isFree: false}).
			when('/aplicacion/create', {templateUrl: 'partials/aplicacion/create.html', controller: 'aplicacionCtrl', isFree: false}).
			when('/aplicacion/:id', {templateUrl: 'partials/aplicacion/detail.html', controller: 'aplicacionCtrl', isFree: false}).
			when('/aplicacion/:id/edit', {templateUrl: 'partials/aplicacion/edit.html', controller: 'aplicacionCtrl', isFree: false}).
			when("/login", {templateUrl: '/partials/login.html', controller: 'authenticationCtrl', isFree: true}); //RouteInsertReference

		$httpProvider.interceptors.push('authInterceptor');
	}
]);
	

