// A function to open a contact already in the directory.
document.getElementById("logout-btn").addEventListener('click', ()=> {
window.location.href = 'index.html';
});
document.getElementById("search-btn").addEventListener('click', ()=> {  
dbQuery(document.getElementById("search").value, Cookies.get("emailID"));
});

function dbQuery(value, email) {
let search = {uemail: email, searchstring: value};
let jsonObj = JSON.stringify(search);
const xmlhttp = new XMLHttpRequest();

xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(xmlhttp.responseText);
       let responseObj = JSON.parse(xmlhttp.responseText);
       console.log(responseObj[0]);
    }
  }
  xmlhttp.open("POST", "fetchContacts.php", true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send(jsonObj);
}

function populate(contacts) {
  let btn = document.createElement("BUTTON");
}

function clearFields() {
  document.getElementById("name").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("email").value = "";
}

function buttonControls() {
  document.getElementById("submit").addEventListener('click', () =>{
      var fieldEmpty = "";
    if(document.getElementById("name").value === "" && document.getElementById("phone") === "" &&
       document.getElementById("email") === "")  fieldEmpty += "Please fill in all fields.";
    (fieldEmpty === "") ? createContact(document.getElementById("name").value, document.getElementById("phone").value,
     document.getElementById("email").value) : alert(fieldEmpty);
    clearFields();
  });

  document.getElementById("clear").addEventListener('click', ()=> clearFields());

  document.getElementById("edit-submit").addEventListener('click', () =>{
      var fieldEmpty = "";
    if(document.getElementById("phone") === "" && document.getElementById("email") === "")
      fieldEmpty += "Please fill in all fields.";
    (fieldEmpty === "") ? createContact(document.getElementById("name").value, document.getElementById("phone").value,
     document.getElementById("email").value) : alert(fieldEmpty);
    clearFields();
  });
}

function submit() {
  var fieldEmpty = "";

  if (document.getElementById("edit-phone") === "" || document.getElementById("edit-email") === "")
    fieldEmpty += "Please fill in all fields.";

  (fieldEmpty === "") ? createContact(contactName, document.getElementById("edit-phone").value,
  document.getElementById("edit-email").value) : alert(fieldEmpty);
  clearFields();
}

function openContact(contactName) {
  var i, x, y, z, m, tabcontent, tablinks;
  // Display edit and delete buttons.
  document.getElementById('delete').style.display = "block";
  document.getElementById('edit').style.display = "block";

  /*
  y = document.getElementById('welcome-page');
  y.style.display = "none";
  */

  z = document.getElementById('overlay');
  z.style.display = "none";

  m = document.getElementById("editPanel");
  m.style.display = "none";

	// Hide the "add new contact" page
	x = document.getElementById('contactPanel');
	x.style.display = 'none';
  let contact = document.getElementById("contactInfo");
  console.log(contactName);
  document.getElementById("contactHeader").innerHTML = contactName;
	contact.style.display = "block";
  document.getElementById("contactBtns").style.display = "block";
}

// A function to add a contact to the directory.
function addContact() {
	var tabcontent, x = document.getElementById("contactPanel"), y, z, m;
  buttonControls();
  // Hide edit and delete buttons.
  document.getElementById('delete').style.display = "none";
  document.getElementById('edit').style.display = "none";

  y = document.getElementById('welcome-page');
  y.style.display = "none";

  z = document.getElementById("overlay");
  z.style.display = "none";

  m = document.getElementById("editPanel");
  m.style.display = "none";

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

function editContact() {
  var x = document.getElementById("editPanel"), y;

  buttonControls();
  // Hide edit and delete buttons.
  document.getElementById('delete').style.display = "none";
  document.getElementById('edit').style.display = "none";
  tabcontent = document.getElementsByClassName("tabcontent");

  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  y = document.getElementById("name").innerHTML;
  document.getElementById("edit-name").placeholder = y;

  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}