<?php
include("config.php");
$x = $_REQUEST["x"];

$object = (json_decode($x, true));

echo $object->name;
echo $object->email;
echo $object->password; 

//name is 0, user is 1, pass is 2
?>




