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

}

function userFunctions(type, email, passwd, first_name, last_name, callback)
{
	callback();
}