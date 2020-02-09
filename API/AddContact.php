<?php
include("config.php");

// Handling data in JSON format on the server-side using PHP
//header("Content-Type: application/json");

// Decode the file given by our front end. 
$data = json_decode(file_get_contents('php://input'), true);

// Get the username, email, and password from the database. 

$fname = $data["firstname"];
$lname = $data["lastname"];
$phone = $data["phone"];
$cemail = $data["cemail"];
$uemail = $data["uemail"];

// Add the values into the contacts from the front end. 
$sql2 = "select uid from users where email = '$uemail'";

// Pulls the uid from the cookie provided user email;
$rows = $conn->query($sql2);
$result = mysqli_fetch_row($rows);
$uid = $result[0];

$sql = "INSERT INTO contacts (firstname, lastname, phone, email, uid) VALUES ('$fname','$lname','$phone', '$cemail', $uid)"; 
if ($conn->query($sql) === TRUE)
{
    echo $uid;
   // Backup in case Sam Wants a different parameter back
   // header('Content-type: application/json');
   // $success = '{"error":0}';
   // echo $success; 
}
else
{
    header('Content-type: application/json');
    $failure = '{"error":555}';
    echo $failure;
}

// If there is no existing contact, add it. 
/*if (mysqli_num_rows($rows) < 1)
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
} */
$conn->close();
?>
