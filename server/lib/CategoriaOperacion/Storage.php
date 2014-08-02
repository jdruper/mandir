<?php
require_once  (dirname(dirname(__FILE__))."/Common/connectDB.php");
class CategoriaOperacion_Storage {
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
		$categorias = array();		
		
		//$user = get_user_data();
		//$userId = $user['userid'];		

		$statement = self::$_db->prepare("SET CHARACTER SET utf8");
        $statement->execute();

		$statement = self::$_db->prepare("SELECT id, 
												 nombre, 
												 descripcion, 
												 id_categoria_padre 												 
										  FROM categorias_operacion 
										  ORDER BY id");
        $statement->execute();

        if($statement->error)
            {
                die("Database query failed: " . $statement->error);
            }

        $statement->bind_result($id, 
        						$nombre, 
        						$descripcion, 
        						$id_categoria_padre);
        while($statement->fetch())
            {            	
            	$categoria = array('id' => $id,
                			 'nombre' => $nombre,
                		     'descripcion' => $descripcion,
                		     'id_categoria_padre' => $id_categoria_padre
                		     );
                array_push($categorias, $categoria);
            }

        closeDB(self::$_db);        
		return array_values($categorias);
	}
	public static function create($data) {
		self::_init();
		self::$_collection->insert($data);
		return $data; // _id will be added by the insert and included in the return value.
	}
	public static function findOne($id) {
		self::_init();
		return self::$_collection->findOne( array( '_id' => new MongoId($id) ) );
	}
	public static function update($id,$data) {
		self::_init();
		unset($data['_id']); // Don't try to rewrite the id
		$data['updated'] = new MongoDate(); // Auto add an updated timestamp
		self::$_collection->update( array( '_id' => new MongoId($id) ) , $data );
		return self::findOne($id);
	}
	public static function remove($id) {
		self::_init();
		self::$_collection->remove( array( '_id' => new MongoId($id) ) );
		return true;
	}
}
