const BLOCK_SIZE = 12;

var player = {
	x : 206,
	y : 30,
	lookingRight : 0,
	lookingDown : 0,
	rest : 0,
	jump : 0,
	starting : true,
	holdingBlock : 0,
	form: 'person',
	name: playerName
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
const BLOCK_SNOW = 10;
const BLOCK_ICE = 11;
const BLOCK_WOOD = 12;
const BLOCK_LEAVES = 13;
// const BLOCK_ = 14;
// const BLOCK_ = 15;
const BLOCK_AMETHYST = 16;
const BLOCK_FLAMES = 17;

// 86 columns, 52 rows


var drawBlock = function(blockId, x, y) {
	switch (blockId) {
	case BLOCK_AIR:
		processing.stroke(72, 255, 255);
		processing.fill(102, 255, 255);
		processing.rect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
		break;
	case BLOCK_STONE:
		processing.stroke(157, 157, 157);
		processing.fill(166, 166, 166); // 
		processing.rect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE - 1, BLOCK_SIZE - 1  );
		break;
	case BLOCK_DIRT:
		processing.stroke(118, 54, 0);
		processing.fill(128, 64, 0);
		processing.rect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE - 1, BLOCK_SIZE - 1);
		break;
	case BLOCK_CAVE_AIR:
		processing.noStroke();
		processing.fill(242, 242, 242);
		processing.rect(x * BLOCK_SIZE, y * BLOCK_SIZE, 11, 11);
		break;
	case BLOCK_SAND:
		processing.stroke(200, 200, 140);
		processing.fill(255, 255, 173);
		processing.rect(x * BLOCK_SIZE, y * BLOCK_SIZE, 11, 11);
		break;
	case BLOCK_WATER:
		processing.noStroke();
		processing.fill(102, 204, 255);
		processing.rect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
		break;
	case BLOCK_GRASS:
		processing.stroke(118, 54, 0);
		processing.fill(128, 64, 0);
		processing.rect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE - 1, BLOCK_SIZE - 1);
		processing.fill(0, 153, 51);
		processing.stroke(0, 153, 51);
		processing.rect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE - 1, 4);
		processing.point(x * BLOCK_SIZE, y * BLOCK_SIZE + 5);
		processing.point(x * BLOCK_SIZE + 3, y * BLOCK_SIZE + 5);
		processing.point(x * BLOCK_SIZE + 5, y * BLOCK_SIZE + 5);
		processing.point(x * BLOCK_SIZE + 8, y * BLOCK_SIZE + 5);
		processing.point(x * BLOCK_SIZE + 10, y * BLOCK_SIZE + 5);
		processing.point(x * BLOCK_SIZE + 11, y * BLOCK_SIZE + 5);
		break;
	case BLOCK_COAL:
		processing.stroke(89, 89, 89);
		processing.fill(115, 115, 115);
		processing.rect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE - 1, BLOCK_SIZE - 1);
		processing.stroke(89, 89, 89);
		processing.rect(x * BLOCK_SIZE + 3, y * BLOCK_SIZE + 3, 5, 5);
		break;
	case BLOCK_IRON:
		processing.fill(255, 145, 0);
		processing.stroke(255, 115, 51);
		processing.rect(x * BLOCK_SIZE, y * BLOCK_SIZE, 11, 11);
		processing.rect(x * BLOCK_SIZE + 3, y * BLOCK_SIZE + 3, 5, 5);
		break;
	case BLOCK_DIAMOND:
		processing.stroke(0, 0, 0);
		processing.fill(51, 204, 255);
		processing.stroke(0, 0, 0);
		processing.rect(x * BLOCK_SIZE, y * BLOCK_SIZE, 11, 11);
		processing.rect(x * BLOCK_SIZE + 3, y * BLOCK_SIZE + 3, 5, 5);
		break;
	case BLOCK_SNOW:
		processing.noStroke();
		processing.fill(255, 255, 255);
		processing.rect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
		break;
	case BLOCK_ICE:
		processing.noStroke();
		processing.fill(0, 153, 255);
		processing.rect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
		processing.fill(255, 255, 255);
		processing.rect(x * BLOCK_SIZE + 1, y * BLOCK_SIZE + 2, 9, 1);
		break;
	case BLOCK_WOOD:
		processing.noStroke();
		processing.fill(77, 38, 0);
		processing.rect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
		processing.fill(51, 26, 0);
		processing.rect(x * BLOCK_SIZE + 2, y * BLOCK_SIZE + 2, 2, 6);
		processing.rect(x * BLOCK_SIZE + 6, y * BLOCK_SIZE + 4, 2, 6);
		processing.fill(102, 53, 0);
		processing.rect(x * BLOCK_SIZE, y * BLOCK_SIZE, 2, 10);
		processing.rect(x * BLOCK_SIZE + 6, y * BLOCK_SIZE + 10, 4, 2);
		processing.rect(x * BLOCK_SIZE + 6, y * BLOCK_SIZE + 2, 2, 2);
		processing.rect(x * BLOCK_SIZE + 4, y * BLOCK_SIZE + 6, 2, 2);
		processing.fill(51, 26, 0);
		processing.rect(x * BLOCK_SIZE + 8, y * BLOCK_SIZE + 6, 2, 2);
		processing.rect(x * BLOCK_SIZE + 10, y * BLOCK_SIZE, 2, 4);
		processing.fill(115, 77, 38);
		processing.rect(x * BLOCK_SIZE + 4, y * BLOCK_SIZE, 2, 6);
		processing.rect(x * BLOCK_SIZE + 10, y * BLOCK_SIZE + 4, 2, 6);
		break;
	case BLOCK_LEAVES:
		processing.stroke(0, 102, 0);
		processing.fill(0, 153, 51);
		processing.rect(x * BLOCK_SIZE, y * BLOCK_SIZE, 11, 11);
		break;
	case BLOCK_AMETHYST:
		processing.fill(204, 0, 204);
		processing.stroke(0, 0, 0);
		processing.rect(x * BLOCK_SIZE, y * BLOCK_SIZE, 11, 11);
		processing.rect(x * BLOCK_SIZE + 3, y * BLOCK_SIZE + 3, 5, 5);
		break;
	case BLOCK_FLAMES:
		processing.stroke(255, 255, 255);
		processing.fill(255, 255, 255);
		processing.rect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE - 1, BLOCK_SIZE - 1);
		processing.fill(255, 102, 0);
		processing.noStroke();
		processing.rect(x * BLOCK_SIZE + 2, y * BLOCK_SIZE + 10, 10, 2);
		processing.rect(x * BLOCK_SIZE + 2, y * BLOCK_SIZE + 6, 6, 2);
		processing.rect(x * BLOCK_SIZE + 8, y * BLOCK_SIZE + 8, 2, 2);
		processing.fill(255, 153, 0);
		processing.rect(x * BLOCK_SIZE, y * BLOCK_SIZE + 8, 6, 2);
		processing.rect(x * BLOCK_SIZE, y * BLOCK_SIZE + 8, 6, 2);
		processing.fill(255, 255, 255);
		processing.rect(x * BLOCK_SIZE + 6, y * BLOCK_SIZE + 8, 2, 4);
		processing.fill(255, 204, 0);
		processing.rect(x * BLOCK_SIZE + 6, y * BLOCK_SIZE + 8, 2, 2);
		processing.rect(x * BLOCK_SIZE + 2, y * BLOCK_SIZE + 6, 2, 2);
		processing.rect(x * BLOCK_SIZE + 6, y * BLOCK_SIZE + 2, 2, 2);
		processing.fill(204, 51, 0);
		processing.rect(x * BLOCK_SIZE + 4, y * BLOCK_SIZE + 4, 2, 2);
		processing.rect(x * BLOCK_SIZE + 10, y * BLOCK_SIZE + 10, 2, 2);
		
		break;
	default:
		processing.stroke(0, 0, 0);
		processing.fill(0, 0, 0); 
		processing.rect(x * BLOCK_SIZE, y * BLOCK_SIZE, 11, 11);
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
		messageToPlayer.text = "Welcome to Twolandia!\nArrow keys to move.\nA, Z, X, C, D, E, W, Q, 1, 2, or 3.\nkeys to place/remove blocks.";
		messageToPlayer.ttl = 15 * 60;
		p.starting = false;
	}
	
	
	processing.stroke(0, 0, 0);
	processing.strokeWeight(1);
	processing.fill(255, 145, 0); // orange for the body
	processing.rect(p.x, p.y, 6, -6);// body
	processing.fill(235, 202, 132); // tan 
	processing.rect(p.x, p.y - 6, 6, -4); // head
	processing.stroke(102, 51, 0);
	processing.line(p.x + 1, p.y - 3, p.x + 5, p.y - 3);// belt
	processing.stroke(77, 77, 77);
	processing.point(p.x + 2, p.y - 2);
	processing.stroke(102, 102, 153);
	processing.point(p.x + 5, p.y - 2);
	// arms
	processing.stroke(0, 0, 0);
	
	if (p.rest > 0) {
		p.rest--;
		if (p.rest == 0) {
			p.lookingRight = 0;
			p.lookingDown = 0;
		}
	}
	if (p.holdingBlock == 0) {
		if (p.lookingRight < 0) 
			{
			processing.line(p.x + 5 , p.y - 2, p.x + 5, p.y - 6); // right arm
			}
		else if (p.lookingRight > 0)			{
			processing.line(p.x + 1 , p.y - 2, p.x + 1, p.y - 6); // left arm
			}
		else {
			processing.line(p.x - 1 , p.y - 2, p.x - 1, p.y - 6); // left arm
			processing.line(p.x + 7 , p.y - 2, p.x + 7, p.y - 6); // right arm
		}
		
	} else {
		processing.line(p.x - 1 , p.y - 5, p.x - 1, p.y - 12); // left arm
		processing.line(p.x + 7 , p.y - 5, p.x + 7, p.y - 12); // right arm
		drawBlock(p.holdingBlock, (p.x - 3) / 12, (p.y - 24) / 12);
	}

	processing.fill(0, 0, 0);
	processing.stroke(0, 0, 0);
	processing.point(p.x + 2 + p.lookingRight, p.y - 8 + p.lookingDown);
	processing.point(p.x + 4 + p.lookingRight, p.y - 8 + p.lookingDown);
	
	processing.textAlign(processing.CENTER);
	processing.textSize(10);
	processing.text(p.name, p.x + 3, p.y - 12);
	processing.textAlign(processing.LEFT);
};

