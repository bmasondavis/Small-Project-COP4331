function openContact(contactName) {
  var i, x, tabcontent, tablinks;

	// Get the element with id="defaultOpen" and click on it
	document.getElementById("defaultOpen").click();

  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

	document.getElementById(contactName).style.display = "block";

	// Load the profile image
	document.getElementById('loadImage').style.visibility = 'visible';

	// Hide the "add new contact" page
	x = document.getElementById("contactPanel");
	x.style.display = 'none';
}

function addContact(contactName, phone, email) {
	var tabcontent, x = document.getElementById("contactPanel");

	tabcontent = document.getElementsByClassName("tabcontent");

	for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

	if (x.style.display === "none") {
		x.style.display = "block";
	} else {
		x.style.display = "none";
	}
}

/*
function searchFunction() {
  var contactName;

  contactName = document.getElementsByClassName("")
}
*/
