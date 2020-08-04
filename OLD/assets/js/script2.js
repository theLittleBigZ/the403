/* 
Main Script File
this file contians all required JS functions for the 403.tk to function
Zeeshan Badr
*/
//config for connection + initaliztion of FireBase 
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
		$(".modal-header").css("background-color","black");
		$(".modal-body").css("background-color","black");
		$(".modal-footer").css("background-color","black");
		$(".container").css("background-color","black");
		$("p").css("color","white");
		$("h1").css("color","white");
		$("label").css("color","white");
		$("body").css("background-color","black");
		$("html").css("background-color","black");
	}
	else
	{
		$(".row").css("background-color","white");
		$(".container").css("background-color","white");
		$(".modal-header").css("background-color","white");
		$(".modal-body").css("background-color","white");
		$(".modal-footer").css("background-color","white");
		$("p").css("color","black");
		$("h1").css("color","black");
		$("label").css("color","black");
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
			userFunctions('reg',rUser, rPasswd, fName, lName);
		}
	}
	else
	{
		console.log('some shit went wrong \n error 82');
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
	initSet(type, dbAdd(first_name, last_name, type));
}

function initSet(type, callback)
{
	firebase.auth().onAuthStateChanged(function(user) 
	{
	  if (user) 
	  {
	  	Cookies.set('data', user);
	  	if (type == 'reg') 
		{
			firebase.auth().currentUser.sendEmailVerification().then(function() 
			{
				alert('Email Verification Sent!');
			});
		}
	  } 
	  else 
	  {
	  	Cookies.remove('data');
	  }
	});
}

function dbAdd(first_name, last_name, type)
{
	var user = JSON.parse(Cookies.get('data'));
	if (user != null || user != undefined) 
	{
		if (type == 'reg') 
		{
			console.log('here \n', user);
			db.collection("users").doc(user.uid).set({
			    name: first_name,
			    surname: last_name
			})
			.catch(function(error) {
			    console.error("fucking error writing document: ", error);
			});
		}
		else if (type != 'log') 
		{
			console.log("Another mother fucking error \n error 141");
		}
	}
	if (user.uid) 
	{
		$('#thePath').removeAttr('hidden');
	}
}

//displays the login dropdown when button is clicked 
$('#btnStart').click(function() 
{
	$('#login').modal('show');
});

$('#DM').change(function(event) {
	if ($(this).is(':checked')) 
	{
		darkMode(true);
	}
	else
	{
		darkMode(false);
	}
});

//runs on every startup of the page
$(document).ready(function()
{
	var d = new Date();
	if(d.getHours() <= 5 || d.getHours() >= 17)
	{
		$('#DM').click();
	}
});