var reportPlayer = function(p) {
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET", "miner?action=report&x=" + p.x + "&y=" + p.y + "&lookingRight=" + p.lookingRight 
			+ "&lookingDown=" + p.lookingDown+ "&holdingBlock=" + p.holdingBlock + "&name=" + encodeURI(p.name), true);
	xhttp.send();
}

var movePlayer = function(k) {
	if (processing.keyCode === processing.RIGHT) {
		player.x += 2.0;
		var fieldX = Math.floor((player.x + 7) / BLOCK_SIZE);
		var fieldY = Math.floor((player.y - 5) / BLOCK_SIZE);
		if (field[fieldY][fieldX] != BLOCK_AIR && 
				field[fieldY][fieldX] != BLOCK_CAVE_AIR && 
				field[fieldY][fieldX] != BLOCK_WATER &&
				field[fieldY][fieldX] != BLOCK_WOOD &&
				field[fieldY][fieldX] != BLOCK_LEAVES) {
			player.x = fieldX * BLOCK_SIZE - 7;
		}
	} else if (processing.keyCode === processing.LEFT) {
		player.x -= 2.0;
		var fieldX = Math.floor((player.x + 0) / BLOCK_SIZE);
		var fieldY = Math.floor((player.y - 5) / BLOCK_SIZE);
		if (field[fieldY][fieldX] != BLOCK_AIR && 
				field[fieldY][fieldX] != BLOCK_CAVE_AIR && 
				field[fieldY][fieldX] != BLOCK_WATER &&
				field[fieldY][fieldX] != BLOCK_WOOD &&
				field[fieldY][fieldX] != BLOCK_LEAVES) {
			player.x = fieldX * (BLOCK_SIZE + 1);
		}
		
	} else if (processing.keyCode === processing.UP) {
		player.y -= 2.0;
		if (player.y < 1) {
			player.y = 1;
		}

	
	} else if (processing.keyCode === processing.DOWN) {
		var fieldX = Math.floor((player.x + 0) / BLOCK_SIZE);
		var fieldY = Math.floor((player.y + 1) / BLOCK_SIZE);
		if (field[fieldY][fieldX] == BLOCK_WATER ||
				field[fieldY][fieldX] == BLOCK_WOOD ||
				field[fieldY][fieldX] == BLOCK_LEAVES) {
			player.y += 2.0;
		}
	} else if (processing.key == 32) {
		if (player.jump == 0 && player.y > 40) {
			player.jump = 32;//32
		}
	}
	reportPlayer(player);

}

