<?php
require_once  (dirname(dirname(__FILE__))."/Common/connectDB.php");
require_once  (dirname(dirname(__FILE__))."/Authentication/Session.php");
class Perfil_Storage {
	protected static $_db = NULL;
	protected static $_collection = NULL;

	protected static function _init() {
		if(check_token()){
			if(!self::$_db) {			
				self::$_db = getDB();
			}
		}
		else{			
			Flight::redirect('http://yoga-mandir.com/certificados/#/login', 401);
		}			
	}
	public static function all() {
		self::$_db = getDB();
		$perfiles = array();		
			
		$statement = self::$_db->prepare("SET CHARACTER SET utf8");
        $statement->execute();

		$statement = self::$_db->prepare("SELECT P.id,       											 
       											 P.email,
       											 P.nombre,
       											 P.apellidos,
       											 P.region,
       											 P.biografia,
       											 P.telefono_casa,
       											 P.telefono_celular,
       											 P.sitio_web,
       											 P.facebook,
       											 P.estado,
       											 P.img_url, 
       											 P.img_url_pose_1,
                		     					 P.img_url_pose_2,
                		     					 P.img_url_pose_3,
                		     					 P.certificaciones,
                                                 P.clases
										  FROM perfiles P
                                          WHERE P.estado = ?
                                          ORDER BY P.nombre");	        

        $estado = 'Activo';
        $statement->bind_param('s', $estado);
        $statement->execute();

        if($statement->error)
            {
                die("Database query failed: " . $statement->error);
            }

        $statement->bind_result($id, 
        						$email, 
        						$nombre,
        						$apellidos, 
        						$region,         						
        						$biografia,
        						$telefono_casa,
        						$telefono_celular,
        						$sitio_web,
        						$facebook,
        						$estado,
        						$img_url,
        						$img_url_pose_1,
                		     	$img_url_pose_2,
                		     	$img_url_pose_3,
                		     	$certificaciones,
                                $clases);

        while($statement->fetch())
            {            	
            	$perfil = array('id' => $id,
                			 'email' => $email,
                		     'nombre' => $nombre,
                		     'apellidos' => $apellidos,
                		     'region' => $region,                		     
                		     'biografia'=> $biografia,
                		     'telefono_casa'=> $telefono_casa,
                		     'telefono_celular'=> $telefono_celular,
                		     'sitio_web'=> $sitio_web,
                		     'facebook'=> $facebook,
                		     'estado'=> $estado,
                		     'img_url' => $img_url,
                		     'img_url_pose_1' => $img_url_pose_1,
                		     'img_url_pose_2' => $img_url_pose_2,
                		     'img_url_pose_3' => $img_url_pose_3,
                		     'certificaciones' => $certificaciones,
                             'nombre_completo' => $nombre. ' ' . $apellidos,
                             'clases' => $clases
                		     );                
                array_push($perfiles, $perfil);
            }

        closeDB(self::$_db);        
		return array_values($perfiles);
	}
	public static function create($data) {
		self::_init();
		self::$_collection->insert($data);
		return $data; // _id will be added by the insert and included in the return value.
	}
	public static function findOne($id) {
		self::$_db = getDB();
        if(logged_on()){
    		$user = get_user_data();
    		if($user['id_perfil'] != $id){
    			$id = $user['id_perfil'];
    		}
        }

		$statement = self::$_db->prepare("SET CHARACTER SET utf8");
        $statement->execute();
        
       	$statement = self::$_db->prepare("SELECT P.id,       											 
       											 P.email,
       											 P.nombre,
       											 P.apellidos,
       											 P.region,
       											 P.biografia,
       											 P.telefono_casa,
       											 P.telefono_celular,
       											 P.sitio_web,
       											 P.facebook,
       											 P.estado,
       											 P.img_url, 
       											 P.img_url_pose_1,
                		     					 P.img_url_pose_2,
                		     					 P.img_url_pose_3,
                		     					 P.certificaciones,
                                                 P.clases
										  FROM perfiles P
										  WHERE P.id = ?");											  
        
        $statement->bind_param('i', $id);
        
        $statement->execute();

        if($statement->error)
            {
                die("Database query failed: " . $statement->error);
            }

        $statement->bind_result($id, 
        						$email, 
        						$nombre,
        						$apellidos, 
        						$region,         						
        						$biografia,
        						$telefono_casa,
        						$telefono_celular,
        						$sitio_web,
        						$facebook,
        						$estado,
        						$img_url,
        						$img_url_pose_1,
                		     	$img_url_pose_2,
                		     	$img_url_pose_3,
                		     	$certificaciones,
                                $clases);

        while($statement->fetch())
            {            	
            	$perfil = array('id' => $id,
                			 'email' => $email,
                		     'nombre' => $nombre,
                		     'apellidos' => $apellidos,
                		     'region' => $region,                		     
                		     'biografia'=> $biografia,
                		     'telefono_casa'=> $telefono_casa,
                		     'telefono_celular'=> $telefono_celular,
                		     'sitio_web'=> $sitio_web,
                		     'facebook'=> $facebook,
                		     'estado'=> $estado,
                		     'img_url' => $img_url,
                		     'img_url_pose_1' => $img_url_pose_1,
                		     'img_url_pose_2' => $img_url_pose_2,
                		     'img_url_pose_3' => $img_url_pose_3,
                		     'certificaciones' => $certificaciones,
                             'nombre_completo' => $nombre. ' ' . $apellidos,
                             'clases' => $clases
                		     );                
            }

        closeDB(self::$_db);        
		return $perfil;
	}
	public static function update($id,$data) {
		self::_init();		

		$statement = self::$_db->prepare("SET CHARACTER SET utf8");
        $statement->execute();      
		
				
		$statement = self::$_db->prepare("UPDATE perfiles SET email = ?, 
			               									 nombre = ?, 
			               									 apellidos = ?,
			               									 region = ?,			               									 			               									 
			               									 biografia = ?,
			               									 telefono_casa = ?,
			               									 telefono_celular = ?,
			               									 sitio_web = ?,
			               									 facebook = ?,
			               									 estado = ?,
			               									 img_url = ?,
			               									 img_url_pose_1 = ?,
                		     								 img_url_pose_2 = ?,
                		     								 img_url_pose_3= ?,
                		     								 certificaciones= ?,
                                                             clases = ?
			               				  WHERE id = ?");

		$statement->bind_param("ssssssssssssssssi", $data['email'],
										  $data['nombre'],
										  $data['apellidos'],
										  $data['region'],										  										  
										  $data['biografia'],
										  $data['telefono_casa'],
										  $data['telefono_celular'],
										  $data['sitio_web'],
										  $data['facebook'],
										  $data['estado'],
										  $data['img_url'],
										  $data['img_url_pose_1'],
										  $data['img_url_pose_2'],
										  $data['img_url_pose_3'],
										  $data['certificaciones'],
                                          $data['clases'],
										  $id);
        $statement->execute();           


        if($data['password'] != ''){
        	self::updateUserData($data['email'], $data['password']);
        }

        if($statement->error)
            {
                var_dump("Database query failed: " . $statement->error);
                return false;
            }
        

       	closeDB(self::$_db);
		return $data;
	}


	public static function updateUserData($email, $password){
		$user = get_user_data();

		$statement = self::$_db->prepare("SET CHARACTER SET utf8");
        $statement->execute();      
		
				
		$statement = self::$_db->prepare("UPDATE users SET username=?,
														   password = ? 			               									 
			               				  WHERE id = ?");


		$statement->bind_param("ssi", $email, 
									  $password,										  
									  $user['userid']);
        $statement->execute();           
	}


	public static function remove($id) {
		self::_init();
		self::$_collection->remove( array( '_id' => new MongoId($id) ) );
		return true;
	}
}
