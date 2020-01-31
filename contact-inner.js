// A function to open a contact already in the directory.
function openContact(contactName) {
  var i, x, tabcontent, tablinks;

  // Display edit and delete buttons.
  document.getElementById('delete').style.display = "block";
  document.getElementById('edit').style.display = "block";

	// Hide the "add new contact" page
	x = document.getElementById('contactPanel');
	x.style.display = 'none';

  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

	document.getElementById(contactName).style.display = "block";
}

// A function to add a contact to the directory.
function addContact(contactName, phone, email) {
	var tabcontent, x = document.getElementById("contactPanel");

  // Hide edit and delete buttons.
  document.getElementById('delete').style.display = "none";
  document.getElementById('edit').style.display = "none";

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

// A function to search for contacts in the directory.
function searchFunction() {
  var i, a, ul, li, input, filter, contactName;

  input = document.getElementById("search");
  filter = input.value.toUpperCase();
  ul = document.getElementById("tablinks");
  li = ul.getElementsByTagName("li");

  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}
