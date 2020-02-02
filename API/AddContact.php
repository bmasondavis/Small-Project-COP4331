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

// Add the values into the contacts from the front end. 
$sql = "INSERT INTO contacts (username, email, password, cid) VALUES ('$name','$email','$pass', '$cid')"; 
$sql2 = "select * from contacts where cid = '$cid'";

// Query the database for an existing contact. If there is no contact, make an account. 
$rows = $conn->query($sql2);

// If there is no existing contact, add it. 
if (mysqli_num_rows($rows) < 1)
{
    // If this process worked....
    if ($conn->query($sql) === TRUE) 
    {

        header('Content-type: application/json'); 
        // Send back the email to signal success. 
        $success = '{"error":0}';
        echo $success; 

    }
    // Error checking
    else 
    {
        header('Content-type: application/json');
        $error = '{"error":666}'; 
        echo $error; 
    }
}
// If there is an existing account already 
else
{
    //send back account already exists
    header('Content-type: application/json');
    $account_exists = '{"error":101}'; 
    echo $account_exists; 
}
$conn->close();
?>