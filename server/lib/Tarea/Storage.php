<?php
require_once  (dirname(dirname(__FILE__))."/Common/connectDB.php");
require_once  (dirname(dirname(__FILE__))."/Authentication/Session.php");
class Tarea_Storage {
	protected static $_db = NULL;
	protected static $_collection = NULL;

	protected static function _init() {
	if(check_token()){
			if(!self::$_db) {			
				self::$_db = getDB();
			}
		}
		else{			
			Flight::redirect('http://profesores.yoga-mandir.com/#/login', 401);
		}		
	}

	public static function all() {
		self::_init();		
		$tareas = array();		
		
		$user = get_user_data();
		$userId = $user['userid'];		
		$userRoleId = $user['role'];

		$statement = self::$_db->prepare("SET CHARACTER SET utf8");
        $statement->execute();

        if($userRoleId == 1){        	
        	$statement = self::$_db->prepare("SELECT T.id, 
												 T.titulo, 
												 T.descripcion, 
												 T.prioridad, 
												 T.id_usuario_responsable, 
												 T.id_usuario_asigno, 
												 T.estado,
												 T.fecha_entrega,
												 U1.username,
												 U2.username
										  FROM tareas T INNER JOIN users U1 on T.id_usuario_responsable = U1.id
										  INNER JOIN users U2 on T.id_usuario_asigno = U2.id");										  
        }
        else{

        	$statement = self::$_db->prepare("SELECT T.id, 
												 T.titulo, 
												 T.descripcion, 
												 T.prioridad, 
												 T.id_usuario_responsable, 
												 T.id_usuario_asigno, 
												 T.estado,
												 T.fecha_entrega,
												 U1.username,
												 U2.username
										  FROM tareas T INNER JOIN users U1 on T.id_usuario_responsable = U1.id
										  INNER JOIN users U2 on T.id_usuario_asigno = U2.id
										  WHERE T.id_usuario_responsable = ? OR T.id_usuario_asigno = ?");										  

         	$statement->bind_param('ii', $userId, $userId);

        }

		
        $statement->execute();

        if($statement->error)
            {
                die("Database query failed: " . $statement->error);
            }

        $statement->bind_result($id, 
        						$titulo, 
        						$descripcion, 
        						$prioridad, 
        						$id_usuario_responsable, 
        						$id_usuario_asigno,
        						$estado,
        						$fecha_entrega,
        						$usuario_responsable,
        						$usuario_asigno);

        while($statement->fetch())
            {            	
            	$tarea = array('id' => $id,
                			 'titulo' => $titulo,
                		     'descripcion' => $descripcion,
                		     'prioridad' => $prioridad,
                		     'id_usuario_responsable' => $id_usuario_responsable,
                		     'id_usuario_asigno' => $id_usuario_asigno,
                		     'estado'=> $estado,
                		     'fecha_entrega' => $fecha_entrega,
                		     'usuario_responsable'=> $usuario_responsable,
                		     'usuario_asigno'=> $usuario_asigno
                		     );
                array_push($tareas, $tarea);
            }

        closeDB(self::$_db);        
		return array_values($tareas);
	}
	public static function create($data) {
		
		self::_init();		

		$statement = self::$_db->prepare("SET CHARACTER SET utf8");
        $statement->execute();

        $user = get_user_data();
		$userId = $user['userid'];
		$estado = 'Pendiente';

		if($data['id_usuario_responsable'] == 0){
			$users = Authentication_Storage::getUsers();

			foreach ($users as $key => $tempUser) {

				if($tempUser['id'] != $userId){

				$statement = self::$_db->prepare("INSERT INTO tareas (titulo, 
			               									  descripcion, 
			               									  prioridad,
			               									  id_usuario_responsable, 
			               									  id_usuario_asigno,
			               									  estado,
			               									  fecha_entrega)											
										  VALUES (?,?,?,?,?,?,?)");

						$statement->bind_param("sssiiss", $data['titulo'],
													   $data['descripcion'],
													   $data['prioridad'],
													   $tempUser['id'],
													   $userId,
													   $data['estado'],
													   $data['fecha_entrega']);
       		 $statement->execute();        
    		}
		  }
		}
		else{
		
		$statement = self::$_db->prepare("INSERT INTO tareas (titulo, 
			               									  descripcion, 
			               									  prioridad,
			               									  id_usuario_responsable, 
			               									  id_usuario_asigno,
			               									  estado,
			               									  fecha_entrega)											
										  VALUES (?,?,?,?,?,?,?)");

						$statement->bind_param("sssiiss", $data['titulo'],
													   $data['descripcion'],
													   $data['prioridad'],
													   $data['id_usuario_responsable'],
													   $userId,
													   $data['estado'],
													   $data['fecha_entrega']);
        $statement->execute();                

       }

        if($statement->error)
            {
                var_dump("Database query failed: " . $statement->error);
                return false;
            }
        

       	closeDB(self::$_db);
		return true;
	}
	public static function findOne($id) {
		self::_init();		
		$tareas = array();		
			

		$statement = self::$_db->prepare("SET CHARACTER SET utf8");
        $statement->execute();
        
       	$statement = self::$_db->prepare("SELECT T.id, 
												 T.titulo, 
												 T.descripcion, 
												 T.prioridad, 
												 T.id_usuario_responsable, 
												 T.id_usuario_asigno, 
												 T.estado,
												 T.fecha_entrega,
												 T.comentarios,
												 U1.username,
												 U2.username
										  FROM tareas T INNER JOIN users U1 on T.id_usuario_responsable = U1.id
										  INNER JOIN users U2 on T.id_usuario_asigno = U2.id 
										  WHERE T.id = ?");										  
        
        $statement->bind_param('i', $id);
        
        $statement->execute();

        if($statement->error)
            {
                die("Database query failed: " . $statement->error);
            }

        $statement->bind_result($id, 
        						$titulo, 
        						$descripcion, 
        						$prioridad, 
        						$id_usuario_responsable, 
        						$id_usuario_asigno,
        						$estado,
        						$fecha_entrega,
        						$comentarios,
        						$usuario_responsable,
        						$usuario_asigno);

        while($statement->fetch())
            {            	
            	$tarea = array('id' => $id,
                			 'titulo' => $titulo,
                		     'descripcion' => $descripcion,
                		     'prioridad' => $prioridad,
                		     'id_usuario_responsable' => $id_usuario_responsable,
                		     'id_usuario_asigno' => $id_usuario_asigno,
                		     'estado'=> $estado,
                		     'fecha_entrega'=> $fecha_entrega,
                		     'comentarios'=> $comentarios,
                		     'usuario_responsable'=> $usuario_responsable,
                		     'usuario_asigno'=> $usuario_asigno
                		     );                
            }

        closeDB(self::$_db);        
		return $tarea;
	}
	public static function update($id,$data) {
		self::_init();		

		$statement = self::$_db->prepare("SET CHARACTER SET utf8");
        $statement->execute();      
		
				
		$statement = self::$_db->prepare("UPDATE tareas SET titulo = ?, 
			               									 descripcion = ?, 
			               									 prioridad = ?,
			               									 id_usuario_responsable = ?,			               									 
			               									 estado = ?,
			               									 fecha_entrega = ?,
			               									 comentarios = ?
			               				  WHERE id = ?");

		$statement->bind_param("sssisssi", $data['titulo'],
										  $data['descripcion'],
										  $data['prioridad'],
										  $data['id_usuario_responsable'],										  
										  $data['estado'],
										  $data['fecha_entrega'],
										  $data['comentarios'],
										  $id);
        $statement->execute();           


        if($statement->error)
            {
                var_dump("Database query failed: " . $statement->error);
                return false;
            }
        

       	closeDB(self::$_db);
		return true;
	}
	public static function remove($id) {
		self::_init();		

		$statement = self::$_db->prepare("SET CHARACTER SET utf8");
        $statement->execute();      
		
				
		$statement = self::$_db->prepare("DELETE FROM tareas
			               				  WHERE id = ?");

		$statement->bind_param("i", $id);
        $statement->execute();           


        if($statement->error)
            {
                var_dump("Database query failed: " . $statement->error);
                return false;
            }
        

       	closeDB(self::$_db);
		return true;
	}
}
