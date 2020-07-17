const BLOCK_SIZE = 12;

var player = {
	x : 206,
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
		text(messageToPlayer.text, 7, 12);
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

var visible = [];

var visibleX = 0;
var visibleY = 0;

for (visibleY = 0; visibleY < field.length; visibleY++ ) {
	visible[visibleY] = [];
    for (visibleX = 0; visibleX < field[visibleY].length; visibleX++ ) {
    	var block = [];
    	block[0] = field[visibleY][visibleX];
    	block[1] = BLOCK_STONE;
    	block[2] = BLOCK_STONE;
    	block[3] = BLOCK_STONE;
    	block[4] = BLOCK_STONE;
    	block[5] = BLOCK_STONE;
    	if (visibleY > 0) {
    		block[1] = field[visibleY - 1][visibleX];
    		if (visibleX > 0) {
    			block[2] = field[visibleY - 1][visibleX - 1];
    		}
    		if (visibleX < field[0].length - 1) {
    			block[3] = field[visibleY - 1][visibleX + 1];
    		}
    	}
		if (visibleX > 0) {
			block[4] = field[visibleY][visibleX - 1];
		}
		if (visibleX < field[0].length - 1) {
			block[5] = field[visibleY][visibleX + 1];
		}
		visible[visibleY][visibleX] = false;
    	var i = 0;
    	for (i = 0; i < block.length; i++) {
        	if (block[i] == BLOCK_AIR
        			|| block[i] == BLOCK_WOOD
        			|| block[i] == BLOCK_LEAVES) {
        		visible[visibleY][visibleX] = true;
        		break;
        	}    		
    	}
	}
}


var drawBlock = function(blockId, x, y) {
	switch (blockId) {
	case BLOCK_AIR:
		stroke(72, 255, 255);
		fill(102, 255, 255);
		rect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
		break;
	case BLOCK_STONE:
		stroke(157, 157, 157);
		fill(166, 166, 166); // 
		rect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE - 1, BLOCK_SIZE - 1);
		break;
	case BLOCK_DIRT:
		stroke(118, 54, 0);
		fill(128, 64, 0);
		rect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE - 1, BLOCK_SIZE - 1);
		break;
	case BLOCK_CAVE_AIR:
		noStroke();
		fill(242, 242, 242);
		rect(x * BLOCK_SIZE, y * BLOCK_SIZE, 11, 11);
		break;
	case BLOCK_SAND:
		stroke(200, 200, 140);
		fill(255, 255, 173);
		rect(x * BLOCK_SIZE, y * BLOCK_SIZE, 11, 11);
		break;
	case BLOCK_WATER:
		noStroke();
		fill(102, 204, 255);
		rect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
		break;
	case BLOCK_GRASS:
		stroke(118, 54, 0);
		fill(128, 64, 0);
		rect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE - 1, BLOCK_SIZE - 1);
		fill(0, 153, 51);
		stroke(0, 153, 51);
		rect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE - 1, 4);
		point(x * BLOCK_SIZE, y * BLOCK_SIZE + 5);
		point(x * BLOCK_SIZE + 3, y * BLOCK_SIZE + 5);
		point(x * BLOCK_SIZE + 5, y * BLOCK_SIZE + 5);
		point(x * BLOCK_SIZE + 8, y * BLOCK_SIZE + 5);
		point(x * BLOCK_SIZE + 10, y * BLOCK_SIZE + 5);
		point(x * BLOCK_SIZE + 11, y * BLOCK_SIZE + 5);
		break;
	case BLOCK_COAL:
		stroke(89, 89, 89);
		fill(115, 115, 115);
		rect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE - 1, BLOCK_SIZE - 1);
		stroke(89, 89, 89);
		rect(x * BLOCK_SIZE + 3, y * BLOCK_SIZE + 3, 5, 5);
		break;
	case BLOCK_IRON:
		fill(255, 145, 0);
		stroke(255, 115, 51);
		rect(x * BLOCK_SIZE, y * BLOCK_SIZE, 11, 11);
		rect(x * BLOCK_SIZE + 3, y * BLOCK_SIZE + 3, 5, 5);
		break;
	case BLOCK_DIAMOND:
		stroke(0, 0, 0);
		fill(51, 204, 255);
		stroke(0, 0, 0);
		rect(x * BLOCK_SIZE, y * BLOCK_SIZE, 11, 11);
		rect(x * BLOCK_SIZE + 3, y * BLOCK_SIZE + 3, 5, 5);
		break;
	case BLOCK_SNOW:
		noStroke();
		fill(255, 255, 255);
		rect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
		break;
	case BLOCK_ICE:
		noStroke();
		fill(0, 153, 255);
		rect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
		fill(255, 255, 255);
		rect(x * BLOCK_SIZE + 1, y * BLOCK_SIZE + 2, 9, 1);
		break;
	case BLOCK_WOOD:
		noStroke();
		fill(77, 38, 0);
		rect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
		fill(51, 26, 0);
		rect(x * BLOCK_SIZE + 2, y * BLOCK_SIZE + 2, 2, 6);
		rect(x * BLOCK_SIZE + 6, y * BLOCK_SIZE + 4, 2, 6);
		fill(102, 53, 0);
		rect(x * BLOCK_SIZE, y * BLOCK_SIZE, 2, 10);
		rect(x * BLOCK_SIZE + 6, y * BLOCK_SIZE + 10, 4, 2);
		rect(x * BLOCK_SIZE + 6, y * BLOCK_SIZE + 2, 2, 2);
		rect(x * BLOCK_SIZE + 4, y * BLOCK_SIZE + 6, 2, 2);
		fill(51, 26, 0);
		rect(x * BLOCK_SIZE + 8, y * BLOCK_SIZE + 6, 2, 2);
		rect(x * BLOCK_SIZE + 10, y * BLOCK_SIZE, 2, 4);
		fill(115, 77, 38);
		rect(x * BLOCK_SIZE + 4, y * BLOCK_SIZE, 2, 6);
		rect(x * BLOCK_SIZE + 10, y * BLOCK_SIZE + 4, 2, 6);
		break;
	case BLOCK_LEAVES:
		stroke(0, 102, 0);
		fill(0, 153, 51);
		rect(x * BLOCK_SIZE, y * BLOCK_SIZE, 11, 11);
		break;
	case BLOCK_AMETHYST:
		fill(204, 0, 204);
		stroke(0, 0, 0);
		rect(x * BLOCK_SIZE, y * BLOCK_SIZE, 11, 11);
		rect(x * BLOCK_SIZE + 3, y * BLOCK_SIZE + 3, 5, 5);
		break;
	case BLOCK_FLAMES:
		stroke(255, 255, 255);
		fill(255, 255, 255);
		rect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE - 1, BLOCK_SIZE - 1);
		fill(255, 102, 0);
		noStroke();
		rect(x * BLOCK_SIZE + 2, y * BLOCK_SIZE + 10, 10, 2);
		rect(x * BLOCK_SIZE + 2, y * BLOCK_SIZE + 6, 6, 2);
		rect(x * BLOCK_SIZE + 8, y * BLOCK_SIZE + 8, 2, 2);
		fill(255, 153, 0);
		rect(x * BLOCK_SIZE, y * BLOCK_SIZE + 8, 6, 2);
		rect(x * BLOCK_SIZE, y * BLOCK_SIZE + 8, 6, 2);
		fill(255, 255, 255);
		rect(x * BLOCK_SIZE + 6, y * BLOCK_SIZE + 8, 2, 4);
		fill(255, 204, 0);
		rect(x * BLOCK_SIZE + 6, y * BLOCK_SIZE + 8, 2, 2);
		rect(x * BLOCK_SIZE + 2, y * BLOCK_SIZE + 6, 2, 2);
		rect(x * BLOCK_SIZE + 6, y * BLOCK_SIZE + 2, 2, 2);
		fill(204, 51, 0);
		rect(x * BLOCK_SIZE + 4, y * BLOCK_SIZE + 4, 2, 2);
		rect(x * BLOCK_SIZE + 10, y * BLOCK_SIZE + 10, 2, 2);
		
		break;
	default:
		stroke(0, 0, 0);
		fill(0, 0, 0); 
		rect(x * BLOCK_SIZE, y * BLOCK_SIZE, 11, 11);
	}

}
var drawField = function() {
	for (y in field) {
		for (x in field[y]) {
			if (visible[y][x]) {
				drawBlock(field[y][x], x, y);
			}
			else {
				noStroke();
				fill(200, 200, 200); 
				rect(x * BLOCK_SIZE, y * BLOCK_SIZE, 12, 12);
			}
		}
	}
}

