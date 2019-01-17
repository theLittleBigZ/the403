/*
Main Script File
this file contians all required JS functions for the 403.tk to function
Zeeshan Badr
*/

//config for connection + initaliztion of FireBase  
var config = {
/*your info here*/
};
firebase.initializeApp(config);
var db = firebase.database();

//checks if data given exists in the FireBase Database
function CheckUser(email, pass){
	//get user data from FireBase if data DNE then create the user with resgister
	/*
	*
	*
	*/
	var email = $('[name="email_input"]').val();
	var passwd = $('[name="password_input"]').val();

	console.log(user + '\n' + email + '\n' + pass);
}

//uses data given to build page spesific to the user [note]: type is to indcate 
//if sign-in is from login (0) or register (1)  
function SignIn(email, pass, loc){

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

//displays the login form to the user and hides the register form
function LogForm(){	
	$('#resgiser_form').hide();
	$('#login_form').show();
	$('#btn_log').hide();
	$('#btn_reg').show();
	$('#log_title').text('Login');
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
	$('#resgiser_form').hide();
	$('#btn_log').hide();
	//the above prettifies the login/resgister dropdown
});

//displays the login dropdown when button is clicked 
$('#btnStart').click(function() {
	$('#login').modal();
});

