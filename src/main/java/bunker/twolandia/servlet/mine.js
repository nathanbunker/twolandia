var player = {
	x : 205,
	y : 30,
	lookingRight : 0,
	lookingDown : 0,
	rest : 0,
	jump : 0,
	starting : true
};

var messageToPlayer = {
	text : "",
	ttl : 0
};

var drawMessage = function() {
	if (messageToPlayer.ttl > 0) {
		processing.text(messageToPlayer.text, 7, 12);
		messageToPlayer.ttl--;
	}
}

var drawField = function() {
	for (y in field) {
		for (x in field[y]) {
			if (field[y][x] == 0) { // sky/air
				processing.noStroke();
				processing.fill(102, 255, 255); // light blue
				processing.rect(x * 12, y * 12, 12, 12);
			} else if (field[y][x] == 1) { // stone
				processing.stroke(157, 157, 157);
				processing.fill(166, 166, 166); // 
				processing.rect(x * 12, y * 12, 11, 11);
			} else if (field[y][x] == 2) { // dirt
				processing.noStroke();
				processing.fill(153, 102, 51);
				processing.rect(x * 12, y * 12, 12, 12);
				processing.fill(150, 100, 0);
				processing.ellipse(x * 12 + 5, y * 12 + 5, 5, 5);
			} else if (field[y][x] == 3) { // cloud
				processing.stroke(255, 255, 255);
				processing.fill(255, 255, 255);
				processing.rect(x * 12, y * 12, 11, 11);
			} else if (field[y][x] == 4) { // sand
				processing.stroke(200, 200, 140);
				processing.fill(255, 255, 153);
				processing.rect(x * 12, y * 12, 11, 11);
			} else if (field[y][x] == 5) { // water
				processing.noStroke();
				processing.fill(102, 204, 255);
				processing.rect(x * 12, y * 12, 12, 12);
			} else if (field[y][x] == 6) { // grass
				processing.noStroke();
				processing.fill(51, 204, 51);
				processing.rect(x * 12, y * 12, 12, 12);
			} else if (field[y][x] == 7) { // coal
				processing.noStroke();
				processing.fill(115, 115, 115);
				processing.rect(x * 12, y * 12, 12, 12);
				processing.fill(89, 89, 89);
				processing.rect(x * 12 + 9, y * 12 + 9, 3, 3);
				processing.rect(x * 12, y * 12, 3, 3);
			} else if (field[y][x] == 8) { // iron
				processing.stroke(0, 0, 0);
				processing.fill(255, 145, 0);
				processing.stroke(255, 135, 0);
				processing.rect(x * 12, y * 12, 11, 11);
				processing.rect(x * 12 + 3, y * 12 + 3, 5, 5);
			} else if (field[y][x] == 9) { // diamond
				processing.stroke(0, 0, 0);
				processing.fill(51, 204, 255);
				processing.stroke(0, 0, 0);
				processing.rect(x * 12, y * 12, 11, 11);
				processing.rect(x * 12 + 3, y * 12 + 3, 5, 5);
			}
		}
	}
}

var drawPlayer = function(p) {
	if (p.starting) {
		messageToPlayer.text = "Welcome to Twolandia!";
		messageToPlayer.ttl = 15 * 60;
		p.starting = false;
	}
	processing.stroke(0, 0, 0);
	processing.fill(255, 145, 0); // orange for the body
	processing.rect(p.x, p.y, 6, 10);// body
	processing.fill(235, 202, 132); // tan (skin color)
	processing.rect(p.x, p.y - 2, 6, 5); // head
	// arms
	processing.rect(p.x - 1, p.y + 2, 1, 6); // left arm
	processing.rect(p.x + 6, p.y + 2, 1, 6); // right arm
	// fall in pond
	processing.fill(0, 0, 0);
	if (p.rest > 0) {
		p.rest--;
		if (p.rest == 0) {
			p.lookingRight = 0;
			p.lookingDown = 0;
		}
	}
	processing.point(p.x + 2 + p.lookingRight, p.y + p.lookingDown);
	processing.point(p.x + 4 + p.lookingRight, p.y + p.lookingDown);
};

var movePlayer = function() {
	if (processing.keyCode === processing.RIGHT) {
		player.x += 2.0;
	} else if (processing.keyCode === processing.LEFT) {
		player.x -= 2.0;
	} else if (processing.keyCode === processing.UP) {
		player.y -= 2.0;
		if (player.y < 1) {
			player.y = 1;
		}
	} else if (processing.keyCode === processing.DOWN) {
		player.y += 2.0;
	} else if (processing.keyCode === processing.SHIFT) {
		if (player.jump == 0 && player.y > 27) {
			player.jump = 8;
			player.y -= 12;
		}
	}

}

var fallPlayer = function(p) {
	// is the player in the air?
	var fieldX = Math.floor(p.x / 12);
	var fieldY = Math.floor((p.y + 11) / 12);
	var fieldXr = Math.floor((p.x + 6) / 12);
	if (field[fieldY][fieldX] == 0 && field[fieldY][fieldXr] == 0) {
		// we are standing on the sky!
		// move down by one
		if (p.jump > 0) {
			p.x += player.lookingRight * 3;
			if (p.jump <= 1) {
				p.y -= 1;
				p.jump = 0;
			} else {
				p.y -= p.jump / 2;
				p.jump = p.jump / 2;
			}
		} else {
			p.y += 3;
		}
	} else if (field[fieldY][fieldX] == 5 && field[fieldY][fieldXr] == 5) {
		// we are in the water, now you should sink
		// move down by one
		p.x += player.lookingRight * 2;
		p.y += 0.2;
		if (p.jump > 0) {
			p.y--;
			p.jump--;
		} else {
			p.jump = 0;
		}
	} else if (p.jump > 0) {
		p.x += player.lookingRight * 3;
		if (p.jump == 1) {
			p.y -= 1;
			p.jump = 0;
		} else {
			p.y -= p.jump / 2;
			p.jump = p.jump / 2;
		}
	} else {
		p.jump = 0;
	}
}

processing.keyPressed = function() {
	movePlayer();
	if (processing.keyCode === processing.RIGHT) {
		player.lookingRight = 1;
		player.lookingDown = 0;
		player.rest = 4 * 60;
	} else if (processing.keyCode === processing.LEFT) {
		player.lookingRight = -1;
		player.lookingDown = 0;
		player.rest = 4 * 60;
	} else if (processing.keyCode === processing.UP) {
		player.lookingRight = 0;
		player.lookingDown = -1;
		player.rest = 4 * 60;
	} else if (processing.keyCode === processing.DOWN) {
		player.lookingRight = 0;
		player.lookingDown = 1;
		player.rest = 4 * 60;
	}
}

processing.mousePressed = function() {

}

processing.mouseReleased = function() {

}

processing.draw = function() {
	fallPlayer(player);
	processing.background(255, 255, 255);
	drawField();
	drawPlayer(player);
	drawMessage();
}