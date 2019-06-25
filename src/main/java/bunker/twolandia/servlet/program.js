var x = 130;
var y = 200;
var x2 = 500;
var y2 = 0;
var w = 1;
var t = 0;


var start = function() { 
	processing.fill(w, w, w, w);
	processing.textSize(290);
	processing.text("wel", x2, y2);
	processing.fill(w, w, w, w);
	processing.text("come", x, y);
	t += 1;
	if(x <= 450) {
		x += 3;
	}
	if(y <= 390) {
		y += 3;
	}
	if(x2 >= 10) {
		x2 -= 4;
		}
	if(y2 <= 390) {
		y2 += 5;
	}
	if(t >= 1) {w++;}
}

processing.keyPressed = function() {
	
	
	processing.keyIsPressed = true;
}

processing.mousePressed = function() {
	processing.mouseIsPressed = true;
}

processing.mouseReleased = function() {
	processing.mouseIsPressed = false;
}


processing.draw = function() {
	processing.background(255, 255, 255);
	processing.strokeWeight(1);
	
	start();

	processing.keyIsPressed = false;
}
