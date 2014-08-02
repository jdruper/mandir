operacionController = angular.module('operacion.controller',['operacion.service']);
operacionController.controller('operacionCtrl', ['$scope', '$routeParams','$location','operacionStorage', function($scope,$routeParams,$location,operacionStorage) {
	// If loaded with an id, load that model.
	
	if($routeParams.id){
		$scope.operacion = operacionStorage.get({id:$routeParams.id},function(){});
	} else {
		$scope.operacion = new operacionStorage;
	}
	$scope.doSave = function() {
		$scope.saving = true;
		$scope.operacion.$save(function(){ 
			$scope.saving = false;
			$location.path('/operacion/' + $scope.operacion._id.$id); // Redirect to detail view after a save
		});
	}
	$scope.doRemove = function() {
		$scope.operacion.$remove(function(){
			$location.path('/operaciones');
		});
	}
}]);