var drawPlayer = function(p) {
	if (p.starting) {
		messageToPlayer.text = "Welcome to Twolandia!\nArrow keys to move.\nA, Z, X, C, D, E, W, Q, 1, 2, or 3.\nkeys to place/remove blocks.";
		messageToPlayer.ttl = 15 * 60;
		p.starting = false;
	}
	
	
	stroke(0, 0, 0);
	strokeWeight(1);
	fill(255, 145, 0); // orange for the body
	rect(p.x, p.y, 6, -6);// body
	fill(235, 202, 132); // tan 
	rect(p.x, p.y - 6, 6, -4); // head
	stroke(102, 51, 0);
	line(p.x + 1, p.y - 3, p.x + 5, p.y - 3);// belt
	stroke(77, 77, 77);
	point(p.x + 2, p.y - 2);
	stroke(102, 102, 153);
	point(p.x + 5, p.y - 2);
	// arms
	stroke(0, 0, 0);
	
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
			line(p.x + 5 , p.y - 2, p.x + 5, p.y - 6); // right arm
			}
		else if (p.lookingRight > 0)			{
			line(p.x + 1 , p.y - 2, p.x + 1, p.y - 6); // left arm
			}
		else {
			line(p.x - 1 , p.y - 2, p.x - 1, p.y - 6); // left arm
			line(p.x + 7 , p.y - 2, p.x + 7, p.y - 6); // right arm
		}
		
	} else {
		line(p.x - 1 , p.y - 5, p.x - 1, p.y - 12); // left arm
		line(p.x + 7 , p.y - 5, p.x + 7, p.y - 12); // right arm
		drawBlock(p.holdingBlock, (p.x - 3) / 12, (p.y - 24) / 12);
	}

	fill(0, 0, 0);
	stroke(0, 0, 0);
	point(p.x + 2 + p.lookingRight, p.y - 8 + p.lookingDown);
	point(p.x + 4 + p.lookingRight, p.y - 8 + p.lookingDown);
};

