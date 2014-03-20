<?php

include('class.upload.php');

$allowedExts = array("gif", "jpeg", "jpg", "png");
$temp = explode(".", $_FILES["file"]["name"]);
$extension = end($temp);
array_pop($temp);


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
    if (file_exists("../../../upload/" . $_FILES["file"]["name"]))
      {
      echo $_FILES["file"]["name"] . " already exists. ";
      }
    else
      {
        move_uploaded_file($_FILES["file"]["tmp_name"],
        "../../../upload/" . $_FILES["file"]["name"]);

        if (!copy("../../../upload/" . $_FILES["file"]["name"], "../../../upload/thumb_" . $_FILES["file"]["name"])) {
          echo "error";
        }
        $handle = new upload("../../../upload/thumb_" . $_FILES["file"]["name"]);
        if ($handle->uploaded) {
            //$handle->file_new_name_body   =  'thumb_'.$temp[0];
            $handle->image_resize         = true;
            $handle->image_x              = 150;
            $handle->image_ratio_y        = true;
            $handle->process('../../../upload/');            
            if ($handle->processed) {
                echo $_FILES["file"]["name"];
                $handle->clean();
            } else {
                echo 'error : ' . $handle->error;
            }
        }

      }            
    }
  }
else
  {
  echo "Invalid file";
  }
?>