var player = {
	x : 205,
	y : 30,
	lookingRight : 0,
	lookingDown : 0,
	rest : 0,
	jump : 0,
	starting : true,
	holdingBlock : 0
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

const BLOCK_AIR = 0;
const BLOCK_STONE = 1;
const BLOCK_DIRT = 2;
const BLOCK_CAVE_AIR = 3;
const BLOCK_SAND = 4;
const BLOCK_WATER = 5;
const BLOCK_GRASS = 6;
const BLOCK_COAL = 7;
const BLOCK_IRON = 8;
const BLOCK_DIAMOND = 9;

var drawBlock = function(blockId, x, y) {
	switch (blockId) {
	case BLOCK_AIR:
		processing.noStroke();
		processing.fill(102, 255, 255);
		processing.rect(x * 12, y * 12, 12, 12);
		break;
	case BLOCK_STONE:
		processing.stroke(157, 157, 157);
		processing.fill(166, 166, 166); // 
		processing.rect(x * 12, y * 12, 11, 11);
		break;
	case BLOCK_DIRT:
		processing.noStroke();
		processing.fill(153, 102, 51);
		processing.rect(x * 12, y * 12, 12, 12);
		processing.fill(150, 100, 0);
		processing.ellipse(x * 12 + 5, y * 12 + 5, 5, 5);
		break;
	case BLOCK_CAVE_AIR:
		processing.noStroke();
		processing.fill(242, 242, 242);
		processing.rect(x * 12, y * 12, 11, 11);
		break;
	case BLOCK_SAND:
		processing.stroke(200, 200, 140);
		processing.fill(255, 255, 153);
		processing.rect(x * 12, y * 12, 11, 11);
		break;
	case BLOCK_WATER:
		processing.noStroke();
		processing.fill(102, 204, 255);
		processing.rect(x * 12, y * 12, 12, 12);
		break;
	case BLOCK_GRASS:
		processing.noStroke();
		processing.fill(51, 204, 51);
		processing.rect(x * 12, y * 12, 12, 12);
		break;
	case BLOCK_COAL:
		processing.noStroke();
		processing.fill(115, 115, 115);
		processing.rect(x * 12, y * 12, 12, 12);
		processing.fill(89, 89, 89);
		processing.rect(x * 12 + 9, y * 12 + 9, 3, 3);
		processing.rect(x * 12, y * 12, 3, 3);
		break;
	case BLOCK_IRON:
		processing.stroke(0, 0, 0);
		processing.fill(255, 145, 0);
		processing.stroke(255, 135, 0);
		processing.rect(x * 12, y * 12, 11, 11);
		processing.rect(x * 12 + 3, y * 12 + 3, 5, 5);
		break;
	case BLOCK_DIAMOND:
		processing.stroke(0, 0, 0);
		processing.fill(51, 204, 255);
		processing.stroke(0, 0, 0);
		processing.rect(x * 12, y * 12, 11, 11);
		processing.rect(x * 12 + 3, y * 12 + 3, 5, 5);
		break;
	default:
		processing.stroke(157, 157, 157);
		processing.fill(166, 166, 166); 
		processing.rect(x * 12, y * 12, 11, 11);
	}

}
var drawField = function() {
	for (y in field) {
		for (x in field[y]) {
			drawBlock(field[y][x], x, y);
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
	if (p.holdingBlock == 0) {
		processing.rect(p.x - 1, p.y + 2, 1, 6); // left arm
		processing.rect(p.x + 6, p.y + 2, 1, 6); // right arm
	} else {
		processing.rect(p.x, p.y - 6, 0, 8); // left arm
		processing.rect(p.x + 6, p.y - 6, 0, 8); // right arm
		drawBlock(p.holdingBlock, (p.x - 3) / 12, (p.y - 18) / 12);
	}

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
	if ((field[fieldY][fieldX] == BLOCK_AIR && field[fieldY][fieldXr] == BLOCK_AIR)
			|| (field[fieldY][fieldX] == BLOCK_CAVE_AIR && field[fieldY][fieldXr] == BLOCK_CAVE_AIR)) {
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
	} else if (field[fieldY][fieldX] == BLOCK_WATER
			&& field[fieldY][fieldXr] == BLOCK_WATER) {
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

var playerDigs = function(p) {
	var fieldX = Math.floor(p.x / 12);
	var fieldY = Math.floor(p.y / 12);
	if (player.lookingRight > 0) {
		fieldX++;
	} else if (player.lookingRight < 0) {
		fieldX--;
	} else {
		if (player.holdingBlock == 0) {
			fieldY++;
		}
		else {
			fieldY--;
		}
	}
	var blockId = field[fieldY][fieldX];
	if (player.holdingBlock == 0) {
		if (blockId == BLOCK_AIR || blockId == BLOCK_CAVE_AIR) {
			// ignore dig command
		}
		else {
			player.holdingBlock = field[fieldY][fieldX];
			var leftSideBlock =field[fieldY][fieldX - 1]; 
			var rightSideBlock =field[fieldY][fieldX + 1]; 
			var topSideBlock = field[fieldY - 1][fieldX];
			if (leftSideBlock == BLOCK_WATER || rightSideBlock == BLOCK_WATER || topSideBlock == BLOCK_WATER) {
				field[fieldY][fieldX] = BLOCK_WATER;
			} else if (leftSideBlock == BLOCK_CAVE_AIR || rightSideBlock == BLOCK_CAVE_AIR || topSideBlock == BLOCK_CAVE_AIR) {
				field[fieldY][fieldX] = BLOCK_CAVE_AIR;
			}
			else {
				field[fieldY][fieldX] = BLOCK_AIR;
			}
		}
	}
	else {
		if (blockId == BLOCK_AIR || blockId == BLOCK_CAVE_AIR || blockId == BLOCK_WATER) {
			field[fieldY][fieldX] = player.holdingBlock;
			player.holdingBlock = 0;
		}
		else {
			// ignore dig command
		}
	}
};

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
	} else if (processing.keyCode == processing.CONTROL) {
		playerDigs(player);
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