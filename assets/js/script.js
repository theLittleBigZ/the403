var config = {
    apiKey: "AIzaSyCpeW7zSFbo1UmM0d0iARIC4jY9Jp5w-j8",
    authDomain: "the403-e7189.firebaseapp.com",
    databaseURL: "https://the403-e7189.firebaseio.com",
    projectId: "the403-e7189",
    storageBucket: "the403-e7189.appspot.com",
    messagingSenderId: "975648852002"
};
firebase.initializeApp(config);
var database = firebase.database();

function signin(user, email, pass){
	
}

function resgiser(user, email, pass, first, last){
	firebase.ref('user/' + user).set({
		email: email,
		password: pass,
		first_name: first,
		last_name: last
	});
}

$(document).ready(function(){
	var d = new Date();
	console.log(d.getHours());
	if(d.getHours() <= 5 || d.getHours() >= 17){
		console.log('black')
		$(".row").css("background-color","black");
		$(".container").css("background-color","black");
		$("p").css("color","white");
		$("h1").css("color","white");
		$("body").css("background-color","black");
		$("html").css("background-color","black");
	}
	$('#resgiser_form').hide();
	$('#btn_log').hide();
});

$('#btnStart').click(function() {
	$('#login').modal();
});

