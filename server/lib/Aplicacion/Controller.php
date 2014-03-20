<?php
class Aplicacion_Controller {
	public static function all(){		
		if(check_token()){		
			echo json_encode(Aplicacion_Storage::all() );
		}
	}
	public static function create() {
		if(check_token()){	
			$data = json_decode(Flight::request()->body,true);
			echo json_encode( Aplicacion_Storage::create($data) );
		}
	}
	public static function findOne($id) {
		if(check_token()){		
			echo json_encode( Aplicacion_Storage::findOne($id) );
		}
	}
	public static function update($id) {
		if(check_token()){		
			$data = json_decode(Flight::request()->body,true);
			echo json_encode( Aplicacion_Storage::update($id,$data) );
		}
	}
	public static function remove($id) {
		if(check_token()){		
			echo json_encode( Aplicacion_Storage::remove($id) );
		}
	}
}
