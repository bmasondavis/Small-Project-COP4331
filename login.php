<?php
include("config.php");


// Handling data in JSON format on the server-side using PHP


$data = json_decode(file_get_contents('php://input'), true);

// Get the information for the login page from the json file (email, password)
$email = $data["email"];
$pass = $data["password"];

$sql3 = "select password from users where email = '$email'";
$result = $conn->query($sql3);
$hash = mysqli_fetch_row($result);


// Find the email and password in the database

// Backup
// Double check if 1 equals is supposed to be 2 equals. 
//$sql = "select * from users where email = '$email'";
//$sql2 = "select * from password where password = '$pass'";

$sql = "select * from users where email = '$email' && password = '$hash'";


// Check the emails and pass. 
$row = $conn->query($sql);

// If the user matches what is in the database, return the email.
if (password_verify($password, $hash))
    {
    if(mysqli_num_rows($row) === 1)
        {
    
             header("Content-Type: application/json");
               // This is for correct credentials, successful login
             $success = '{"email":"' . $email . '", "password":"' . $pass . '", "error":0}';
             echo $success; 

        }
    }

// If it doesn't exist, then the user and password was incorrect. 
else
{
    header("Content-Type: application/json");
    // Invalid Credentials recieved. 
    $failure = '{"email":"' . $email . '", "password":"' . $pass . '", "error":302}';
    echo $failure; 
}

$conn->close(); 
?>