var fallPlayer = function(p) {
	// is the player in the air?
	var fieldX = Math.floor(p.x / BLOCK_SIZE);
	var fieldY = Math.floor((p.y) / BLOCK_SIZE);
	var fieldYf = Math.floor((p.y + 3) / BLOCK_SIZE);
	var fieldXr = Math.floor((p.x + 6) / BLOCK_SIZE);
	if ((field[fieldY][fieldX] == BLOCK_AIR && field[fieldY][fieldXr] == BLOCK_AIR)
			|| (field[fieldY][fieldX] == BLOCK_CAVE_AIR && field[fieldY][fieldXr] == BLOCK_CAVE_AIR)) {
		// we are standing on the sky!
		// move down by one
		if (p.jump > 0) {
			p.x += p.lookingRight * 3;
			if (p.jump <= 1) {
				p.y -= 1;
				p.jump = 0;
			} else {
				p.y -= p.jump / 2;
				p.jump = p.jump / 2;
			}
		} else {
			if ((field[fieldYf][fieldX] == BLOCK_AIR && field[fieldYf][fieldXr] == BLOCK_AIR)
					|| (field[fieldYf][fieldX] == BLOCK_CAVE_AIR && field[fieldYf][fieldXr] == BLOCK_CAVE_AIR)) {
				p.y += 3;
			}
			else {
				p.y = fieldYf * BLOCK_SIZE;
            }
		}
		reportPlayer(p);
	} else if (field[fieldY][fieldX] == BLOCK_WATER
			&& field[fieldY][fieldXr] == BLOCK_WATER) {
		// we are in the water, now you should sink
		// move down by one
		p.x += p.lookingRight * 0.5;
		p.y += 0.2;
		if (p.jump > 0) {
			p.y--;
			p.jump--;
		} else {
			p.jump = 0;
		}
		reportPlayer(p);
	} else if (p.jump > 0) {
		p.x += p.lookingRight * 3;
		if (p.jump == 1) {
			p.y -= 1;
			p.jump = 0;
		} else {
			p.y -= p.jump / 2;
			p.jump = p.jump / 2;
		}
		reportPlayer(p);
	} else {
		p.jump = 0;
	}
}

