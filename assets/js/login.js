firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
if(firebase && db){
    console.log("%c Firebase Has Been Loaded", "color:orange; font-weight: bold;");
}else{
    console.log("%c Error Loading Firebase", "color:red; font-weight: bold;");
}

const x = document.cookie;
console.log(x);
if (x.search('logged') == -1){
    firebase.auth().signOut();
}


function login() {
    console.log("Login");
    let fields = $("#loginForm").serializeArray();
    let email = fields[0]['value'];
    let password = fields[1]['value'];

    firebase.auth()
        .signInWithEmailAndPassword(email, password)
        .then(function(user){
            document.cookie = "state=logged;";
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

    db.collection("content").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
        });
    });


}

function userSignedOut() {
    console.log("setting up signed out user view");
    //TODO do the signed out user view
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
        userSignedOut();
    }
});

$(document).ready(function () {
    console.log("%c Page Has Been Loaded", "color:blue; font-weight: bold;");
});