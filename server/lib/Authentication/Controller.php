<?php
class Authentication_Controller {
	
	public static function authorize() {
		$data = json_decode(Flight::request()->body,true);		
		echo json_encode(Authentication_Storage::authorize($data) );
	}	

	public static function logout() {		
		session_unset();
	}	
}
