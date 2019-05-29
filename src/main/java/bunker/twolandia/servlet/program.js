var x = 200;
var y = 264;
var sunSize = 100;
var sun = true;



var drawIsland1 = function() {
	processing.fill(153, 77, 0);
	processing.stroke(0, 0, 0);
	processing.rect(70, 250, 220, 53, 100);//dirt
	processing.fill(128, 255, 255);
	processing.stroke(128, 255, 255);
	processing.rect(70, 220, 220, 50);//dirt cut
	processing.fill(51, 204, 51);
	processing.stroke(41, 204, 41);
	processing.rect(80, 270, 6, 50, 50);//vines
	processing.rect(100, 270, 6, 60, 50);
	processing.rect(130, 270, 6, 35, 50);
	processing.rect(145, 270, 8, 70, 50);
	processing.rect(65, 270, 230, 12, 50);//grass
	processing.fill(153, 77, 0);
	processing.stroke(153, 77, 0);
	processing.rect(87, 280, 12, 10, 50);//vine dirt
	processing.rect(137, 279, 7, 10, 50);
	
	
	
};

var drawSun = function() { 
	processing.fill(240, 240, 0);
	processing.stroke(230, 230, 0);
	processing.ellipse(200, 100, 50, 50);//sun
	processing.strokeWeight(7);
	processing.stroke(240, 240, 0, 70);
	processing.noFill();
	processing.arc(200, 100, sunSize, sunSize, -312, 47);//ray
	//size
	if(sun === true) {
	sunSize += 0.1;
	}	
	if (sunSize >= 80) {sun = false;}
	if (sun === false) {sunSize -= 0.1;}
	if (sunSize <= 70) {sun = true;}
	
};

var drawPlayer = function() { 
	processing.stroke(0, 0, 0);
	processing.fill(0, 0, 255);
	processing.ellipse(x-3, y+4, 6, 10);//legs
	processing.ellipse(x+3, y+4, 6, 10);
	processing.fill(255, 195, 77);
	processing.ellipse(x, y, 11, 11);//body
	processing.strokeWeight(2);
	processing.point(x-2, y-1);
	processing.point(x+2, y-1);
	processing.strokeWeight(1);
	//move
	if (processing.keyIsPressed && processing.keyCode === processing.RIGHT) {
		x+=3;
	}
	if (processing.keyIsPressed && processing.keyCode === processing.LEFT) {
		x-=3;
	}
	if (processing.keyIsPressed === false
			|| processing.keyCode === processing.UP
			|| processing.keyCode === processing.DOWN) {
		x+=0;
		x-=0;
	}
	
	//fall off island 1
	if (x >= 295) {y = y + 3;}
	if (x <= 65) {y = y + 3;}
	if (x >= 65 || x <= 295 && y <= 264) {y = y + 3;}
	if(y >= 264 && y <= 274 && x >= 65 && x <= 295) {y = 264;}
	
	//falling loop
	if(y >= 410) {y = -20;}
	

	
};

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
	processing.background(128, 255, 255);
	processing.strokeWeight(1);
	
	drawIsland1();
	
	drawPlayer();
	drawSun();

	processing.keyIsPressed = false;
}
