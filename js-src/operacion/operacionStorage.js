operacionService = angular.module('operacion.service', ['ngResource']);
operacionService.factory('operacionStorage',
	[
		'$resource',
		function($resource) {
			return $resource('/operacion/:id', {id:'@_id.$id'}, {
				'get':  {method:'GET'},
				'save': {method:'PUT'}
			});
		}
	]
);
operacionService.factory('categoriaOperacionList',
	[
		'$resource',
		function($resource) {
			return $resource('/categorias_operacion');
		}
	]
);
