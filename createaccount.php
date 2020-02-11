<?php
include("config.php");

// Handling data in JSON format on the server-side using PHP
//header("Content-Type: application/json");

// Decode the file given by our front end. 
$data = json_decode(file_get_contents('php://input'), true);
// $object = (json_decode($x, true));
// echo $data["name"];

// Get the username, email, and password from the database. 
$woah = $data["name"];
$waah = $data["email"];
$eme = $data["password"];
// salt and hash password
$pass = password_hash($eme, PASSWORD_DEFAULT)

// Add the values into the database from the front end. 
$sql = "INSERT INTO users (username, email, password) VALUES ('$woah','$waah','$pass')";
$sql2 = "select * from users where email = '$waah'";

// Query the database for an existing user. If there is no user, make an account. 
$rows = $conn->query($sql2);

// If there is no existing user, add it. 
if (mysqli_num_rows($rows) < 1)
{
 // If this process worked....
if ($conn->query($sql) === TRUE) 
{

     
  
    header('Content-type: application/json');
    //$new = '{"email":"' . $waah .'"}'; 
    //$new = '{"test":1}'; 
 
    // This is for creating a successful account. 
    $new = '{"error":0}';
    echo $new; 

}
// Error checking for shenanigans. 
else 
{
    header('Content-type: application/json');
    $error = '{"error":202}'; 
    echo $error; 
}
}
// If there is an existing account
else
{
    //send back account already exists
    header('Content-type: application/json');
 
    // This represent an account already existing
    $account_exists = '{"error":301}'; 
    echo $account_exists; 
}
$conn->close();
?>
