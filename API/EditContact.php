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
$cid = $data["cid"];
// Pulls the uid from the cookie provided user email.
$sql2 = "select uid from users where email = '$uemail'";
$rows = $conn->query($sql2);
$result = mysqli_fetch_row($rows);
$uid = $result[0];
echo $uid;

// Edit the contact in the server. 
// Potential error. Does update happen first, or does WHERE? If update, we need to redo. 

// ^^^^ All happens at once, think of the later lines as constraints to the same call
$sql = "UPDATE contacts SET (firstname = '$fname', lastname = '$lname',
                            phone = '$phone', cemail = '$cemail')
                            WHERE cid = '$cid' && uid = '$uid'"; 

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
