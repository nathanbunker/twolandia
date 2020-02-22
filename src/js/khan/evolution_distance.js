
var numbot = 100;//evo
//distance
var runtime = 0;
var maxdist = 0;
var maxh = 0;
var maxl = 0;
var maxte = 0;


var s = 0.7;
var tx = 0;
var ty = 0;
var keys = [];
var mobs = [];
var mob = function(x,y,oh,ol,te){
    this.x = x;
    this.y = y;
    this.code = mobs.length;
    this.dead = false;
    
    this.oh = oh;
    this.ol = ol;
    
    this.h = 0;
    this.l = 0;
    
    this.t = 0;
    this.te = te;
    
    this.age = 0;
 

};

mob.prototype.draw = function() {
    
    if(this.oh > -0.5) {this.oh = random(-5, 5);}
    
    this.t += 0.1;
    if(this.t > this.te) {this.t = 0;}
    
    
    for(var i = mobs.length - 1; i >= 0; i--) {
        if(dist(this.x,this.y,mobs[i].x,mobs[i].y) < 10) {}
        
        if(runtime > 45) {
            if(this.x >= maxdist) {
                maxdist = this.x;
                maxh = this.oh;
                maxl = this.ol;
                maxte = this.te;
            }
        this.dead = true;
        }
    }
    
    this.x += this.l;
    this.y += this.h;
    this.h += 0.03;
    if(this.x >= 0) {
    if(this.y > 300) {this.y = 300; this.l = 0; this.h = -0.1;}
    }
    this.l -= 0.005;
    
    if(this.t > this.te - 1 && this.y === 300) {
        this.h = this.oh;
        this.l = this.ol;
        
    }
    fill(255, 255, 255);
    if(this.x >= maxdist) {
        fill(60, 255, 0);
    }
    strokeWeight(3);
    ellipse(this.x,this.y,15,15);

};


draw = function() {
    background(255, 255, 255);
    
    if(mobs.length < numbot && maxdist === 0) {
        mobs.push(new mob(10,300,random(-3,3),random(-1,0.3),random(1,50)));
    }
    if(mobs.length < numbot && maxdist > 0) {
        mobs.push(new mob(10,300,maxh+random(-0.2, 0.2),maxl+random(-0.1, 0.1),maxte+random(-0.1, 0.1)));
    }

    if(keyIsPressed && keyCode === RIGHT) {
        tx -= 5;
    }
    if(keyIsPressed && keyCode === LEFT) {
        tx += 5;
    }
    if(keyIsPressed && keyCode === UP) {
        s += 0.01;
        ty -= 1;
    }
    if(keyIsPressed && keyCode === DOWN) {
        s -= 0.01;
        ty += 1;
    }
    translate(tx,ty);
    scale(s);
        

    for(var i = mobs.length - 1; i >= 0; i--) {
       mobs[i].draw();
       
       if(runtime > 45) {
           mobs[i].dead = true;
        }
       
       if (mobs[i].dead === true) {
            mobs.splice(i, 1);
        }
    }
    noFill();
    rect(0, 300, 9000, 9000);
    
    fill(0, 0, 0);
    textSize(40);
    text("max distance: "+round(maxdist), 5, 355);
    text("number or creatures: "+numbot, 5, 397);
    text(round(runtime), 766, 355);
    
    runtime += 0.1;
    if(runtime > 46) {runtime = 0;}
    stroke(0, 51, 255);
    line(maxdist,-900,maxdist,1600);

    
    stroke(0, 0, 0);
    rect(0, 200, 1, 200);
    rect(500, 200, 1, 200);
    rect(1000, 200, 1, 200);
    rect(1500, 200, 1, 200);
    rect(2000, 200, 1, 200);
    rect(2500, 200, 1, 200);
    rect(3000, 200, 1, 200);
    rect(3500, 200, 1, 200);
    rect(4000, 200, 1, 200);
    rect(4500, 200, 1, 200);
    rect(5000, 200, 1, 200);
    rect(5500, 200, 1, 200);
    rect(6000, 200, 1, 200);
    rect(6500, 200, 1, 200);
    rect(7000, 200, 1, 200);
    rect(7500, 200, 1, 200);
    
    
};

keyPressed = function(){
    keys[keyCode] = true;

};
keyReleased = function(){
    keys[keyCode] = false;
};