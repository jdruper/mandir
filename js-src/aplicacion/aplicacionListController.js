aplicacionListController = angular.module('aplicacionList.controller',['aplicacion.service']);
aplicacionListController.controller('aplicacionListCtrl', ['$scope', '$routeParams','aplicacionList', function($scope,$routeParams,aplicacionList) {
		$scope.aplicaciones = aplicacionList.query({},function(){});
}]);
