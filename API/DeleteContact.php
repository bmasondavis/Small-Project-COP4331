<?php
include("config.php");

// Handling data in JSON format on the server-side using PHP
//header("Content-Type: application/json");

// Decode the file given by our front end. 
$data = json_decode(file_get_contents('php://input'), true);

// Get the username, email, and password from the database. 
//$fname = $data["firstname"];
//$lname = $data["lastname"];
//$phone = $data["phone"];
//$cemail = $data["cemail"];
$uemail = $data["uemail"];
$cid = $data["cid"];

// Pulls the uid from the cookie provided user email.
$sql2 = "select uid from users where email = '$uemail'";
$rows = $conn->query($sql2);
$result = mysqli_fetch_row($rows);
$uid = $result[0];

$sql = "DELETE FROM contacts WHERE cid = '$cid' && uid = '$uid'"; 

 // Delete the requested info from the database. 
 if ($conn->query($sql) === TRUE) 
 {
     
  header('Content-type: application/json');
  $success = '{"error":0}';
  echo $success; 
     // Backup in case Sam wants something else. 
     //header('Content-type: application/json');
     //$success_delete = '{"error":0}';  
     //echo $success_delete; 
 }

// If there is no user, there is a problem. 
else
{
    //send back account already exists
    header('Content-type: application/json');
    $error_delete = '{"error":777}'; 
    echo $error_delete; 
}
$conn->close();
?>
