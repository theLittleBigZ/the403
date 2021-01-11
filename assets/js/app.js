function modalController(modal, options){
    
}
//Testing Code
if (window.location.href.includes("127.0.0.1")) {
    console.log(firebase);
    var Development = true;
}
//App Code (Functional Client-side code)
const auth = firebase.auth();
const db = firebase.firestore();
const whenSignedIn = document.getElementById("whenSignedIn");
const whenSignedOut = document.getElementById("whenSignedOut");
let unsub;

$("#login").click(function () {
    let usr = $("#email").val();
    let paswd = $("#pwd").val();
    firebase
        .auth()
        .signInWithEmailAndPassword(usr, paswd)
        .catch(function (error) {
            //TODO: handle errors
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage);
            if(errorCode == "auth/wrong-password"){

            }
        });
    $("#loginM").modal("hide");

    if (Development) {console.log(usr, paswd);}
});

$("#signInG").click(function() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);

    $("#loginM").modal("hide");
});

$("#signInA").click(function () {
    firebase
        .auth()
        .signInAnonymously()
        .catch(function (error) {
            //TODO: handle errors
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
        $("#loginM").modal("hide");
});

$("#register").click(function () {
    let usr = $("#email").val();
    let paswd = $("#pwd").val();
    firebase
        .auth()
        .createUserWithEmailAndPassword(usr, paswd)
        .catch(function (error) {
            //TODO: handle errors
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
        $("#loginM").modal("hide");

    if (Development) {console.log(usr, paswd);}
});

$("#signOutBtn").click(function () {
    auth.signOut();
});

auth.onAuthStateChanged((user) => {
    if (user) {
        // signed in
        whenSignedIn.hidden = false;
        whenSignedOut.hidden = true;
        console.log(user, user.uid);
    } else {
        // not signed in
        whenSignedIn.hidden = true;
        whenSignedOut.hidden = false;
    }

    if (Development) {}
});

//Page Code (Code for visual portions)
$("#signInBtn").click(function () {
    $("#loginM").modal("show");
});
