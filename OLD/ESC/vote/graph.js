var firebaseRef = firebase.database().ref('question'); 

firebaseRef.on("value", gotData, errData);
var aT = 'A'; 
var bT = 'B'; 
var chart = document.getElementById("chart").getContext('2d');
var graph = new Chart(chart, {
    type: 'bar',
    data: {
        labels: ["a", "b"],
        datasets: [{
            label: 'empty',
            data: [0, 0],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: { 
        legend: {
            labels: {
                fontColor: "white"
            }
        },
        scales: {
            yAxes: [{
                ticks: {
                    fontColor: "white",
                    stepSize: 1,
                    beginAtZero: true
                }
            }],
            xAxes: [{
                ticks: {
                    fontColor: "white",
                    stepSize: 1,
                    beginAtZero: true
                }
            }]
        }
    }
});

function gotData(data) {
    graph.destroy();
    ffData = data.val();
    keys = Object.keys(ffData);
    $("#question").text(ffData['title']);
    aT =  ffData['Aside']; 
    bT = ffData['Bside']; 
    $('#A').text(aT);
    $('#B').text(bT);
    graph = up(ffData['countA'],ffData['countB'], chart);
}

function errData(data) {
    console.log("Error!!");
    console.log(data);
}

function up(a , b , ctx){
    return new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [aT, bT],
        datasets: [{
            label: '# of Votes',
            data: [a, b],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: { 
        legend: {
            labels: {
                fontColor: "white"
            }
        },
        scales: {
            yAxes: [{
                ticks: {
                    fontColor: "white",
                    beginAtZero: true
                }
            }],
            xAxes: [{
                ticks: {
                    fontColor: "white",
                    stepSize: 1,
                    beginAtZero: true
                }
            }]
        }
    }
});
}