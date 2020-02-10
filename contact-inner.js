// A function to open a contact already in the directory.
var cache = new Array();
var thisCid;
//logout button deletes cookie
document.getElementById("logout-btn").addEventListener('click', ()=> {
Cookies.remove("emailID");
window.location.href = 'index.html';
});
document.getElementById("search-btn").addEventListener('click', ()=> {  
populate(document.getElementById("search").value, Cookies.get("emailID"));
});

populate("", Cookies.get("emailID"));

//delete cache and reset sidebar
function clearCache(){
cache = new Array();
let tabLinks = document.getElementById("tablinks");
while (tabLinks.firstChild) tabLinks.removeChild(tabLinks.firstChild);
}

function clearFields() {
  document.getElementById("firstName").value = "";
  document.getElementById("lastName").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("email").value = "";
}
function editClearFields(){
  document.getElementById("edit-firstName").value = "";
  document.getElementById("edit-lastName").value = "";
  document.getElementById("edit-phone").value = "";
  document.getElementById("edit-email").value = "";
}
//add button controls
function buttonControls() {
  document.getElementById("clear").addEventListener('click', ()=> clearFields());
  document.getElementById("edit-clear").addEventListener('click', ()=> editClearFields());

  document.getElementById("submit").addEventListener('click', () =>{
      var fieldEmpty = "";
    if(document.getElementById("firstName").value === "" || document.getElementById("lastName").value === "" || document.getElementById("phone").value === "" ||
       document.getElementById("email").value === "")  console.log("Please fill in all fields.");
      else{
    newContact =  {firstName: document.getElementById("firstName").value, lastName: document.getElementById("lastName").value,
    phone: document.getElementById("phone").value, cemail: document.getElementById("email").value, uemail: Cookies.get("emailID")};
    dbContactCreate(newContact);
    clearFields();
  }
  });

  document.getElementById("edit-submit").addEventListener('click', () =>{
      var fieldEmpty = "";
    if(document.getElementById("edit-firstName").value === "" || document.getElementById("edit-lastName").value === "" || document.getElementById("edit-phone").value === "" ||
       document.getElementById("edit-email").value === "")  console.log("Please fill in all fields.");
      else{
    newContact =  {firstName: document.getElementById("edit-firstName").value, lastName: document.getElementById("edit-lastName").value,
    phone: document.getElementById("edit-phone").value, cemail: document.getElementById("edit-email").value, uemail: Cookies.get("emailID"), cid: thisCid};
    dbContactEdit(newContact);
    clearFields();
  }
  });
}

//function to populate sidebar and load in Cache
function populate(value, email) {
let search = {uemail: email, searchstring: value};
let jsonObj = JSON.stringify(search);
const xmlhttp = new XMLHttpRequest();

xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       let responseObj = JSON.parse(xmlhttp.responseText);
       clearCache();
       for(let i = 0; i < responseObj.length; i++) {
        cache.push(responseObj[i]);
       createContact(responseObj[i]);
     }
    }
  }
  xmlhttp.open("POST", "fetchContacts.php", true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send(jsonObj);
}

function dbContactEdit(newContact) {
  let contactObj = JSON.stringify(newContact);
  const xmlhttp = new XMLHttpRequest();

xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       let responseObj = JSON.parse(xmlhttp.responseText);
       if(responseObj.error == 0) updateContact(newContact);
       else console.log("error: " + responseObj.error);
    }
  }
  xmlhttp.open("POST", "EditContact.php", true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send(jsonObj);
}

function dbContactCreate(newContact) {
  let contactObj = JSON.stringify(newContact);
  const xmlhttp = new XMLHttpRequest();

xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       newContact.cid = xmlhttp.responseText;
       cache.push(newContact);
       createContact(newContact);
    }
  }
  xmlhttp.open("POST", "AddContact.php", true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send(contactObj);
}


function deleteContact(cid) {
  let contactObj = JSON.stringify({cid: cid});
  const xmlhttp = new XMLHttpRequest();

xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       let responseObj = JSON.parse(xmlhttp.responseText);
       if(responseObj.error === 0)
        console.log("delete success");
        eraseContact(cid);
    }
  }
  xmlhttp.open("POST", "DeleteContact.php", true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send(jsonObj);
}

function findContact(cid) {
  for(let i = 0; i < cache.length; i++)
    if(cache[i].cid = cid) return cache[i];
}

function openContact(newContact, cid) {
  var i, x, y, z, m, tabcontent, tablinks;
  // Display edit and delete buttons.
  document.getElementById('delete').style.display = "block";
  document.getElementById('edit').style.display = "block";
  thisCid = cid;
  contactInfo = findContact(cid);
  console.log(contactInfo);

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
  console.log(newContact);
  document.getElementById("contactHeader").innerHTML = newContact.firstName + " " + newContact.lastName;
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

//function to create contact on sidebar
function createContact(contact) {
  console.log(contact);
  let newA = document.createElement("a");
  let newLi = document.createElement("li");
  newA.innerHTML = contact.firstName;
  newA.setAttribute('href', '#');
  newA.id = contact.cid;
  newLi.appendChild(newA);
  newLi.addEventListener('click', ()=> openContact(contact, newA.id));
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

//delete from cache and sidebar
function eraseContact(oldCid) {
  let index = cache.findIndex(findContact(oldCid));
  cache.splice(index, 1);
  let li = document.getElementById(oldCid).parentElement.nodeName;
  li.remove();
}

//update sidebar and cache
function updateContact(newContact, cid){
  createContact(newContact);
let contact = document.getElementById(newContact.cid);
contact.innerHTML = newContact.firstName;
findContact(newContact) = newContact;
}

//show editContact page
function editContact() {
  var x = document.getElementById("editPanel"), y;
  let contact = findContact(thisCid);
  console.log(contact);
  buttonControls();
  // Hide edit and delete buttons.
  document.getElementById('delete').style.display = "none";
  document.getElementById('edit').style.display = "none";
  tabcontent = document.getElementsByClassName("tabcontent");

  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  document.getElementById("edit-firstName").value = contact.firstName;
  document.getElementById("edit-lastName").value = contact.lastName;
  document.getElementById("edit-phone").value = contact.phone;
  document.getElementById("edit-email").value = contact.email;

  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}