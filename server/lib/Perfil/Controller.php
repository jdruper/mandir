<?php
class Perfil_Controller {
	public static function all(){
		echo json_encode(Perfil_Storage::all() );
	}
	public static function create() {
		$data = json_decode(Flight::request()->body,true);
		echo json_encode( Perfil_Storage::create($data) );
	}
	public static function findOne($id) {
		echo json_encode( Perfil_Storage::findOne($id) );
	}
	public static function update($id) {
		$data = json_decode(Flight::request()->body,true);
		echo json_encode( Perfil_Storage::update($id,$data) );
	}
	public static function remove($id) {
		echo json_encode( Perfil_Storage::remove($id) );
	}
}
