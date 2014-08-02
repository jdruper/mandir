perfilListController = angular.module('perfilList.controller',['perfil.service']);
perfilListController.controller('perfilListCtrl', ['$scope', '$routeParams','perfilList', function($scope,$routeParams,perfilList) {
		$scope.perfiles = perfilList.query({},function(datos){			
			$(datos).each(function(i,el){				
				if(!el.region){
					el.region = '';
				}
				if(!el.certificaciones){
					el.certificaciones = '';
				}
			})
		});
}]);