const KEY_VERY_TOP_LEFT = 49;
const KEY_VERY_TOP = 50;
const KEY_VERY_TOP_RIGHT = 51;
const KEY_TOP_LEFT = 113;
const KEY_TOP = 119;
const KEY_TOP_RIGHT = 101;
const KEY_MIDDLE_LEFT = 97;
const KEY_MIDDLE = 115;
const KEY_MIDDLE_RIGHT = 100;
const KEY_BOTTOM_LEFT = 122;
const KEY_BOTTOM = 120;
const KEY_BOTTOM_RIGHT = 99;

var playerDigs = function(p, k) {
	var fieldX = Math.floor((p.x + 5) / 12);
	var fieldY = Math.floor((p.y + 5) / 12) - 1;
	
	if (k ==  KEY_VERY_TOP_LEFT) {
		fieldX--;
		fieldY -= 2;
	}
	else if (k ==  KEY_VERY_TOP) {
		fieldY -= 2;
	}
	else if (k ==  KEY_VERY_TOP_RIGHT) {
		fieldX++;
		fieldY -= 2;
	}
	else if (k ==  KEY_TOP_LEFT) {
		fieldX--;
		fieldY--;
	}
	else if (k ==  KEY_TOP) {
		fieldY--;
	}
	else if (k ==  KEY_TOP_RIGHT) {
		fieldX++;
		fieldY--;
	}
	else if (k ==  KEY_MIDDLE_LEFT) {
		fieldX--;
	}
	else if (k ==  KEY_MIDDLE_RIGHT) {
		fieldX++;
	}
	else if (k ==  KEY_BOTTOM_LEFT) {
		fieldX--;
		fieldY++;
	}
	else if (k ==  KEY_BOTTOM) {
		fieldY++;
	}
	else if (k ==  KEY_BOTTOM_RIGHT) {
		fieldX++;
		fieldY++;
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
			} else if (leftSideBlock == BLOCK_FLAMES || rightSideBlock == BLOCK_FLAMES || topSideBlock == BLOCK_FLAMES && field[fieldY][fieldX] == BLOCK_WOOD) {
				field[fieldY][fieldX] = BLOCK_FLAMES;
			}
			
			else {
				field[fieldY][fieldX] = BLOCK_AIR;
			}
			
			// need to do this: field = [stuff from server] 
			var xhttp = new XMLHttpRequest();
			xhttp.open("GET", "miner?action=mine&x=" + fieldX + "&y=" + fieldY + "&block=" + field[fieldY][fieldX], true);
			xhttp.send();
			
			reportPlayer(player);

		}
	}
	else {
		if (blockId == BLOCK_AIR || blockId == BLOCK_CAVE_AIR || blockId == BLOCK_WATER) {
			field[fieldY][fieldX] = player.holdingBlock;
			
			var xhttp = new XMLHttpRequest();
			xhttp.open("GET", "miner?action=mine&x=" + fieldX + "&y=" + fieldY + "&block=" + field[fieldY][fieldX], true);
			xhttp.send();
			
			player.holdingBlock = 0;
			
			reportPlayer(player);
		}
		else {
			// ignore dig command
		}
	}
};



