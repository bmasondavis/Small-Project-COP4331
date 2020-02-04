// A function to open a contact already in the directory.
function clearFields() {
  document.getElementById("name").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("email").value = "";
}
function buttonControls() {

document.getElementById("submit").addEventListener('click', () =>{
    var fieldEmpty = "";
  if(document.getElementById("name").value === "")  fieldEmpty += "Must fill Name field!  ";
  if(document.getElementById("phone").value === "")  fieldEmpty += "Must fill Phone Number field!  ";
  if(document.getElementById("email").value === "")  fieldEmpty += "Must fill Email field!  ";
  (fieldEmpty === "") ? createContact(document.getElementById("name").value, document.getElementById("phone").value,
   document.getElementById("email").value) : alert(fieldEmpty);
  clearFields();
});

document.getElementById("clear").addEventListener('click', ()=> clearFields());
}

function openContact(contactName) {
  var i, x, tabcontent, tablinks;
  // Display edit and delete buttons.
  document.getElementById('delete').style.display = "block";
  document.getElementById('edit').style.display = "block";

	// Hide the "add new contact" page
	x = document.getElementById('contactPanel');
	x.style.display = 'none';
  let contact = document.getElementById("contactInfo");
  document.getElementById("contactHeader").innerHTML = contactName;
	contact.style.display = "block";
  document.getElementById("contactBtns").style.display = "block";
}

// A function to add a contact to the directory.
function addContact() {
	var tabcontent, x = document.getElementById("contactPanel");
  buttonControls();
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

function createContact(contactName, phone, email) {
 let newA = document.createElement("a");
 let newLi = document.createElement("li");
 newA.innerHTML = contactName;
 newA.setAttribute('href', '#');
 newLi.appendChild(newA);
 newLi.addEventListener('click', ()=> openContact(contactName));
 document.getElementById("tablinks").appendChild(newLi);
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
