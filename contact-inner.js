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
  document.getElementById("firstname").value = "";
  document.getElementById("lastname").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("email").value = "";
}
function editClearFields(){
  document.getElementById("phone").value = "";
  document.getElementById("email").value = "";
}
//add button controls
function buttonControls() {
  document.getElementById("clear").addEventListener('click', ()=> clearFields());
  document.getElementById("edit-clear").addEventListener('click', ()=> editClearFields());
  document.getElementById("edit").addEventListener('click', ()=> editContact());

  document.getElementById("submit").addEventListener('click', () =>{
      var fieldEmpty = "";
    if(document.getElementById("firstname").value === "" || document.getElementById("lastname").value === "" || document.getElementById("phone").value === "" ||
       document.getElementById("email").value === "")  console.log("Please fill in all fields.");
      else{
    newContact =  {firstname: document.getElementById("firstname").value, lastname: document.getElementById("lastname").value,
    phone: document.getElementById("phone").value, cemail: document.getElementById("email").value, uemail: Cookies.get("emailID")};
    dbContactCreate(newContact);
    clearFields();
  }
  });

  document.getElementById("delete").addEventListener('click', () =>{
    deleteContact(thisCid);
  });

  document.getElementById("edit-submit").addEventListener('click', () =>{
      var fieldEmpty = "";
    if(document.getElementById("firstname").value === "" || document.getElementById("lastname").value === "" || document.getElementById("phone").value === "" ||
       document.getElementById("email").value === "")  console.log("Please fill in all fields.");
      else{
    newContact =  {firstname: document.getElementById("firstname").value, lastname: document.getElementById("lastname").value,
    phone: document.getElementById("phone").value, cemail: document.getElementById("email").value, uemail: Cookies.get("emailID"), cid: thisCid};
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
       if(responseObj.error == 0) {
        let savedContact = {firstname: newContact.firstname, lastname: newContact.lastname,
        phone: newContact.phone, email: newContact.cemail, cid: newContact.cid};
        updateContact(savedContact);
       }
       else console.log("error: " + responseObj.error);
    }
  }

  xmlhttp.open("POST", "EditContact.php", true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send(contactObj);
}

function dbContactCreate(newContact) {
  let contactObj = JSON.stringify(newContact);
  const xmlhttp = new XMLHttpRequest();

xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       newContact.cid = xmlhttp.responseText;
       cache.push(newContact);
       let savedContact = {firstname: newContact.firstname, lastname: newContact.lastname,
        phone: newContact.phone, email: newContact.cemail, cid: newContact.cid};
       createContact(savedContact);
    }
  }
  xmlhttp.open("POST", "AddContact.php", true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send(contactObj);
}


function deleteContact(cid) {
  let contactObj = JSON.stringify({uemail: Cookies.get("emailID"), cid: cid});
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
    if(cache[i].cid == cid) return cache[i];
}
function contactIndex(cid) {
  for(let i = 0; i < cache.length; i++)
    if(cache[i].cid == cid) return i;
}

function openContact(contact) {
  // Display edit and delete buttons.
  buttonControls();
	// Hide the "add new contact" page
  document.getElementById('panelHeader').innerText = "Contact Info";
  thisCid = contact.cid;
	document.getElementById('contactPanel').style.display = "block";
  document.getElementById("firstname").value = contact.firstname;
  document.getElementById("lastname").value = contact.lastname;
  document.getElementById("phone").value = contact.phone;
  document.getElementById("email").value = contact.email;
  //set to read only
  document.getElementById("firstname").readOnly = true;
  document.getElementById("lastname").readOnly = true;
  document.getElementById("phone").readOnly = true;
  document.getElementById("email").readOnly = true;
  //set button visibility
  document.getElementById("addContact-btns").style.display = "none";
  document.getElementById("panel-btns").style.display = "block";
  document.getElementById("edit-btns").style.display = "none";
}

// A function to add a contact to the directory.
function addContact() {
  buttonControls();
  document.getElementById('panelHeader').innerText = "Create Contact";
  document.getElementById('contactPanel').style.display = "block";
  document.getElementById("firstname").value = "";
  document.getElementById("lastname").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("email").value = "";
  //set to read only
  document.getElementById("firstname").readOnly = false;
  document.getElementById("lastname").readOnly = false;
  document.getElementById("phone").readOnly = false;
  document.getElementById("email").readOnly = false;
  //set button visibility
  document.getElementById("addContact-btns").style.display = "block";
  document.getElementById("panel-btns").style.display = "none";
  document.getElementById("edit-btns").style.display = "none";
}

//function to create contact on sidebar
function createContact(contact) {
  let newA = document.createElement("a");
  let newLi = document.createElement("li");
  newA.innerHTML = contact.firstname;
  newA.setAttribute('href', '#');
  newA.id = contact.cid;
  newLi.appendChild(newA);
  newLi.addEventListener('click', ()=> openContact(cache[contactIndex(newA.id)], newA.id));
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
function eraseContact(cid) {
  let index = contactIndex(cid);
  cache.splice(index, 1);
  let li = document.getElementById(cid).parentElement.nodeName;
  li.remove();
}

//update sidebar and cache
function updateContact(newContact){
let index = contactIndex(newContact.cid);
cache[index] = newContact;
document.getElementById(newContact.cid).innerHTML = newContact.firstname;
openContact(newContact);
}

//show editContact page
function editContact() {

  let contact = findContact(thisCid);
  document.getElementById('contactPanel').style.display = "block";
  // Hide edit and delete buttons.
  document.getElementById('panelHeader').innerText = "Edit Contact";
  document.getElementById("firstname").readOnly = false;
  document.getElementById("lastname").readOnly = false;
  document.getElementById("phone").readOnly = false;
  document.getElementById("email").readOnly = false;

  document.getElementById("firstname").value = contact.firstname;
  document.getElementById("lastname").value = contact.lastname;
  document.getElementById("phone").value = contact.phone;
  document.getElementById("email").value = contact.email;

  document.getElementById("firstname").readOnly = true;
  document.getElementById("lastname").readOnly = true;
  document.getElementById("phone").readOnly = false;
  document.getElementById("email").readOnly = false;

  document.getElementById("addContact-btns").style.display = "none";
  document.getElementById("panel-btns").style.display = "none";
  document.getElementById("edit-btns").style.display = "block";
}
