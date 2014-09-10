var mandirAdminApp = angular.module(
	'mandirAdmin',
	[    
    'ngRoute',
		'aplicacion',
		'authentication',
    'tarea',
    'operacion',
    'perfil',
    'ui.bootstrap',
    'ui.bootstrap.tpls',
    'directives'
    // 'ngAnimate'
    // 'textAngular'
    // 'MessageCenterModule'
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
        $window.location.href = 'http://yoga-mandir.com/certificados/login'
      }
      return response || $q.when(response);
    }
  };
}]);

mandirAdminApp.config([
	'$routeProvider', '$httpProvider',
	function($routeProvider, $httpProvider) {
        $routeProvider.
      when("/", {templateUrl: 'partials/index.html', controller: 'perfilListCtrl', isFree: true}).
      when("/login", {templateUrl: 'partials/login.html', controller: 'authenticationCtrl', isFree: true}). //RouteInsertReference
			when('/aplicaciones', {templateUrl: 'partials/aplicacion/list.html', controller: 'aplicacionListCtrl', isFree: false}).
			when('/aplicacion/create', {templateUrl: 'partials/aplicacion/create.html', controller: 'aplicacionCtrl', isFree: false}).
			when('/aplicacion/:id', {templateUrl: 'partials/aplicacion/detail.html', controller: 'aplicacionCtrl', isFree: false}).
			when('/aplicacion/:id/edit', {templateUrl: 'partials/aplicacion/edit.html', controller: 'aplicacionCtrl', isFree: false}).
      when('/tareas', {templateUrl: 'partials/tarea/list.html', controller: 'tareaListCtrl', isFree: false}).
      when('/tarea/create', {templateUrl: 'partials/tarea/create.html', controller: 'tareaCtrl', isFree: false}).
      when('/tarea/:id', {templateUrl: 'partials/tarea/detail.html', controller: 'tareaCtrl', isFree: false}).
      when('/tarea/:id/edit', {templateUrl: 'partials/tarea/edit.html', controller: 'tareaCtrl', isFree: false}).
      when('/operaciones', {templateUrl: 'partials/operacion/list.html', controller: 'operacionListCtrl', isFree: false}).
      when('/perfil/:id', {templateUrl: 'partials/perfil/detail.html', controller: 'perfilCtrl', isFree: false}).
      when('/perfil/:id/edit', {templateUrl: 'partials/perfil/edit.html', controller: 'perfilCtrl', isFree: false});      

		$httpProvider.interceptors.push('authInterceptor');
	}
]);
	

