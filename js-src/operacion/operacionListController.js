operacionListController = angular.module('operacionList.controller',['operacion.service']);
operacionListController.controller('operacionListCtrl', ['$scope','$rootScope', '$routeParams','categoriaOperacionList', function($scope,$rootScope,$routeParams,categoriaOperacionList) {
		$rootScope.mensaje = '';
		$scope.categorias = categoriaOperacionList.query({},function(){});
}]);

