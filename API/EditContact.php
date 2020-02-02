<?php
include("config.php");

// Handling data in JSON format on the server-side using PHP
//header("Content-Type: application/json");

// Decode the file given by our front end. 
$data = json_decode(file_get_contents('php://input'), true);


// Get the username, email, and password from the database. 
$name = $data["name"];
$email = $data["email"];
$pass = $data["password"];
$cid = $data["cid"];


// Edit the contact in the server. 
$sql = "UPDATE contacts SET username = '$name', email = '$email', password = '$pass' WHERE cid = '$cid'"; 

// Double check 
$sql2 = "select * from contacts where cid = '$cid'";

// Query the database for an existing user. If there is no user, there is a problem. 
$rows = $conn->query($sql2);

// If there is exactly one row, let the user edit. 
if(mysqli_num_rows($rows) === 1)
{
    // Update the database with the information given. 
    if($conn->query($sql) === TRUE)
    {
        header("Content-Type: application/json");
        $success = '{"error":0}'; 
        echo $success; 
    }
    
}

// If there is not one row, this means they are editing something that doesn't exist. Very bad! 
else
{
    header("Content-Type: application/json");
    $failure = '{"error":999}';
    echo $failure; 
}

$conn->close();
?>