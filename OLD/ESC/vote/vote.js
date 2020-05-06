var firebaseRef = firebase.database().ref('question'); 

firebaseRef.on("value", gotData, errData);

var voting = true;
var choose = null; 
var amountA = 0;
var amountB = 0;


$("#abtn").click(function(event) {
    amountA += 1; 
    choose = 'a'; 
    firebase.database().ref().child('/question').update({countA : amountA});
    voting = false; 
    checkV();
});


$("#bbtn").click(function(event) {
    amountB += 1;
    choose = 'b';  
    firebase.database().ref().child('/question').update({countB : amountB});
    voting = false;
    checkV();
});

$('#down').click(function(event) {
    if (choose == 'a') {
        amountA -= 1;
        vote = true;
        firebase.database().ref().child('/question').update({countA : amountA});
        res(); 
    }
    else if (choose == 'b') {
        amountB -= 1;
        vote = true; 
        firebase.database().ref().child('/question').update({countB : amountB});
        res();
    }
});

$("#question").change(function(){
console.log('fire!!'); 
  voting = true; 
  checkV(); 
}); 

function res() {
    $('#abtn').removeAttr("disabled");
    $('#bbtn').removeAttr("disabled");
    $('#down').attr("disabled", "disabled");
}

function checkV(){
    if (!voting) {
        $('#abtn').attr("disabled", "disabled");
        $('#bbtn').attr("disabled", "disabled");
        $('#down').removeAttr("disabled");
    }
    else {
        $('#abtn').removeAttr("disabled");
        $('#bbtn').removeAttr("disabled");
        $('#down').attr("disabled", "disabled");
    }
}


function gotData(data) {
    ffData = data.val();
    keys = Object.keys(ffData);
    console.log(ffData, keys);
    if ($("#question").text() != ffData['title']) {
        console.log("fire!");
        $("#question").text(ffData['title']);
        voting = true; 
        checkV(); 
    } 
    $('#A').text(ffData['Apos']);
    $('#B').text(ffData['Bpos']);
    amountA = ffData['countA'];
    amountB = ffData['countB']; 
}

function errData(data) {
    console.log("Error!!");
    console.log(data);
}