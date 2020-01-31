const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add('right-panel-active');
});

signInButton.addEventListener('click', () =>{
	container.classList.remove('right-panel-active');
});

document.getElementById('loginBtn').addEventListener('click', ()=> loginButton());
document.getElementById('createBtn').addEventListener('click', ()=> createAccountBtn());

function dbQuery(value) {

}

function populate(contacts) {
	let btn = document.createElement("BUTTON");
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function createAccount(name, email, pass) {
let accObj = {name: name, email: email, password: pass};

let jsonObj = JSON.stringify(accObj);
var xmlhttp = new XMLHttpRequest();
	
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       // Typical action to be performed when the document is ready:
	    let responseObj = JSON.parse(xmlhttp.responseText);
 		console.log(responseObj);
    }
};
		
xmlhttp.open("POST", "createaccount.php", true);
xmlhttp.setRequestHeader("Content-type", "application/json; charset=UTF-8");
xmlhttp.send(jsonObj);

};




function login(email, pass) {

}

function checkParam(field , param) {
	if(param.length == 0) {
		alert(field + " field empty!");
		return 1;
	}
	if(param.length > 29 ) {
		alert(field + " field too many characters!");
		return 2;
	}

	return 0;
}

function loginButton() {
	let Obj = {
"employees":[
  {"firstName":"John", "lastName":"Doe"},
  {"firstName":"Anna", "lastName":"Smith"},
  {"firstName":"Peter", "lastName":"Jones"}
]
};
let testObj = JSON.parse(Obj);
console.log(testObj);
	let errCheck = 0;
	let email = document.getElementById('email1').value;
	if(checkParam("email" , email) != 0)
		errCheck = 1;
	let pass = document.getElementById('password1').value;
	if(checkParam("password" , pass) != 0)
		errCheck = 1;

	(errCheck == 0) ? window.location.href= 'https://google.com' : alert("please check fields and try again.");

}

function createAccountBtn (){
	let errCheck = 0;
	let name = document.getElementById('name').value;
	if(checkParam("name", name) != 0)
		errCheck = 1;
	let email = document.getElementById('email2').value;
	if(checkParam("email" , email) != 0)
		errCheck = 1;
	let pass = document.getElementById('password2').value;
	if(checkParam("password" , pass) != 0)
		errCheck = 1;

	(errCheck == 0) ? alert("name: " + name + "\nemail: " + email + "\n password: " + pass) : alert("please check fields and try again.");
	createAccount(name, email, pass);
}
