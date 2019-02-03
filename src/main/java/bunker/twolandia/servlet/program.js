var player1 = {x : 203, y : 221};
var player2 = {x : 253, y : 221};
var x = 203; // Position of the player
var y = 221; // it doesn't move, except in going into the water
var t = processing.random(0, 400);
var pondPos = processing.random(0, 400);
var wood = 0;
var time = 50;// 50
var sx = processing.random(600, 1000);
var sy = 305;
var st = 1;
var sm = processing.random(sx + 4, sx - 4);
var sweed = 2;// 2
var swy = 249;
var fix = 72;
var f = false;
var cx = processing.random(0, 400);
var flx = 196;
var hx = 677;
var h1 = processing.random(43, 107);
var h2 = processing.random(47, 107);
var h3 = processing.random(49, 107);
var h4 = processing.random(50, 107);
var h5 = processing.random(53, 107);
var fox = -10050;
var to = 699;
var bx = 190;
var by = 154;
var back = false;
var up = false;
var bt = 0;
var inventory = false;
var rm = 0;
var gn = 0;
var db = 3000;
var d = false;
var chestx = 3000;
var start = true;
var food = processing.random(0, 22);
var s = processing.round(food);
var trade = false;// false
var hnb = false;// false
var a = 9;

/*
 * to do: make animals. ;sheep. ;fish. ;bird. ; add house.* make use of gold.!
 * make use of treasures.! create longer loops.!
 */

var drawPlayer = function(p) {
	processing.fill(255, 145, 0); // orange for the body
	processing.rect(p.x, p.y, 6, 10);// body
	processing.fill(235, 202, 132); // tan (skin color)
	processing.rect(p.x, p.y - 2, 6, 5); // head
	// arms
	processing.rect(p.x - 1, p.y + 2, 1, 6); // left arm
	processing.rect(p.x + 6, p.y + 2, 1, 6); // right arm
	// fall in pond
	processing.fill(0, 0, 0);
	if (p.x <= pondPos + 50 && p.x >= pondPos - 50) {
		p.y = 255;
	}
	// get out of pond
	if (p.x >= pondPos + 50 || p.x <= pondPos - 50 && p.y === 255) {
		p.y = 221;
	}
	// move
	if (processing.keyIsPressed && processing.keyCode === processing.RIGHT) {
		processing.point(p.x + 5, p.y + 0);
		processing.point(p.x + 3, p.y + 0);
	}
	if (processing.keyIsPressed && processing.keyCode === processing.LEFT) {
		processing.point(p.x + 1, p.y + 0);
		processing.point(p.x + 3, p.y + 0);
	}
	if (processing.keyIsPressed === false
			|| processing.keyCode === processing.UP
			|| processing.keyCode === processing.DOWN) {
		processing.point(p.x + 2, p.y + 0);
		processing.point(p.x + 4, p.y + 0);
	}
};

var tree = function() {
	processing.fill(128, 70, 0);
	processing.rect(t, 201, 14, 30);
	processing.fill(12, 105, 0);
	if (d === true) {
		processing.fill(71, 166, 60);
	}
	if (player1.x >= db + 100) {
		processing.fill(214, 182, 79);
	}
	processing.ellipse(t + 7, 192, 47, 48);
	processing.fill(255, 0, 0);
	if (d === true) {
		processing.fill(232, 183, 116);
	}
	processing.ellipse(t - 3, 197, 7, 7);
	processing.ellipse(t + 16, 195, 7, 7);
	processing.ellipse(t + 9, 180, 7, 7);
	// move
	if (processing.keyIsPressed && processing.keyCode === processing.RIGHT) {
		t = t - 1.5;
	}
	if (processing.keyIsPressed && processing.keyCode === processing.LEFT) {
		t = t + 1.5;
	}
	// cant go there
	if (t <= pondPos + 51 && t >= pondPos - 51) {
		t = processing.random(0, 400);
	}

};

var background1 = function() {
	processing.fill(107, 66, 0);
	processing.rect(-1, 240, 402, 300);
	processing.fill(0, 255, 43);
	processing.stroke(0, 255, 51);
	if (d === true) {
		processing.fill(87, 207, 76);
		processing.stroke(87, 207, 76);
	}
	if (x >= db + 100) {
		processing.fill(214, 182, 79);
		processing.stroke(214, 182, 79);
	}
	processing.rect(-4, 231, 407, 12, 19);
	processing.stroke(0, 0, 0);
};

var sky = function() {
	processing.fill(9, 215, 230);
	if (time <= 10 && time > 0) {
		processing.fill(128, 65, 95);
	}
	if (time <= 0) {
		processing.fill(71, 71, 71);
	}
	processing.rect(-1, -1, 402, 231);
};