processing.keyPressed = function() {
	movePlayer();
	var k = processing.key;
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
	} else if (k == KEY_VERY_TOP_LEFT ||
			k == KEY_VERY_TOP ||
			k == KEY_VERY_TOP_RIGHT ||
			k == KEY_TOP_LEFT ||
			k == KEY_TOP ||
			k == KEY_TOP_RIGHT ||
			k == KEY_MIDDLE_LEFT ||
			k == KEY_MIDDLE_RIGHT ||
			k == KEY_BOTTOM_LEFT ||
			k == KEY_BOTTOM ||
			k == KEY_BOTTOM_RIGHT 
			) {
		playerDigs(player, k);
	}
}

processing.mousePressed = function() {

}

processing.mouseReleased = function() {

}

var players = null;

var updatePlayers = function()
{
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() 
	{
		if (this.readyState == 4 && this.status == 200)
		{
			players = JSON.parse(this.response);
		}
	}
	xhttp.open("GET", "miner?show=players", true);
	xhttp.send();
}


var field;

var updateMap = function()
{
	// need to do this: field = [stuff from server] 
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() 
	{
		if (this.readyState == 4 && this.status == 200)
		{
			field = JSON.parse(this.response);
		}
	}
	xhttp.open("GET", "miner?show=world", true);
	xhttp.send();
}

var checkCount = 60;
var initialized = false;

processing.draw = function() {
	if (checkCount >= 60 || !initialized)
	{
		checkCount = 0;
		updateMap();
		if (field != null) {
			initialized = true;
		}
	}
	updatePlayers();
	if (initialized) {
		checkCount++;
		fallPlayer(player);
		processing.background(255, 255, 255);
		drawField();
		drawPlayer(player);
		if (players != null )
		{
			for (i = 0; i < players.length; i++)
			{
				if (players[i].name != player.name)
				{
					drawPlayer(players[i]);
				}
			}
		}
		drawMessage();
	}
}