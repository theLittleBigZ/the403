/* 
Main Script File
this file contians all required JS functions for the 403.tk to function
Zeeshan Badr
*/
//config for connection + initaliztion of FireBase 
var displayName;
var email;
var emailVerified;
var photoURL;
var isAnonymous;
var uid;
var providerData;

var config = {
	apiKey: "AIzaSyCpeW7zSFbo1UmM0d0iARIC4jY9Jp5w-j8",
    authDomain: "the403-e7189.firebaseapp.com",
    databaseURL: "https://the403-e7189.firebaseio.com",
    projectId: "the403-e7189",
    storageBucket: "the403-e7189.appspot.com",
	messagingSenderId: "975648852002"
};
firebase.initializeApp(config);
let firestore = firebase.firestore();
console.log("DB Loaded");

var db = firebase.firestore();

const timestamps = firebase.firestore();
const settings = {
    timestampsInSnapshots: true
};
firestore.settings(settings);

function darkMode(on_off) {
	if (on_off) 
	{
		$(".row").css("background-color","black");
		$(".container").css("background-color","black");
		$("p").css("color","white");
		$("h1").css("color","white");
		$("body").css("background-color","black");
		$("html").css("background-color","black");
	}
	else
	{
		$(".row").css("background-color","white");
		$(".container").css("background-color","white");
		$("p").css("color","black");
		$("h1").css("color","black");
		$("body").css("background-color","white");
		$("html").css("background-color","white");
	}
}

function checkUser(type)
{
	var lUser = $('#email_login').val();
	var lPasswd = $('#password_login').val();
	
	var rUser = $('#email_input').val();
	var rPasswd = $('#password_input').val();
	var fName = $('#firstName_input').val();
	var lName = $('#lastName_input').val();

	if (type == 'l') 
	{
		if (lUser && lPasswd) 
		{
			userFunctions('log',lUser, lPasswd, null, null);
		}
	}
	else if (type == 'r') 
	{
		if (rUser && rPasswd && fName && lName) 
		{
			userFunctions('reg',rPasswd, rPasswd, fName, lName);
		}
	}
	else
	{
		console.log('some shit went wrong');
	}
}

function userFunctions(type, email, password, first_name, last_name)
{
	if (type == 'log') 
	{
		firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) 
		{
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  if (errorCode == 'auth/user-not-found') 
		  {
		  	$('#login').modal('hide');
		  	$('#resgister').modal('show');
		  	alert("Email doesn't exist \n please resgister");
		  }
		});
	}
	else if (type == 'reg') 
	{
		firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) 
		{
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  console.log(errorCode, errorMessage);
		  alert(errorMessage); 
		});
	}
	var user = initSet();
	/*if (user != null) 
	{
		if (type == 'reg') 
		{
			db.collection("user").doc("LA").set({
			    name: "Los Angeles",
			    state: "CA",
			    country: "USA"
			})
			.then(function() {
			    console.log("Document successfully written!");
			})
			.catch(function(error) {
			    console.error("Error writing document: ", error);
			});
		}
		else
		{

		}
	}*/
}

function initSet()
{
	firebase.auth().onAuthStateChanged(function(user) 
	{
	  if (user) 
	  {
	  	Cookies.set('data', user);
	  	return user;
	  } else 
	  {
	  	Cookies.remove('data');
	  	return null;
	  }
	});
}

//displays the login dropdown when button is clicked 
$('#btnStart').click(function() 
{
	$('#login').modal('show');
});

//runs on every startup of the page
$(document).ready(function()
{
	var d = new Date();
	if(d.getHours() <= 5 || d.getHours() >= 17)
	{
		darkMode(true);
	}
});