var firebaseConfig = {
    apiKey: "AIzaSyCpeW7zSFbo1UmM0d0iARIC4jY9Jp5w-j8",
    authDomain: "the403-e7189.firebaseapp.com",
    databaseURL: "https://the403-e7189.firebaseio.com",
    projectId: "the403-e7189",
    storageBucket: "the403-e7189.appspot.com",
    messagingSenderId: "975648852002",
    appId: "1:975648852002:web:a42fac244478c4cca6627b"
};

firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
if(firebase && db){
    console.log("%c Firebase Has Been Loaded", "color:orange; font-weight: bold;");
}else{
    console.log("%c Error Loading Firebase", "color:red; font-weight: bold;");
}