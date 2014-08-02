tareaController = angular.module('tarea.controller',['tarea.service','authentication.service']);
tareaController.controller('tareaCtrl', ['$scope','$rootScope', '$routeParams','$location','$window','tareaStorage','authenticationStorage', function($scope,$rootScope,$routeParams,$location,$window,tareaStorage,authenticationStorage) {
	// If loaded with an id, load that model.
	$scope.estado_edit = false;
	$scope.isAdmin = ($window.sessionStorage.roleid == 1);
	$scope.user_id = $window.sessionStorage.userid;
	$rootScope.mensaje = '';

	if($routeParams.id){
		$scope.tarea = tareaStorage.get({id:$routeParams.id},function(){

			var estado_actual = $location.search()['estado'];
	
			if(estado_actual){
				$scope.estado_edit = true;
				if(estado_actual == 'Pendiente'){
					$scope.tarea.estado = 'En Progreso';
					$rootScope.mensaje = 'El estado de su tarea ha cambiado a En Progreso presione Guardar para mantener el cambio';
					$rootScope.tipo_mensaje = 'information';
				}
				else if(estado_actual == 'En Progreso'){
					$scope.tarea.estado = 'Finalizada';
					$rootScope.mensaje = 'El estado de su tarea ha cambiado a Finalizado agregue un comentario y presione Guardar para mantener el cambio';
					$rootScope.tipo_mensaje = 'information';
				}
			}
		});
	} else {
		$scope.tarea = new tareaStorage;
		$scope.tarea.id_usuario_responsable = 0;
		$scope.tarea.prioridad = 'Alta';
		$scope.tarea.estado = 'Pendiente';
	}

	$scope.usuarios = authenticationStorage.get_users(null,function(){});

	$scope.doSave = function() {
		$scope.saving = true;
		$scope.tarea.$save(function(){ 
			$scope.saving = false;
			$location.path('/tareas'); // Redirect to detail view after a save
		});
	}
	$scope.doRemove = function() {
		$scope.tarea.$remove(function(){
			$location.path('/tareas');
		});
	}
}]);
	