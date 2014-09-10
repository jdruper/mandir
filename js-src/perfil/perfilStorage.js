perfilService = angular.module('perfil.service', ['ngResource']);
perfilService.factory('perfilStorage',
	[
		'$resource',
		function($resource) {
			return $resource('perfil/:id', {id:'@id'}, {
				'get':  {method:'GET'},
				'save': {method:'PUT'}
			});
		}
	]
).factory('perfilList',
	[
		'$resource',
		function($resource) {
			return $resource('perfiles');
		}
	]
);
