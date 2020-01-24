<?php
include("config.php");


// Handling data in JSON format on the server-side using PHP
header("Content-Type: application/json");

$data = json_decode(file_get_contents('php://input'), true);

// Get the information for the login page from the json file (email, password)
$email = $data["email"];
$pass = $data["password"];

// Find the email and password in the database

// Backup
// Double check if 1 equals is supposed to be 2 equals. 
//$sql = "select * from users where email = '$email'";
//$sql2 = "select * from password where password = '$pass'";

$sql = "select * from users where email = '$email' && password = '$pass'";
//$sql2 = "select * from password where password = '$pass'";

// Check the emails and pass to ensure
$row = $conn->query($sql);

if(mysqli_num_rows($row) === 1)
{
    $success = array("Success", $email); 
    echo json_encode($success);
    // Write return message
}

else
{
    $failure = array("Failure"); 
    echo json_encode($failure); 
}

$conn->close(); 
?>