var movePlayer = function(k) {
	if (keyCode === RIGHT) {
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
	} else if (keyCode === LEFT) {
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
		
	} else if (keyCode === UP) {
		player.y -= 2.0;
		if (player.y < 1) {
			player.y = 1;
		}

	
	} else if (keyCode === DOWN) {
		var fieldX = Math.floor((player.x + 0) / BLOCK_SIZE);
		var fieldY = Math.floor((player.y + 1) / BLOCK_SIZE);
		if (field[fieldY][fieldX] == BLOCK_WATER ||
				field[fieldY][fieldX] == BLOCK_WOOD ||
				field[fieldY][fieldX] == BLOCK_LEAVES) {
			player.y += 2.0;
		}
	} else if (key == 32) {
		if (player.jump == 0 && player.y > 40) {
			player.jump = 32;//32
		}
	}
	
	{
		var fieldX = Math.floor((player.x + 7) / BLOCK_SIZE);
		var fieldY = Math.floor((player.y - 5) / BLOCK_SIZE);
		visible[fieldY][fieldX] = true;
		if (fieldY > 0) {
			visible[fieldY - 1][fieldX] = true;
			if (fieldX > 0) {
				visible[fieldY - 1][fieldX - 1] = true;
			}
		} 
		if (fieldX > 0) {
			visible[fieldY][fieldX - 1] = true;
		}
		if (fieldY < visible.length - 1) {
			visible[fieldY + 1][fieldX] = true;
			if (fieldX < visible[0].length - 1) {
				visible[fieldY + 1][fieldX + 1] = true;
			}
		}
		if (fieldX < visible[0].length - 1) {
			visible[fieldY][fieldX + 1] = true;
		}
		if (fieldX < visible[0].length - 1  && fieldY > 0) {
			visible[fieldY - 1][fieldX + 1] = true;
		}
		if (fieldX > 0  && fieldY < visible.length - 1) {
			visible[fieldY + 1][fieldX - 1] = true;
		}
		
	}	

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
			p.x += player.lookingRight * 3;
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
	} else if (field[fieldY][fieldX] == BLOCK_WATER
			&& field[fieldY][fieldXr] == BLOCK_WATER) {
		// we are in the water, now you should sink
		// move down by one
		p.x += player.lookingRight * 0.5;
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



void keyPressed() {
	movePlayer();
	var k = key;
	if (keyCode === RIGHT) {
		player.lookingRight = 1;
		player.lookingDown = 0;
		player.rest = 4 * 60;
	} else if (keyCode === LEFT) {
		player.lookingRight = -1;
		player.lookingDown = 0;
		player.rest = 4 * 60;
	} else if (keyCode === UP) {
		player.lookingRight = 0;
		player.lookingDown = -1;
		player.rest = 4 * 60;
	} else if (keyCode === DOWN) {
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

draw = function() {
	fallPlayer(player);
	background(255, 255, 255);
	drawField();
	drawPlayer(player);
	drawMessage();
}