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
console.log("Cloud Firestores Loaded");

var db = firebase.firestore();

const timestamps = firebase.firestore();
const settings = {
    timestampsInSnapshots: true
};
firestore.settings(settings);



//checks if data given exists in the FireBase Database
function CheckUser(){
	//get user data from FireBase if data DNE then create the user with resgister
	var email = $('#email_input').val();
	var passwd = $('#password_input').val();
	var ref = db.collection('users').doc(email);

	ref.get().then(function(doc){
		if (doc.data()) {
			//console.log(doc.data());
			preAuth(doc.id, passwd, doc.data());
		}else{
			//console.log("No such document!");
			preAuth(email, passwd, false);
		}
	}).catch(function(err){
		console.log("error", err); 
	});
}

function preAuth(email, pass, doc){
	console.log(doc, email, pass);
	if(!doc){
		console.log('hello');
	}
	else{
		signIn(email, pass, doc, 0);
	}
}

//uses data given to build page spesific to the user [note]: type is to indcate 
//if sign-in is from login (0) or register (1)  
function signIn(email, pass, doc, loc){
	console.log(email, pass, doc, loc);
}

//uses data to create a user in the FireBase DataBase them sign user in 
function Resgiser(email, pass, first, last){
	firebase.ref('user/' + user).set({
		email: email,
		password: pass,
		first_name: first,
		last_name: last
	});
	SignIn(email, pass, 1)
}

//displays the register form to the user and hides the login form
function RegForm(){	
	$('#resgiser_form').show();
	$('#login_form').hide();
	$('#btn_log').show();
	$('#btn_reg').hide();
	$('#log_title').text('Resgister');
}

function CheckDom(){
	
}

//runs on every startup of the page
$(document).ready(function(){
	var d = new Date();
	if(d.getHours() <= 5 || d.getHours() >= 17){
		$(".row").css("background-color","black");
		$(".container").css("background-color","black");
		$("p").css("color","white");
		$("h1").css("color","white");
		$("body").css("background-color","black");
		$("html").css("background-color","black");
	}
	//the above changes the site to a dark theme at night; 
});

//displays the login dropdown when button is clicked 
$('#btnStart').click(function() {
	$('#login').modal();
});

