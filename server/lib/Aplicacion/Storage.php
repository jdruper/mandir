<?php
require_once  (dirname(dirname(__FILE__))."/Common/connectDB.php");
class Aplicacion_Storage {
	protected static $_db = NULL;
	protected static $_collection = NULL;			
	
	protected static function _init() {
		if(check_token()){
			if(!self::$_db) {			
				self::$_db = getDB();
			}
		}
		else{
			Flight::redirect('http://test.mandir.com/login', 401);
		}		
	}
	public static function all() {
		self::_init();		
		$apps = array();		
		
		//$user = get_user_data();
		//$userId = $user['userid'];		

		$statement = self::$_db->prepare("SET CHARACTER SET utf8");
        $statement->execute();

		$statement = self::$_db->prepare("SELECT id, 
												 nombre, 
												 apellidos, 
												 correo_electronico, 
												 telefono_celular, 
												 estado, 
												 fecha_creacion 
										  FROM aplicaciones 
										  ORDER BY nombre");
        $statement->execute();

        if($statement->error)
            {
                die("Database query failed: " . $statement->error);
            }

        $statement->bind_result($id, 
        						$nombre, 
        						$apellidos, 
        						$correo_electronico, 
        						$telefono_celular, 
        						$estado,
        						$fecha_creacion);
        while($statement->fetch())
            {            	
            	$app = array('id' => $id,
                			 'nombre' => $nombre,
                		     'apellidos' => $apellidos,
                		     'correo_electronico' => $correo_electronico,
                		     'telefono_celular' => $telefono_celular,
                		     'estado' => $estado,
                		     'fecha_creacion'=> $fecha_creacion
                		     );
                array_push($apps, $app);
            }

        closeDB(self::$_db);        
		return array_values($apps);
	}
	public static function create($data) {
		self::_init();
		$user = get_user_data();
		$userId = $user['userId'];
		array_push($data, $userId);
		self::$_collection->insert($data);
		return $data; // _id will be added by the insert and included in the return value.
	}
	public static function findOne($id) {
		self::_init();
		//return array_values(iterator_to_array( self::$_collection->find() ) );		
		$apps = array();		
	
		$statement = self::$_db->prepare("SET CHARACTER SET utf8");
        $statement->execute();

		$statement = self::$_db->prepare("SELECT id, 												 
												 nombre, 
												 apellidos, 
												 cedula,
												 estado_civil,
												 nacionalidad,
												 correo_electronico, 
												 telefono_casa,
												 telefono_celular, 
												 direccion,
												 educacion_profesion,
												 estado_salud,
												 fuente,
												 frecuencia,
												 experiencia,
												 da_clases,
												 objetivos,
												 img_url,
												 fecha_nacimiento,
												 fuente_extra,
												 fecha_creacion,
												 estado,
												 imagen_thumbnail
										  FROM aplicaciones 
										  WHERE id=?
										  ORDER BY nombre");
		$statement->bind_param("i", $id);
        $statement->execute();

        if($statement->error)
            {
                var_dump("Database query failed: " . $statement->error);
            }

        $statement->bind_result($id,
								$nombre, 
								$apellidos, 
								$cedula,
								$estado_civil,
								$nacionalidad,
								$correo_electronico, 
								$telefono_casa,
								$telefono_celular, 
								$direccion,
								$educacion_profesion,
								$estado_salud,
								$fuente,
								$frecuencia,
								$experiencia,
								$da_clases,
								$objetivos,
								$img_url,
								$fecha_nacimiento,
								$fuente_extra,
								$fecha_creacion,
								$estado,
								$imagen_thumbnail);
        while($statement->fetch())
            {            	
            	$app = array('id' => $id,
                			 'nombre' => $nombre,
                		     'apellidos' => $apellidos,
                		     'cedula' => $cedula,
                		     'estado_civil' => $estado_civil,
							 'nacionalidad' => $nacionalidad,
                		     'correo_electronico' => $correo_electronico,
                		     'telefono_casa' => $telefono_casa,
                		     'telefono_celular' => $telefono_celular,
                		     'direccion' => $direccion,
							 'educacion_profesion' => $educacion_profesion,
							 'estado_salud' => $estado_salud,
							 'fuente' => $fuente,
							 'frecuencia' => $frecuencia,	
							 'experiencia' => $experiencia,
							 'da_clases' =>$da_clases,
							 'objetivos' =>$objetivos,
							 'img_url' =>$img_url,
							 'fecha_nacimiento' =>$fecha_nacimiento,
							 'fuente_extra' =>$fuente_extra,
							 'fecha_creacion' =>$fecha_creacion,
							 'estado' =>$estado,
							 'imagen_thumbnail' =>$imagen_thumbnail);                
            }                

		$app['estudios'] = self::findEstudios($id);            	
		closeDB(self::$_db);
		

		return $app;	
	}

	public static function findEstudios($id_aplicacion){		
		$statement = self::$_db->prepare("SELECT id, 												 
												 lugar, 
												 profesor, 
												 tiempo												 
										  FROM estudios_aplicacion 
										  WHERE id_aplicacion=?");
	

		$statement->bind_param("i", $id_aplicacion);		 
        $statement->execute();

        if($statement->error)
            {
                var_dump("Database query failed: " . $statement->error);
            }

        $statement->bind_result($id,
								$lugar, 
								$profesor, 						
								$tiempo								);
        $estudios = array();
        while($statement->fetch())
            {
            	$estudio = array('id' => $id,
                			 'lugar' => $lugar,
                		     'profesor' => $profesor,
                		     'tiempo' => $tiempo);                
            	array_push($estudios, $estudio);
            }		
        return $estudios;        
	}

	public static function update($id,$data) {
		self::_init();		

		$statement = self::$_db->prepare("SET CHARACTER SET utf8");
        $statement->execute();


		$statement = self::$_db->prepare("UPDATE aplicaciones
										  SET nombre = ?, 
											  apellidos = ?,
											  cedula = ?,
											  estado_civil = ?,
											  nacionalidad = ?,
											  correo_electronico = ?,
											  telefono_casa = ?,
											  telefono_celular = ?,
											  direccion = ?,
											  educacion_profesion = ?,
											  estado_salud = ?,
											  fuente = ?,
											  frecuencia = ?,
											  experiencia = ?,
											  da_clases = ?,
											  objetivos = ?,
											  fecha_nacimiento = ?,
											  estado = ?,
											  img_url = ?,
											  imagen_original = ?,
											  imagen_thumbnail = ?
										   WHERE id=?");

		$statement->bind_param("ssssssssssssssissssssi", $data['nombre'],
													   $data['apellidos'],
													   $data['cedula'],
													   $data['estado_civil'],
													   $data['nacionalidad'],
													   $data['correo_electronico'],
													   $data['telefono_casa'],
													   $data['telefono_celular'],
													   $data['direccion'],
													   $data['educacion_profesion'],
													   $data['estado_salud'],
													   $data['fuente'],
													   $data['frecuencia'],
													   $data['experiencia'],
													   $data['da_clases'],
													   $data['objetivos'],													   
													   $data['fecha_nacimiento'],
													   //$data['fuente_extra'],
													   $data['estado'],
													   $data['img_url'],
													   $data['imagen_original'],
													   $data['imagen_thumbnail'],
													   $id
														);
        $statement->execute();        

        if($statement->error)
            {
                var_dump("Database query failed: " . $statement->error);
                return false;
            }

        self::update_lugares($id,$data);

       	//closeDB();       	
		return true;
	}

	public static function update_lugares($id,$data) {		

		foreach ($data['estudios'] as $value) {

			$statement = self::$_db->prepare("UPDATE estudios_aplicacion
										  SET lugar = ?, 
											  profesor = ?,
											  tiempo = ?											  
										   WHERE id=?");

			$statement->bind_param("sssi", $value['lugar'],
													   $value['profesor'],
													   $value['tiempo'],
													   $value['id']
														);
    	    $statement->execute();

        	if($statement->error)
            	{
                	var_dump("Database query failed: " . $statement->error);
                	return false;
            	}
			
			}				

		return true;
	}

	public static function remove($id) {
		self::_init();		        
		$statement = self::$_db->prepare("DELETE FROM aplicaciones WHERE id=?");
		$statement->bind_param("i", $id);
        $statement->execute();

        $statement = self::$_db->prepare("DELETE FROM estudios_aplicacion WHERE id_aplicacion=?");
		$statement->bind_param("i", $id);
        $statement->execute();

        if($statement->error)
            {
                die("Database query failed: " . $statement->error);
                return false;
            }
        closeDB(self::$_db);        
		
		return true;
	}
}