var pond = function() {
	processing.fill(0, 119, 255);
	processing.ellipse(pondPos, 230, 102, 70);
	// move
	if (processing.keyIsPressed && processing.keyCode === processing.RIGHT) {
		pondPos = pondPos - 1.5;
	}
	if (processing.keyIsPressed && processing.keyCode === processing.LEFT) {
		pondPos = pondPos + 1.5;
	}
};

var timeofday = function() {
	time = time - 0.02;
	if (time <= -20) {
		time = 50;
	}
};

var sheep = function() {
	processing.fill(242, 242, 242);
	processing.rect(sx + 17, sy - 80, 8, 5, 1);
	processing.rect(sx + 15, sy - 82, 5, 4);
	processing.stroke(255, 255, 255);
	processing.rect(sx + 18, sy - 75, 1, 1);
	processing.rect(sx + 23, sy - 75, 1, 1);
	processing.stroke(0, 0, 0);
	// cant go there
	if (sx <= pondPos + 51 && sx >= pondPos - 49) {
		sx += 10;
	}
	// move
	if (processing.keyIsPressed && processing.keyCode === processing.RIGHT) {
		sx = sx - 1.5;
	}
	if (processing.keyIsPressed && processing.keyCode === processing.LEFT) {
		sx = sx + 1.5;
	}
	// movement
	st = st - 0.01;
	if (st <= 0) {
		st = 1;
		sm = processing.random(sx + 6, sx - 6);
	}
	if (sx < sm) {
		sx = sx + 0.2;
	}
	if (sx > sm) {
		sx = sx - 0.2;
	}
};

var waterplants = function() {
	processing.fill(30, 255, 0);
	processing.stroke(30, 255, 0);
	processing.rect(pondPos - 21, swy, 1, 11);
	if (sweed <= 1 && sweed > 0) {
		processing.rect(pondPos - 24, 252, 2, 1);
		processing.rect(pondPos - 19, 257, 2, 1);
	}
	if (sweed <= 0 && sweed > -1) {
		processing.rect(pondPos - 24, 257, 2, 1);
		processing.rect(pondPos - 19, 252, 2, 1);
	}
	processing.stroke(0, 0, 0);
	// plant two
	processing.fill(30, 255, 0);
	processing.stroke(30, 255, 0);
	processing.rect(pondPos - 5, swy + 4, 1, 11);
	if (sweed <= 1 && sweed > 0) {
		processing.rect(pondPos - 8, 260, 2, 1);
		processing.rect(pondPos - 3, 255, 2, 1);
	}
	if (sweed <= 0 && sweed > -1) {
		processing.rect(pondPos - 8, 255, 2, 1);
		processing.rect(pondPos - 3, 260, 2, 1);
	}
	processing.stroke(0, 0, 0);
	// plant three
	processing.fill(30, 255, 0);
	processing.stroke(30, 255, 0);
	processing.rect(pondPos + 11, swy + 3, 1, 11);
	if (sweed <= 1 && sweed > 0) {
		processing.rect(pondPos + 13, 258, 2, 1);
		processing.rect(pondPos + 8, 254, 2, 1);
	}
	if (sweed <= 0 && sweed > -1) {
		processing.rect(pondPos + 8, 258, 2, 1);
		processing.rect(pondPos + 13, 254, 2, 1);
	}
	processing.stroke(0, 0, 0);
	// movement
	sweed = sweed - 0.025;
	if (sweed < -1) {
		sweed = 2;
	}
	// sweed = 1.1;

};

var mud = function() {
	processing.fill(79, 45, 0);
	processing.rect(pondPos - 47, 193, 95, 70, 23);
};

var fishy = function() {
	processing.stroke(255, 140, 0);
	processing.rect(fix, 240, 3, 1);
	processing.stroke(0, 0, 0);
	// get there
	if (fix >= pondPos + 47) {
		fix = fix - 20;
	}
	if (fix <= pondPos - 47) {
		fix = fix + 20;
	}
	// move
	if (fix < pondPos + 51 && fix > pondPos - 51) {
		fix = fix + 0.1;
		if (fix >= pondPos + 30) {
			f = true;
		}
		if (f === true) {
			fix -= 0.2;
		}
		if (fix <= pondPos - 30) {
			f = false;
		}
	}
	// move
	if (processing.keyIsPressed && processing.keyCode === processing.RIGHT) {
		fix = fix - 1.5;
	}
	if (processing.keyIsPressed && processing.keyCode === processing.LEFT) {
		fix = fix + 1.5;
	}
};

