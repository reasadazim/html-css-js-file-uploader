<?php

header('Content-Type: application/json;');

try {
  $upload_dir = "../uploads";
  $file_name =  $_FILES['file']['name']; 
  $tmp_name = $_FILES['file']['tmp_name']; 
  move_uploaded_file($tmp_name, $upload_dir."/".$file_name); 
  echo "File Uploaded Successfully.";
}
catch(Exception $e) {
  $error = ['Message' => $e->getMessage()];
  echo $error;
}

?>
