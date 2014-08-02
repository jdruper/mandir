tareaListController = angular.module('tareaList.controller',['tarea.service']);
tareaListController.controller('tareaListCtrl', ['$scope','$rootScope', '$routeParams','$window','tareaList', function($scope,$rootScope,$routeParams,$window,tareaList) {
		$scope.user_id = $window.sessionStorage.userid;
		$scope.isAdmin = ($window.sessionStorage.roleid == 1);

		$scope.tareas = tareaList.query({},function(){});
		$scope.query = '';
		$scope.tipo = {};		
		$scope.tipo_tarea = 'Mis Tareas';
		$scope.tipo.id_usuario_responsable = $scope.user_id;
		$scope.tipo.id_usuario_asigno = '';
		$scope.estado = 'Pendiente';

		$rootScope.mensaje = '';
		$rootScope.tipo_mensaje = '';

		$scope.setFilter = function(tipo){
			$scope.tipo.id_usuario_responsable = '';
			$scope.tipo.id_usuario_asigno = '';
			$scope.tipo_tarea = 'Todas';

			if(tipo === 'Responsable'){
				$scope.tipo.id_usuario_responsable = $scope.user_id;				
				$scope.tipo_tarea = 'Mis Tareas';
			}
			else if(tipo === 'Asigno'){				
				$scope.tipo.id_usuario_asigno = $scope.user_id;
				$scope.tipo_tarea = 'Asignadas por mi';
			}			
		}
}]);
