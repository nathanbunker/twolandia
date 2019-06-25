var x = 130;
var y = 400;
var x2 = 500;
var y2 = 400;
var w = 1;
var t = 0;
var v = 400;


var start = function() { 
	processing.fill(w-200, w-200, w-200, w+200);
	processing.textSize(290);
	processing.text("we", x2, y2);
	processing.fill(w-200, w-200, w-200, w+200);
	if(t >= 150) {
	processing.text("lcome", x-50, y);
	processing.text("you", x, 330);
	}
	v--;
	t += 1;
	if(x <= 450) {
		x += 3;
	}
	if(y >= 160) {
		y -= 3;
	}
	if(x2 >= 10) {
		x2 -= 4;
		}
	if(y2 >= 160) {
		y2 -= 5;
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
