let user;
firebase.initializeApp(firebaseConfig);

if(firebase){
    console.log("%c Firebase Has Been Loaded", "color:orange; font-weight: bold;");
}

function login() {
    console.log("Button Clicked");
    //TODO get user and pass for input boxes
    let password = "Password123";
    let email = "zeeshanbadr@gmail.com";

    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage);
            //TODO add error handler
    });
}

function userSignedIn() {
    console.log("setting up signed in user view");
    //TODO do the signed up user view
}

function userSignedOut() {
    console.log("setting up signed out user view");
    //TODO do the signed out user view
}



firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        console.log("%c User Logged In", "color:green;");
        userSignedIn();
        //TODO add Sign Out user button
    } else {
        console.log("%c No User Logged In / Exists", "color:red;");
        //TODO Hide Sign Out user button
    }
});

$(document).ready(function () {
    console.log("%c Page Has Been Loaded", "color:blue; font-weight: bold;");
});