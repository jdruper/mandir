aplicacionListController = angular.module('aplicacionList.controller',['aplicacion.service']);
aplicacionListController.controller('aplicacionListCtrl', ['$scope', '$rootScope', '$routeParams','aplicacionList', function($scope,$rootScope,$routeParams,aplicacionList) {
		$rootScope.mensaje = '';
		$scope.aplicaciones = aplicacionList.query({},function(){});
		$scope.estado = 'Aprobado';
}]);
