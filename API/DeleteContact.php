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

$sql = "DELETE FROM contacts WHERE cid = '$cid'"; 

// Is the rest of this code even needed? I can just return successful update. 
$sql2 = "select * from contacts where cid = '$cid'";

// Query the database for an existing user. If there is no user, make an account. 
$rows = $conn->query($sql2);

// If there is one user, a delete can be successful. 
if (mysqli_num_rows($rows) === 1)
{
    // Delete the requested info from the database. 
    if ($conn->query($sql) === TRUE) 
    {

    header('Content-type: application/json');
    $success_delete = '{"error":0}';  
    echo $success_delete; 

    }
}

// If there isn't one user, there is a problem. 
else
{
    //send back account already exists
    header('Content-type: application/json');
    $error_delete = '{"error":777}'; 
    echo $error_delete; 
}


$conn->close();
?>