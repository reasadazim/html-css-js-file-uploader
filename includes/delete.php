<?php
  $upload_dir = "../uploads";
  $file_up_name = $_POST['name'];
  unlink($upload_dir."/".$file_up_name); 
?>
