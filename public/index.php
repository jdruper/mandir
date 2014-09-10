<?php
require_once __DIR__ . '/server/lib/Authentication/Session.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/composer/PHP-JWT/Authentication/JWT.php';
require __DIR__ . '/composer/flight/Flight.php';
Flight::path( __DIR__ . '/server/lib' ); # Let the autoloaded know where to find class files.
Flight::set('flight.views.path', __DIR__ . '/server/views' );

if(!logged_on()){
	Flight::route('/', function(){	
		Flight::render('app-logout', array(), 'body');
		Flight::render('logout-layout', array());
	});

	Flight::route('/ingresar', function(){	
		Flight::render('login', array());		
	});
}
else{
	Flight::route('/', function(){
		Flight::render('app', array(), 'body');
		Flight::render('login-layout', array());
	});
}

Flight::route('POST /login', array('Authentication_Controller','authorize') );
Flight::route('PUT /login', array('Authentication_Controller','logout') ); 
Flight::route('GET /login', array('Authentication_Controller','getUsers') ); 
Flight::route('POST /authentication', array('Authentication_Controller','changePassword') );

Flight::route('GET /aplicaciones', array('Aplicacion_Controller','all') ); 
Flight::route('PUT /aplicacion', array('Aplicacion_Controller','create') ); 
Flight::route('GET /aplicacion/@id', array('Aplicacion_Controller','findOne') ); 
Flight::route('PUT /aplicacion/@id', array('Aplicacion_Controller','update') ); 
Flight::route('DELETE /aplicacion/@id', array('Aplicacion_Controller','remove') ); 

Flight::route('GET /tareas', array('Tarea_Controller','all') ); 
Flight::route('PUT /tarea', array('Tarea_Controller','create') ); 
Flight::route('GET /tarea/@id', array('Tarea_Controller','findOne') ); 
Flight::route('PUT /tarea/@id', array('Tarea_Controller','update') ); 
Flight::route('DELETE /tarea/@id', array('Tarea_Controller','remove') ); 
Flight::route('GET /categorias_operacion', array('CategoriaOperacion_Controller','all') ); 

Flight::route('GET /perfiles', array('Perfil_Controller','all') ); 
Flight::route('GET /perfil/@id', array('Perfil_Controller','findOne') ); 
Flight::route('PUT /perfil/@id', array('Perfil_Controller','update') ); 

//RouteInsertReference
Flight::start();
