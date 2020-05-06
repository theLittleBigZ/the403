var canvas, context;
var blockArr=[];

function update(){
    draw();
    move();
}

function draw(){    
    drawBlock(0,0, canvas.width,canvas.height, 'black'); 
    
    for(var i = 0; i < blockArr.length; i++)
        blockArr[i].draw();
}
function move(){    
    for(var i = 0; i < blockArr.length; i++)
        blockArr[i].move(); 
}

function drawBlock(x,y, width,height, color){
    ctx.fillStyle = color;
    ctx.fillRect(x,y, width,height);    
} 
var tempUpdateX = tempUpdateY = 0;
var blockSize = 60;//Change this to change all the blocks' sizes
function block(){    
    this.width = this.height = blockSize;    
    this.x_location = 5;
    this.y_location = -300;    
    this.y_vel = 0;
    this.y_acc = 0;    
    this.bounce = 0.9;
  
    var color = ['#6afdfe', '#fc58ff', '#9d88a2', '#355391', '#0f8584', '#aefdf9', '#fa04bf', '#F00040'];    
    var colIndex = Math.floor(Math.random()*color.length);    
    
    this.draw = function(){
        drawBlock(this.x_location,this.y_location, this.width,this.height, color[colIndex]);        
    }    
    this.move = function(){        
        if(this.y_location > canvas.height-this.height){
            this.y_vel= -(this.y_vel * this.bounce);
            this.bounce -= 0.5;
        }        
        this.y_location += this.y_vel;    
        this.y_vel += this.y_acc;  
    }    
    this.startFalling = function(){
        this.y_vel = Math.floor((Math.random() * 3) + 1);
        this.y_acc = Math.floor((Math.random() * 3) + 1);
    }     
    this.updateStarting_xLocations = function(){
       this.x_location += tempUpdateX; 
    }
    this.updateStarting_yLocations = function(){
       this.y_location += tempUpdateY; 
    }
}

function addBlocks_toArray(){ 
    var blocks_per_row = (canvas.width/blockSize);
    var num_rows = (canvas.height/blockSize);
    
    for(var j = 0; j < num_rows; j++)
        row();
  
    function row(){
        for(var i = 0; i < blocks_per_row; i++){    
            var tempBlock = new block();
            tempBlock.updateStarting_yLocations(); 
            tempBlock.updateStarting_xLocations();   
            tempUpdateX += (blockSize*2);
            blockArr.push(tempBlock);              
        }
        tempUpdateX = 0;
        tempUpdateY +=(blockSize*2);
    }
}

window.onload = function(){
    (function(){
        canvas = document.getElementById('canvas');
        ctx = canvas.getContext('2d');        

        window.addEventListener('resize', resizeCanvas, false);
        function resizeCanvas(){
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resizeCanvas();                
        addBlocks_toArray();         
        var framesPerSecond = 20; 
        setInterval(update, 1000/framesPerSecond); 
    })();

    var started = false;
    if (!started){
        for(var i = 0; i < blockArr.length; i++)
            blockArr[i].startFalling();
        
        started = true;
    }
    else{
        drawBlock(0,0, canvas.width,canvas.height, 'black');
        blockSize = Math.floor((Math.random() * 20) + 5);
        blockArr = [];
        tempUpdateX= tempUpdateY = 0;
        addBlocks_toArray();  
        started = true;
    }

    $('#logo').animate({
        fontSize: '600%'
    }, 2500);

    $('#fullpage').fullpage({
        responsiveWidth: 768
    }); 

    var countDownDate = new Date("Mar 11, 2019 20:00:00").getTime();

    var x = setInterval(function() {
      var now = new Date().getTime();
      var distance = countDownDate - now;
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      document.getElementById("count").innerHTML = days + "d " + hours + "h "
      + minutes + "m " + seconds + "s ";    
      if (distance < 0) {
        clearInterval(x);
        document.getElementById("count").innerHTML = "The Event is over";
      }
    }, 1000);

}