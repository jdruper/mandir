<?php
require_once  (dirname(dirname(__FILE__))."/Common/connectDB.php");

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


		$statement = self::$_db->prepare("SELECT UIR.role_id, U.id
										  FROM users_in_roles UIR INNER JOIN users U on UIR.user_id = U.id
										  WHERE U.username=? AND U.password=?");

		$statement->bind_param("ss", $data['username'],$data['password']);		
        $statement->execute();               

        if($statement->error)
            {
                var_dump("Database query failed: " . $statement->error);
                return false;
            }

        $statement->bind_result($roleId, $userId);
        while($statement->fetch())
            {            	            	
            	$key = bin2hex(openssl_random_pseudo_bytes(10));
				$token = array(
							   "userid" => $userId,
							   "username" => $data['username'],
		    				   "role" => $roleId		    
							  );

				$jwt = JWT::encode($token, $key);

				$_SESSION['userid'] = array('key'=>$key, 'token'=>$jwt);
            }                    
        

       	closeDB(self::$_db);
				
		//$decoded = JWT::decode($jwt, $key);
		//var_dump($decoded);       		   
		return array('auth'=>$jwt, 'username' => $data['username'], 'roleid' => $roleId);
	}	
}
	