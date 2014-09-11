<?php
require_once  (dirname(dirname(__FILE__))."/Common/connectDB.php");
require_once (dirname(dirname(__FILE__))."/Common/swiftmailer-master/lib/swift_required.php");

class Authentication_Storage {
	protected static $_db = NULL;
	protected static $_collection = NULL;		
	
	protected static function _init() {
		if(!self::$_db) {			
			self::$_db = getDB();
		}		
	}
	
	public static function authorize($data) {
		self::_init();		
		
		$jwt = NULL;		

		$statement = self::$_db->prepare("SET CHARACTER SET utf8");
        $statement->execute();


		$statement = self::$_db->prepare("SELECT UIR.role_id, U.id, P.id AS id_perfil, P.img_url
										  FROM users_in_roles UIR INNER JOIN users U ON UIR.user_id = U.id
										  INNER JOIN perfiles P ON U.id = P.id_usuario
										  WHERE U.username=? AND U.password=?");

		$statement->bind_param("ss", $data['username'],$data['password']);		

        $statement->execute();               

        if($statement->error)
            {
                var_dump("Database query failed: " . $statement->error);
                return false;
            }

        $statement->bind_result($roleId, $userId, $id_perfil, $img_url);
        while($statement->fetch())
            {            	            	
            	$key = bin2hex(openssl_random_pseudo_bytes(10));
				$token = array(
							   "userid" => $userId,
							   "username" => $data['username'],
		    				   "role" => $roleId,
		    				   "id_perfil" => $id_perfil
							  );

				$jwt = JWT::encode($token, $key);

				$_SESSION['userid'] = array('key'=>$key, 'token'=>$jwt);
            }                    
        

       	closeDB(self::$_db);
				
		//$decoded = JWT::decode($jwt, $key);
		//var_dump($decoded);       		   
		return array('auth'=>$jwt, 'username' => $data['username'], 'roleid' => $roleId, 'userid' => $userId, 'id_perfil'=> $id_perfil, 'img_url'=>$img_url);
	}	

	public static function changePassword($data) {
		self::_init();

		$resultado = true;

		$statement = self::$_db->prepare("SET CHARACTER SET utf8");
        $statement->execute();

        $statement = self::$_db->prepare("SELECT email
										  FROM perfiles
										  WHERE email=?");
		
        $statement->bind_param("s", $data["email"]);
        $statement->execute(); 

        if($statement->error)
            {
                var_dump("Database query failed: " . $statement->error);
                $resultado = null;
            };

        $statement->bind_result($email);


        if ($statement->fetch() === null) {

        	$resultado = false;

        } else {

        	$statement->close();

        	$newPass = bin2hex(openssl_random_pseudo_bytes(5));

	        $statement = self::$_db->prepare("UPDATE users
											  SET password=?
											  WHERE username=?");
			
	        $statement->bind_param("ss", $newPass, $data["email"]);

	        if ($statement->execute()) {

				$transport = Swift_SmtpTransport::newInstance('gator4043.hostgator.com', 465, "ssl")
				  ->setUsername('password@yoga-mandir.com')
				  ->setPassword('p@ssw0rd');

				$mailer = Swift_Mailer::newInstance($transport);

				$message = Swift_Message::newInstance('Recuparación de contraseña')
				  ->setFrom(array('password@yoga-mandir.com' => 'Yoga Mandir'))
				  ->setTo(array($data['email']))
				  ->setBody('Hola, su nueva contraseña es: '.$newPass);

				$result = $mailer->send($message);
        	} else {

        		$resultado = null;

        	}
        }

        closeDB(self::$_db);
        
        return array('isTrue'=>$resultado);
    }

	public static function getUsers() {
		self::_init();				

		$statement = self::$_db->prepare("SET CHARACTER SET utf8");
        $statement->execute();


		$statement = self::$_db->prepare("SELECT id, nombre
										  FROM users");
		
        $statement->execute();               

        if($statement->error)
            {
                var_dump("Database query failed: " . $statement->error);
                return false;
            }

        $statement->bind_result($userId, $nombre);
        $users = array();
        while($statement->fetch())
            {            	            	
            	
				$user = array(
							   "id" => $userId,
							   "nombre" => $nombre		    				   		   
							  );

				array_push($users, $user);
            }                    
        

       	closeDB(self::$_db);
				
		//$decoded = JWT::decode($jwt, $key);
		//var_dump($decoded);       		   
		return $users;
	}
}
	