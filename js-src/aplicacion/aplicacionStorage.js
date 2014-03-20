aplicacionService = angular.module('aplicacion.service', ['ngResource']);
aplicacionService.factory('aplicacionStorage',
	[
		'$resource',
		function($resource) {
			return $resource('/aplicacion/:id', {id:'@id'}, {
				'get':  {method:'GET'},
				'save': {method:'PUT'}
			});
		}
	]
);
aplicacionService.factory('aplicacionList',
	[
		'$resource',
		function($resource) {
			return $resource('/aplicaciones');
		}
	]
);
