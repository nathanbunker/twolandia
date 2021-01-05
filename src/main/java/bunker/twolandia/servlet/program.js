
function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}

var mySound = new sound("bounce.mp3");
var time = 0;

var toplazer = function(t,x) {
    noStroke();
    if(time > t-0.5 && time < t) {
        fill(255, 0, 0,70);
    }
    else if(time >= t && time < t+0.2) {
        fill(255, 0, 0);
    }
    else{
        noFill();
    }
    
    rect(x,0,70,659);
};

var playSound = false;

draw = function() {
    background(255, 255, 255);
    
    toplazer(0,200);

    fill(0, 153, 255);
    noStroke();
    rect(mouseX-15,mouseY-15,30,30);
    
    
    fill(255,0,0);
    //text(playerName,3,20);
    text(time,3,40);


    
    if(mouseButton === LEFT) {
        time += 0.01;
        playSound = true;
    }
    if(mouseButton === RIGHT) {
        time = 0;
        playSound = false;
    }

    if (playSound)
    {
       mySound.play();	
    }
};
