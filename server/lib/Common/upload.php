<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/certificados/composer/PHP-JWT/Authentication/JWT.php';
require_once (dirname(dirname(__FILE__)).'/Authentication/Session.php');
include('class.upload.php');

$allowedExts = array("gif", "jpeg", "jpg", "png","JPG","JPEG","PNG","GIF");
$tempFileName = explode(".", $_FILES["file"]["name"]);
$extension = strtolower(end($tempFileName));
array_pop($tempFileName);


if ((($_FILES["file"]["type"] == "image/gif")
|| ($_FILES["file"]["type"] == "image/jpeg")
|| ($_FILES["file"]["type"] == "image/jpg")
|| ($_FILES["file"]["type"] == "image/pjpeg")
|| ($_FILES["file"]["type"] == "image/x-png")
|| ($_FILES["file"]["type"] == "image/png"))
//&& ($_FILES["file"]["size"] < 100000)
&& in_array($extension, $allowedExts))
  {
  if ($_FILES["file"]["error"] > 0)
    {
    echo "Return Code: " . $_FILES["file"]["error"] . "<br>";
    }
  else
    {    
    // if (file_exists("../../../upload/" . $_FILES["file"]["name"]))
    //   {
    //   echo $_FILES["file"]["name"] . " already exists. ";
    //   }
    // else
    //   {        
        //move_uploaded_file($_FILES["file"]["tmp_name"],
        $ruta = $_SERVER['DOCUMENT_ROOT'] ."/certificados/archivos/";
        $nombreImagen = generarNombreImagen($ruta, $extension);        
        $rutaFN = $ruta.$nombreImagen.'.'.$extension;        
        $rutaFNThumb = $ruta."temp_".$nombreImagen.'.'.$extension;                
        move_uploaded_file($_FILES["file"]["tmp_name"], $rutaFN);

        if (!copy($rutaFN, $rutaFNThumb)) {
           echo "error";
         }
         $handle = new upload($rutaFNThumb);        

        if ($handle->uploaded) {
            $handle->file_new_name_body   =  'thumb_'.$nombreImagen;
            //$handle ->file_overwrite      = true;
            $handle->image_resize         = true;
            $handle->image_x              = 240;
            $handle->image_ratio_y        = true;
            $handle->process($ruta);            
            if ($handle->processed) {                
                echo $handle->file_dst_name;
                $handle->clean();
            } else {
                echo 'error : ' . $handle->error;
            }
        }

    //  }            
    }
  }
else
  {
  echo "Invalid file";
  }

  function generarNombreImagen($ruta, $extension){

    $user = get_user_data();
    $index = 0;
    $nImagen = 'perfil'.$user['id_perfil'].'_';    
    $temp = $ruta. $nImagen. $index. '.'. $extension;
      
    while(file_exists($temp)){
      $index++;
      $temp = $ruta. $nImagen. $index. '.'. $extension;      
    }

    return $nImagen.$index;
  }
?>