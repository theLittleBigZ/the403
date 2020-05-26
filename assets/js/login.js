firebase.initializeApp(firebaseConfig);

if(firebase){
    console.log("%c FireBase Has Been Loaded", "color:orange; font-weight: bold;");
}

$(document).ready(function () {
    console.log("%c Page Has Been Loaded", "color:blue; font-weight: bold;");
});

function login() {
    console.log("Button Clicked");

    let password = "Password123";
    let email = "zeeshanbadr@gmail.com";

    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage);
    });
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
    } else {
        console.log("%c No User Logged In / Exists", "color:red;");
    }
});