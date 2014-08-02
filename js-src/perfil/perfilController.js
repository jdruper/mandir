perfilController = angular.module('perfil.controller',['perfil.service']);
perfilController.controller('perfilCtrl', ['$scope', '$routeParams','$location', '$window','perfilStorage', '$upload', function($scope,$routeParams,$location,$window,perfilStorage,$upload) {
	// If loaded with an id, load that model.
	$scope.pwmatch = false;
	$scope.mensaje = '';
	$scope.mensaje_error = '';
	$scope.passwordMatch = true;

	if($routeParams.id){
		$scope.perfil = perfilStorage.get({id:$routeParams.id},
			function(){
				if(!$scope.perfil.img_url){
					$scope.perfil.img_url = '';
					$scope.perfil.prettyPhoto = '';					
				}
				else{
					$scope.perfil.prettyPhoto = 'prettyPhoto[gallery]';
				}
				if(!$scope.perfil.img_url_pose_1){
					$scope.perfil.img_url_pose_1 = '';
					$scope.perfil.prettyPhoto1 = '';					
				}
				else{
					$scope.perfil.prettyPhoto1 = 'prettyPhoto[gallery]';
				}
				if(!$scope.perfil.img_url_pose_2){
					$scope.perfil.img_url_pose_2 = '';
					$scope.perfil.prettyPhoto2 = '';					
				}
				else{
					$scope.perfil.prettyPhoto2 = 'prettyPhoto[gallery]';
				}

				if(!$scope.perfil.img_url_pose_3){
					$scope.perfil.img_url_pose_3 = '';
					$scope.perfil.prettyPhoto3 = '';					
				}
				else{
					$scope.perfil.prettyPhoto3 = 'prettyPhoto[gallery]';
				}
				if(!$scope.perfil.certificaciones){
					$scope.perfil.certificaciones = '';
				}
				if(!$scope.perfil.facebook){
					$scope.perfil.facebook = '#';
				}
				if(!$scope.perfil.sitio_web){
					$scope.perfil.sitio_web = '#';
				}
			}
		);
	} else {
		$location.path('/perfil/'+$window.sessionStorage.id_perfil+'/edit');
		//$scope.perfil = new perfilStorage;
	}
	
	$scope.doSave = function() {
		$scope.saving = true;
		$scope.perfil.$save(function(){ 
			$scope.saving = false;			
			$scope.mensaje = 'Sus datos han sido guardados.';
			//$location.path('/perfil/' + $scope.perfil.id); // Redirect to detail view after a save
		});
	}
	$scope.doRemove = function() {
		$scope.perfil.$remove(function(){
			$location.path('/perfiles');
		});
	}

	$scope.onFileSelect = function($files, img_url_number) {
	    //$files: an array of files selected, each file has name, size, and type.
	    //for (var i = 0; i < $files.length; i++) {
	      $scope.isUploading = img_url_number;
	      var file = $files[0];	      
	      //var fileName = file.name.split('.');
	      //file.name = $window.sessionStorage.id_perfil+fileName[fileName.length-1];
	      $scope.upload = $upload.upload({
	        url: 'server/lib/Common/upload.php', //upload.php script, node.js route, or servlet url
	        // method: POST or PUT,
	        // headers: {'headerKey': 'headerValue'},
	        // withCredentials: true,
	        //data: {myObj: $scope.imagen_url},
	        file: file,
	        // file: $files, //upload multiple files, this feature only works in HTML5 FromData browsers
	        /* set file formData name for 'Content-Desposition' header. Default: 'file' */
	        //fileFormDataName: myFile, //OR for HTML5 multiple upload only a list: ['name1', 'name2', ...]
	        /* customize how data is added to formData. See #40#issuecomment-28612000 for example */
	        //formDataAppender: function(formData, key, val){} //#40#issuecomment-28612000
	      }).progress(function(evt) {
	        console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
	        $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
	      }).success(function(data, status, headers, config) {
	        // file is uploaded successfully
	        console.log(data);
	        if(data.indexOf('exists') != -1){	        	
	        	$scope.mensaje_error = 'Un archivo con el mismo nombre ya existe en nuestro sistema.'
	        }
	        else if(data.indexOf('error') != -1){
	        	$scope.mensaje_error = 'Error con el archivo, intente de nuevo.'
	        }
	        else if(data == 'Invalid file'){
	        	$scope.mensaje_error = 'El tipo de archivo es inv&aacute;lido.';
	        }
	        else{
	        	console.log(data);
	        	$scope.mensaje = 'El archivo se ha cargado. Debe guardar sus cambios.';
	        	var url = 'http://yoga-mandir.com/certificados/archivos/'+data;
	        	
	        	if(img_url_number == 0){
	        		$scope.perfil.img_url = url;
	        	}
	        	else{
	        		$scope.perfil['img_url_pose_'+img_url_number] = url;
	        	}

	        	//$scope.aplicacion.imagen_original = data;
	        	//data = 'thumb_'+data.replace(/ /g,'_');
	        	//$scope.aplicacion.imagen_thumbnail = data;
	        	
	        }
	        $scope.isUploading = -1;	        
	      });
	      //.error(...)
	      //.then(success, error, progress); 
	    //} //end for
  	};
}]);

