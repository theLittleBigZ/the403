if(getCookie('state') != "logged" || getCookie('state') == ""){
    firebase.auth().signOut();
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
    }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function login() {
    console.log("Login");
    let fields = $("#loginForm").serializeArray();
    let email = fields[0]['value'];
    let password = fields[1]['value'];

    firebase.auth()
        .signInWithEmailAndPassword(email, password)
        .then(function(user){
            setCookie("state", "logged", 2);
            modalController({loginModal:'hide'});
        })
        .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage);
            //TODO add error handler
    });
}

function register() {
    console.log("Register");
    let fields = $("#regForm").serializeArray();

    let email = fields[0]['value'];
    let displayName = fields[1]['value'];
    let password = fields[2]['value'];

    firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .then(function(user) {
            //console.log("user data:", user['user']);
            let currentUser = firebase.auth().currentUser;

            currentUser.updateProfile({
                displayName: displayName,
            }).then(function() {
                modalController({regModal:'hide'});
            }).catch(function(error) {
                console.log(error);
                //TODO add error handler
            });
        })
        .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage);
            //TODO add error handler
        });
}

function userSignedIn() {
    console.log("setting up signed in user view");
    let content = db.collection("content").doc("index");
    content.get().then(function(doc){
        if(doc.exists){
            let dbData = doc.data();
            $("head").html(dbData['header']);
            $("body").html(dbData['body']);
        }
        else{
            console.log("No such document!, this is a very big problem");
        }
    }).catch(function(err){
        console.log(err);
        alert("okay so there was a bit of a problem try contacting theLittleBigZ ans ask him to get his shit together");
    });
}

function userSignedOut() {
    console.log("setting up signed out user view");
    let content = db.collection("content").doc("login");
    content.get().then(function(doc){
        if(doc.exists){
            let dbData = doc.data();
            $("head").html(dbData['header']);
            $("body").html(dbData['body']);
            firebase.auth().signOut();
            location.reload();
        }
        else{
            console.log("No such document!, this is a very big problem");
        }
    }).catch(function(err){
        console.log(err);
        alert("okay so there was a bit of a problem try contacting theLittleBigZ ans ask him to get his shit together");
        firebase.auth().signOut();
    });
}

function modalController (modals) {
    for(name in modals){
        $("#" + String(name)).modal(modals[name]);
    }
}

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        /**var displayName = user.displayName; //check
        var email = user.email; //check
        var emailVerified = user.emailVerified; //uncheck
        var photoURL = user.photoURL; //check
        var isAnonymous = user.isAnonymous; //uncheck
        var uid = user.uid; //uncheck
        var providerData = user.providerData; //uncheck**/

        console.log("%c User Logged In", "color:green;");
        userSignedIn();
    } else {
        console.log("%c No User Logged In / Exists", "color:red;");
    }
});

$(document).ready(function () {
    console.log("%c Page Has Been Loaded", "color:blue; font-weight: bold;");
});