var clouds = function() {
	processing.fill(255, 255, 255);
	processing.stroke(255, 255, 255);
	processing.ellipse(cx, 49, 51, 51);
	processing.ellipse(cx - 20, 37, 51, 51);
	processing.ellipse(cx - 35, 49, 51, 51);
	processing.stroke(0, 0, 0);
	// move
	cx = cx + 0.05;
	// player move
	if (processing.keyIsPressed && processing.keyCode === processing.RIGHT) {
		cx = cx - 1.5;
	}
	if (processing.keyIsPressed && processing.keyCode === processing.LEFT) {
		cx = cx + 1.5;
	}
	if (cx > 460) {
		cx = -50;
	}
	if (cx < -50) {
		cx = 450;
	}

};

var flowers = function() {
	processing.strokeWeight(2);
	processing.stroke(19, 140, 17);// poppy
	processing.line(flx, 227, flx, 231);
	processing.stroke(0, 0, 0);
	processing.stroke(255, 0, 0);
	processing.strokeWeight(4);
	processing.point(flx, 227);
	processing.stroke(0, 0, 0);
	processing.strokeWeight(1);
	// move
	if (processing.keyIsPressed && processing.keyCode === processing.RIGHT) {
		flx = flx - 1.5;
	}
	if (processing.keyIsPressed && processing.keyCode === processing.LEFT) {
		flx = flx + 1.5;
	}
	// cant go there
	if (flx <= pondPos + 51 && flx >= pondPos - 51) {
		flx = flx + 1;
	}
	// loop
	if (flx > 403) {
		flx = -3;
	}
	if (flx < -3) {
		flx = 403;
	}
};

var background2 = function() {
	processing.fill(99, 72, 30);
	processing.stroke(13, 255, 0);
	processing.strokeWeight(5);
	if (d === true) {
		processing.stroke(89, 212, 78);
	}
	if (x >= db + 100) {
		processing.stroke(214, 182, 79);
	}
	processing.arc(hx, 231, 175, h1, -179, 0);
	processing.arc(hx + 81, 231, 139, h2, -179, -0);
	processing.arc(hx + 160, 231, 145, h3, -179, -0);
	processing.arc(hx + 260, 231, 139, h4, -179, -0);
	processing.arc(hx + 323, 231, 139, h5, -179, -0);
	processing.stroke(0, 0, 0);
	processing.strokeWeight(1);
	// move
	if (processing.keyIsPressed && processing.keyCode === processing.RIGHT) {
		hx = hx - 1.5;
	}
	if (processing.keyIsPressed && processing.keyCode === processing.LEFT) {
		hx = hx + 1.5;
	}
	// loop
	if (hx < -400) {
		hx = 699;
		h1 = processing.random(43, 107);
		h2 = processing.random(47, 107);
		h3 = processing.random(49, 107);
		h4 = processing.random(50, 107);
		h5 = processing.random(53, 107);
	}
	if (hx > 700) {
		hx = -372;
	}
};

var forest = function() {
	processing.fill(0, 79, 1);
	processing.stroke(0, 0, 0);
	processing.rect(fox, -2, 10000, 233);
	processing.textSize(3);
	processing.textSize(70);
	processing.fill(0, 0, 0);
	processing.text("evil\nforest", fox + 9789, 70);
	// move
	if (processing.keyIsPressed && processing.keyCode === processing.RIGHT) {
		fox = fox - 1.5;
	}
	if (processing.keyIsPressed && processing.keyCode === processing.LEFT) {
		fox = fox + 1.5;
	}
};

var town = function() {
	processing.fill(158, 150, 41);
	processing.strokeWeight(4);
	processing.stroke(148, 106, 21);// houses
	processing.rect(to + 121, 187, 40, 42);
	processing.rect(to + 3, 185, 48, 44);
	processing.rect(to + 63, 220, 48, 9);// garden wall
	processing.strokeWeight(1);
	processing.stroke(0, 0, 0);
	processing.fill(0, 0, 0);
	processing.rect(to + 21, 214, 10, 16);// doors
	processing.rect(to + 135, 214, 10, 16);
	// garden plants
	processing.fill(37, 222, 9);
	processing.stroke(55, 214, 55);
	processing.rect(to + 66, 212, 7, 5);
	processing.rect(to + 78, 212, 7, 5);
	processing.rect(to + 90, 212, 7, 5);
	processing.rect(to + 102, 212, 7, 5);
	processing.stroke(0, 0, 0);
	// move
	if (processing.keyIsPressed && processing.keyCode === processing.RIGHT) {
		to = to - 1.5;
	}
	if (processing.keyIsPressed && processing.keyCode === processing.LEFT) {
		to = to + 1.5;
	}
	// loop
	if (to <= -166) {
		to = processing.random(600, 900);
	}
	if (to >= 1001) {
		to = -167;
	}
};

