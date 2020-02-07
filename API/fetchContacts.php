<?php
// This file returns a 2d array with [n][firstname], lastname, phone, email, cid.
include("config.php");

// Handling data in JSON format on the server-side using PHP
//header("Content-Type: application/json");

// Decode the file given by our front end.
$data = json_decode(file_get_contents('php://input'), true);

// Get the username, email, and password from the database.
$uemail = $data["uemail"];
$searchstring = $data["searchstring"];
// Pulls the uid from the cookie provided user email.
$sql2 = "select uid from users where email = '$uemail'";
$rows = $conn->query($sql2);
$result = mysqli_fetch_row($rows);
$uid = $result[0];

//SELECT ... WHERE column REGEXP '[[:<:]]$sub[[:>:]]


// this aint gonna be pretty :^S
$sql = "select firstname, lastname, phone, email, cid from contacts WHERE (lastname REGEXP '%$searchstring%' || firstname REGEXP '%$searchstring%') && uid = $uid";

$contacts = array();
// Verifying that a user exists
if (mysqli_num_rows($rows) === 1)
{
  $result = $conn->query($sql);
  while ($row = mysqli_fetch_assoc($result))
  {
    $contacts[] = $row;
  }
  header('Content-type: application/json');
  json_encode($contacts);
  foreach($contacts as $contact) {
  echo $contact;
  }
  // Delete the requested info from the database.

}
// If there is no user, there is a problem.
else
{
  //send back account already exists
  header('Content-type: application/json');
  //need error for contact fetch sql error
  $error_delete = '{"error":777}';
  echo $error_delete;
}
$conn->close();
?>
