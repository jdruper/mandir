aplicacionController = angular.module('aplicacion.controller',['aplicacion.service']);
aplicacionController.controller('aplicacionCtrl', ['$scope', '$routeParams','$location', '$upload','aplicacionStorage', function($scope,$routeParams,$location,$upload,aplicacionStorage) {
	
	$scope.isUploading = false;
	$scope.mensaje = '';

	// If loaded with an id, load that model.
	if($routeParams.id){
		$scope.aplicacion = aplicacionStorage.get({id:$routeParams.id},function(){});
	} else {
		$scope.aplicacion = new aplicacionStorage;
	}
	$scope.doSave = function() {
		$scope.saving = true;
		$scope.aplicacion.$save(function(){ 
			$scope.saving = false;
			//$location.path('#/aplicacion/' + $scope.aplicacion.id); // Redirect to detail view after a save
			$location.path('/aplicaciones'); // Redirect to detail view after a save
		});
	}
	$scope.doRemove = function() {
		$scope.aplicacion.$remove(function(){
			$location.path('/aplicaciones');
		});
	}

	 $scope.onFileSelect = function($files) {
	    //$files: an array of files selected, each file has name, size, and type.
	    for (var i = 0; i < $files.length; i++) {
	      var file = $files[i];
	      $scope.upload = $upload.upload({
	        url: 'server/lib/Common/upload.php', //upload.php script, node.js route, or servlet url
	        // method: POST or PUT,
	        // headers: {'headerKey': 'headerValue'},
	        // withCredentials: true,
	        data: {myObj: $scope.imagen_url},
	        file: file,
	        // file: $files, //upload multiple files, this feature only works in HTML5 FromData browsers
	        /* set file formData name for 'Content-Desposition' header. Default: 'file' */
	        //fileFormDataName: myFile, //OR for HTML5 multiple upload only a list: ['name1', 'name2', ...]
	        /* customize how data is added to formData. See #40#issuecomment-28612000 for example */
	        //formDataAppender: function(formData, key, val){} //#40#issuecomment-28612000
	      }).progress(function(evt) {
	      	$scope.isUploading = true;
	        console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
	        $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
	      }).success(function(data, status, headers, config) {
	        // file is uploaded successfully
	        console.log(data);
	        if(data.indexOf('exists') != -1){	        	
	        	$scope.mensaje = 'Un archivo con el mismo nombre ya existe en nuestro sistema.'
	        }
	        else if(data.indexOf('error') != -1){
	        	$scope.mensaje = 'Ocurri&oacute un error con el archivo, intente de nuevo.'
	        }
	        else if(data == 'Invalid file'){
	        	$scope.mensaje = 'El tipo de archivo es inválido o el tamaño excede el límite permitido (100kb).';
	        }
	        else{
	        	$scope.mensaje = 'El archivo se ha cargado con éxito. Debe guardar sus cambios para que tegan efecto.'
	        	$scope.aplicacion.img_url = 'http://administracion.yoga-mandir.com/upload'
	        	$scope.aplicacion.imagen_original = data;
	        	data = 'thumb_'+data.replace(/ /g,'_');
	        	$scope.aplicacion.imagen_thumbnail = data;
	        	
	        }
	        $scope.isUploading = false;	        

	      });
	      //.error(...)
	      //.then(success, error, progress); 
	    }
  	};
}]);