var birds = function() {
	processing.fill(30, 0, 255);// blue bird
	processing.stroke(21, 0, 255);
	processing.ellipse(bx, by, 4, 4);
	// fly
	bx = bx + 0.2;
	if (bx >= 500) {
		back = true;
	}
	if (back === true) {
		bx = bx - 0.6;
	}
	if (bx <= -100) {
		back = false;
	}
	by = by - 0.2;
	if (by <= 100) {
		up = true;
	}
	if (up === true) {
		by = by + 0.6;
	}
	if (by >= 150) {
		up = false;
	}
	// move
	if (processing.keyIsPressed && processing.keyCode === processing.RIGHT) {
		bx = bx - 1.5;
	}
	if (processing.keyIsPressed && processing.keyCode === processing.LEFT) {
		bx = bx + 1.5;
	}
};

var inventoryscreen = function() {
	processing.fill(255, 255, 255);
	processing.stroke(0, 0, 0);
	processing.rect(354, 356, 46, 44);// inventory window
	processing.fill(176, 117, 14);
	processing.rect(366, 369, 24, 24, 3);// chest
	processing.fill(0, 0, 0);
	processing.rect(366, 378, 24, 1);// lid
	processing.fill(179, 179, 179);
	processing.rect(376, 376, 4, 8);// lock
	processing.textSize(11);
	processing.fill(0, 0, 0);
	processing.text("inventory", 357, 366);
	// if clicked
	if (processing.mouseIsPressed && processing.mouseX >= 354
			&& processing.mouseY >= 356) {
		inventory = true;
	}
	if (inventory === true) {
		processing.background(186, 186, 186);
		processing.textSize(60);
		processing.text("treasures: " + rm, 70, 70);
		processing.text("gold: " + gn, 70, 128);
		processing.fill(255, 255, 255);
	}
	if (processing.mouseIsPressed && processing.mouseX >= 354
			&& processing.mouseY >= 356 && inventory === true) {
		inventory = false;
	}

};

var desert = function() {
	// move
	if (processing.keyIsPressed && processing.keyCode === processing.RIGHT) {
		db = db - 1.5;
	}
	if (processing.keyIsPressed && processing.keyCode === processing.LEFT) {
		db = db + 1.5;
	}
	if (player1.x >= db) {
		d = true;
	} else {
		d = false;
	}

};

var treasurechest = function() {
	processing.fill(189, 120, 0);
	processing.rect(chestx - 4, 224, 7, 7);// chest
	processing.line(chestx - 4, 227, chestx + 3, 227);// lid
	processing.stroke(158, 158, 158);
	processing.strokeWeight(2);
	processing.line(chestx, 227, chestx, 228);// lock
	processing.strokeWeight(1);
	// move
	if (processing.keyIsPressed && processing.keyCode === processing.RIGHT) {
		chestx = chestx - 1.5;
	}
	if (processing.keyIsPressed && processing.keyCode === processing.LEFT) {
		chestx = chestx + 1.5;
	}
	// pond
	if (chestx <= pondPos + 51 && chestx >= pondPos - 51) {
		chestx = processing.random(0, 700);
	}
	// loop
	if (chestx <= -20) {
		chestx = 3000;
	}
	// reapear
	if (processing.mouseIsPressed && processing.mouseX >= chestx
			&& processing.mouseX <= chestx + 7 && processing.mouseY >= 224
			&& processing.mouseY <= 224 + 7) {
		rm = rm + 1;
		gn += 5;
		chestx = processing.random(x + 1000, x + 3000);
	}
};

