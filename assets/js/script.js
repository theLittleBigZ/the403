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
	//console.log('CheckUser');
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

function preReg(){
	//console.log('preReg');
	var email = $('#email_input').val();
	var passwd = $('#password_input').val();
	var Fname = $('#firstName_input').val();
	var Lname = $('#lastName_input').val();

	resgiser(email, passwd, Fname, Lname);
}

function preAuth(email, pass, data){
	//console.log('preAuth');
	if(!data){
		$('#resgister').modal();
	}
	else{
		SignIn(email, pass, data, 0);
	}
}

//uses data given to build page spesific to the user [note]: type is to indcate 
//if sign-in is from login (0) or register (1)  
function SignIn(email, pass, data, loc){
	console.log(email, pass, data, loc);
}

//uses data to create a user in the FireBase DataBase them sign user in 
function resgiser(email, pass, first, last){
	//console.log('resgiser');
	var key = randomStr(16);
	pass = encrypt(pass, key); 
	db.collection("users").doc(email).set({
		password: pass, 
		first_name: first, 
		last_name: last, 
		key: key
	}).then(function(){
		
	}).catch(function(){
		console.log('EVERYTHING WANT TO SHIT');
	});
	SignIn(email, pass, 1)
}

function CheckDom(){
	if(!location.hostname.match('the403.tk')){
		window.location.replace("/html/move.html");
	}
}

function encrypt(value, key){
	var x = CryptoJS.AES.encrypt(value, key);
	return x; 
}

function decrypt(value, key){
	var x = CryptoJS.AES.decrypt(value, key);
	return x.toString(CryptoJS.enc.Utf8);
}

function randomStr(length){
	var res =""; 
	for (var i = 0; i < length; i++) {
		var x = Math.floor((Math.random()*63)+33); 
		res += String.fromCharCode(x);
	}
	return res; 
}

function setCookie(name, data, exp){
	var d = new Date();
 	d.setTime(d.getTime() + (exp * 24 * 60 * 60 * 1000));
 	var expires = "expires="+d.toUTCString();
 	document.cookie = name + "=" + value + ";" + expires + ";path=/";
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
});

//displays the login dropdown when button is clicked 
$('#btnStart').click(function() {
	$('#login').modal();
});

