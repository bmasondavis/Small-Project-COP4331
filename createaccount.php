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

// Add the values into the database from the front end. 
$sql = "INSERT INTO users (username, email, password) VALUES ('$woah','$waah','$eme')"; 
$sql2 = "select * from users where username = '$waah'";

// Query the database for an existing user. If there is no user, make an account. 
$rows = $conn->query($sql2);

// If there is no existing user, add it. 
if (mysqli_num_rows($rows) < 1)
{
 // If this process worked....
if ($conn->query($sql) === TRUE) 
{

    $new = '{"email":"' . $waah .'"}';  
    //       '{"error":"' . $err . '"}';
    header('Content-type: application/json');
    //$new = '{"test":1}'; 
    echo $new; 

}
// Error checking for shenanigans. 
else 
{
    header('Content-type: application/json');
    $error = '{"error":1}'; 
    echo $error; 
}
}
// If there is an existing account
else
{
    //send back account already exists
    header('Content-type: application/json');
    $account_exists = '{"accountAlreadyExists":2}'; 
    echo $account_exists; 
}
$conn->close();
?>
