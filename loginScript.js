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

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";

}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  console.log("here");
  return "";
}

function createAccount(name, email, pass) {
let accObj = {name: name, email: email, password: pass};

let jsonObj = JSON.stringify(accObj);
const xmlhttp = new XMLHttpRequest();

xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       // Typical action to be performed when the document is ready:
       let responseObj = JSON.parse(xmlhttp.responseText);
       console.log(xmlhttp.responseText);
       if(responseObj.error === 202) alert("error code: 202");
       else (responseObj.error === 0) ? window.location.href = 'contact-inner.html' : console.log("Account error");
    }
};

xmlhttp.open("GET", "createaccount.php", true);
xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xmlhttp.send(jsonObj);
}

function login(email, pass) {
	let loginInfo = {email: email, pass: pass};
	let jsonObj = JSON.stringify(loginInfo);
const xmlhttp = new XMLHttpRequest();

xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       // Typical action to be performed when the document is ready:
       let response = JSON.parse(xmlhttp.responseText);
 		console.log(response);
 		(response.error == 0) ? window.location.href = 'contact-inner.html' : alert("login failed");
    }
};

xmlhttp.open("GET", "login.php", true);
xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xmlhttp.send(jsonObj);
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
	let errCheck = 0;
	let email = document.getElementById('email1').value;
	
	let pass = document.getElementById('password1').value;
	
	Cookies.set("thisCookie", "true", {expires: 7});
	//console.log(getCookie("thisCookie"));

	//(errCheck != 0) ? alert("please check fields and try again."): login(email, pass);
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

	createAccount(name, email, pass);
}