var startscreen = function() {
	if (start === true) {
		processing.fill(219, 219, 219);// back
		processing.rect(11, 11, 377, 377);
		processing.fill(255, 255, 255);// play game
		processing.rect(28, 30, 107, 28);
		processing.fill(0, 0, 0);
		processing.textSize(23);
		processing.text("play game", 36, 49);
		if (processing.mouseIsPressed && processing.mouseX >= 28
				&& processing.mouseX <= 135 && processing.mouseY >= 30
				&& processing.mouseY <= 58) {
			start = false;
		}

		processing.fill(0, 0, 0);
		processing.textSize(11);
		if (s === 0) {
			processing.text("used for making soup!", 18, 380);
		}// 1
		if (s === 1) {
			processing.text("anteaters caught on camera!", 18, 380);
		}// 2
		if (s === 2) {
			processing.text("insanely cute Llamas!", 18, 380);
		}// 3
		if (s === 3) {
			processing.text("save the ducks!", 18, 380);
		}// 4
		if (s === 4) {
			processing.text("needed for repairs!", 18, 380);
		}// 5
		if (s === 5) {
			processing.text("testing... 1, 2, 3,... testing...", 18, 380);
		}// 6
		if (s === 6) {
			processing.text("best if used by last week!", 18, 380);
		}// 7
		if (s === 7) {
			processing.text("D O N U T S!", 18, 380);
		}// 8
		if (s === 8) {
			processing.text("used for making soup!", 18, 380);
		}// 9
		if (s === 9) {
			processing.text("anteaters caught on camera!", 18, 380);
		}// 10
		if (s === 10) {
			processing.text("insanely cute Llamas!", 18, 380);
		}// 1
		if (s === 11) {
			processing.text("save the ducks!", 18, 380);
		}// 2
		if (s === 12) {
			processing.text("needed for repairs!", 18, 380);
		}// 3
		if (s === 13) {
			processing.text("testing... 1, 2, 3,... testing...", 18, 380);
		}// 4
		if (s === 14) {
			processing.text("best if used by last week!", 18, 380);
		}// 5
		if (s === 15) {
			processing.text("D O N U T S!", 18, 380);
		}// 6
		if (s === 16) {
			processing.text("bananas!", 18, 380);
		}// 7 /
		if (s === 17) {
			processing.text("cheese!", 18, 380);
		}// 8
		if (s === 18) {
			processing.text("pizza!", 18, 380);
		}// 9
		if (s === 19) {
			processing.text("pineapples!", 18, 380);
		}// 10
		if (s === 20) {
			processing.text("apples!", 18, 380);
		}
		if (s === 21) {
			processing.text("cereal!", 18, 380);
		}
		if (s === 22) {
			processing.text("cookies!", 18, 380);
		}

	}

};

var intohouse = function() {
	if (x >= to + 135 && x <= to + 145 && processing.keyIsPressed
			&& processing.keyCode === processing.UP) {
		trade = true;
	}
	// processing.line(to+135, 0, to+135, 400);
	// processing.line(to+145, 0, to+145, 400);
	if (trade === true) {
		processing.background(194, 184, 78);
		processing.fill(171, 119, 55);
		processing.stroke(171, 119, 55);
		processing.triangle(1, 399, 123, 400, 68, 321);// floor
		processing.triangle(400, 400, 292, 400, 340, 304);
		processing.rect(68, 320, 272, 79);
		processing.rect(178, 303, 161, 17);
		processing.fill(194, 184, 78);// wall
		processing.stroke(0, 0, 0);
		processing.rect(75, -1, 264, 304);
		processing.fill(135, 135, 135);
		processing.rect(67, 264, 124, 55);// desk
		processing.quad(190, 265, 192, 319, 202, 304, 200, 253);
		processing.quad(67, 264, 190, 264, 200, 252, 76, 252);
		processing.fill(255, 115, 0);// sign
		processing.textSize(70);
		processing.text("shop", 87, 42);
		// out
		if (processing.keyIsPressed && processing.keyCode === processing.DOWN) {
			trade = false;
		}
		// change arrow
		if (trade === true) {
			a = 25;
		} else {
			a = 9;
		}

	}

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

var keynotation = function() {
	// notation
	if (x >= to + 135 && x <= to + 145) {
		hnb = true;
	} else {
		hnb = false;
	}
	if (hnb === true) {
		processing.fill(0, 0, 0);
		processing.rect(1, 1, 28, 30, 6);
		processing.stroke(255, 255, 255);
		processing.strokeWeight(4);
		processing.line(16, 10, 16, 24);
		processing.line(16, a, 25, 15);
		processing.line(16, a, 6, 15);
		processing.strokeWeight(1);
	}
};

processing.draw = function() {
	processing.background(255, 255, 255);

	// most everything
	if (trade === false) {
		background1();
		mud();
		pond();
		fishy();
		sky();
		background2();
		tree();
		sheep();
		timeofday();
		waterplants();
		town();
		drawPlayer(player1);
		drawPlayer(player2);
		clouds();
		flowers();
		birds();
		forest();
		treasurechest();
		inventoryscreen();
		desert();
	}

	// village shop(s)
	intohouse();

	// key notation
	keynotation();

	// start screen
	startscreen();// =)

	processing.keyIsPressed = false;
}
