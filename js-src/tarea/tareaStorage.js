tareaService = angular.module('tarea.service', ['ngResource']);
tareaService.factory('tareaStorage',
	[
		'$resource',
		function($resource) {
			return $resource('/tarea/:id', {id:'@id'}, {
				'get':  {method:'GET'},
				'save': {method:'PUT'}
			});
		}
	]
);
tareaService.factory('tareaList',
	[
		'$resource',
		function($resource) {
			return $resource('/tareas');
		}
	]
);
