<?php
include("config.php");


// Handling data in JSON format on the server-side using PHP


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


// Check the emails and pass. 
$row = $conn->query($sql);

// If the user matches what is in the database, return the email. 
if(mysqli_num_rows($row) === 1)
{
    // 0 for error represents success. 
    header("Content-Type: application/json");
    $success = '{"email":"' . $email . '", "password":"' . $pass . '"}';
    echo $success; 

}

// If it doesn't exist, then the user and password was incorrect. 
else
{
    // 1 for error represents failure. 
    header("Content-Type: application/json");
    $failure = '{"Wrong User/Password ":1}';
    echo $failure; 
}

$conn->close(); 
?>
