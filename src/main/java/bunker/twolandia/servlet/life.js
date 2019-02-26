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
		processing.text(messageToPlayer.text, 7, 12);
		messageToPlayer.ttl--;
	}
}

const BLOCK_AIR = 0;
const BLOCK_STONE = 1;

var nc;


// 86 columns, 52 rows


var drawBlock = function(blockId, x, y) {
	switch (blockId) {
	case BLOCK_AIR:
		processing.stroke(72, 255, 255);
		processing.fill(102, 255, 255);
		processing.rect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
		break;
	case BLOCK_STONE:
		processing.stroke(0, 150, 0);
		processing.fill(0, 204, 0); 
		processing.rect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE - 1, BLOCK_SIZE - 1);
		break;
	default:
		processing.stroke(0, 0, 0);
		processing.fill(0, 0, 0); 
		processing.rect(x * BLOCK_SIZE, y * BLOCK_SIZE, 11, 11);
	}
	
	if (nc !== undefined && nc[y] !== undefined && nc[y][x] !== undefined) 
	{
		processing.fill(0, 0, 0);
		processing.textSize(8);
		processing.text(nc[y][x], x * BLOCK_SIZE + 4, y * BLOCK_SIZE + 10);
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
		messageToPlayer.text = "Welcome to Twolandia Life!";
		messageToPlayer.ttl = 15 * 60;
		p.starting = false;
	}
	
	
	processing.stroke(0, 0, 0);
	processing.strokeWeight(1);
	processing.fill(255, 145, 0); // orange for the body
	processing.rect(p.x, p.y, 6, -6);// body
	processing.fill(235, 202, 132); // tan 
	processing.rect(p.x, p.y - 6, 6, -4); // head
	// arms
	
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
};

var movePlayer = function(k) {
	if (processing.keyCode === processing.RIGHT) {
		player.x += 3.0;
	} else if (processing.keyCode === processing.LEFT) {
		player.x -= 3.0;
	} else if (processing.keyCode === processing.UP) {
		player.y -= 3.0;
	} else if (processing.keyCode === processing.DOWN) {
		player.y += 3.0;
	} 
	else if (processing.key == 32) {
		growLife();
	}
	else if (processing.key == 115) {
		var fieldX = Math.floor((player.x + 7) / BLOCK_SIZE);
		var fieldY = Math.floor((player.y - 5) / BLOCK_SIZE);
		if (field[fieldY] !== undefined) {
			field[fieldY][fieldX] = 1;
		}
	}
}

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
	}
}

var growLife = function() {
	var fieldNew = [];
	nc = [];
	for (y in field) {
		fieldNew[y] = [];
		nc[y] = [];
		for (x in field[y]) {
			nc[y][x] = 0;
			fieldNew[y][x] = field[y][x];
		}
	}
	
	for (y in field) {
		if (y > 0 && y < (field.length - 3))
		{
			for (x in field[y]) {
				if (x > 0 && x < (field[y].length - 1))
				{
					var neighborCount = 0;
					var xp = Number(x);
					var yp = Number(y);
					if (field[yp-1] !== undefined && field[yp-1][xp-1] == 1)
					{
						neighborCount++;
					}
					if (field[yp-1] !== undefined && field[yp-1][xp] == 1)
					{
						neighborCount++;
					}
					if (field[yp-1] !== undefined && field[yp-1][xp + 1] == 1)
					{
						neighborCount++;
					}
					if (field[yp] !== undefined && field[yp][xp-1] == 1)
					{
						neighborCount++;
					}
					if (field[yp] !== undefined && field[yp][xp+1] == 1)
					{
						neighborCount++;
					}
					if (field[yp+1] !== undefined && field[yp+1][xp-1] == 1)
					{
						neighborCount++;
					}
					if (field[yp+1] !== undefined && field[yp+1][xp] == 1)
					{
						neighborCount++;
					}
					if (field[yp+1] !== undefined && field[yp+1][xp+1] == 1)
					{
						neighborCount++;
					}
					nc[yp][xp] = neighborCount;
					if (field[yp][xp] == 1)
					{
						if (neighborCount == 2 || neighborCount == 3)
						{
							//survive!
							fieldNew[yp][xp] = 1;
						}
						else 
						{
							// dies!
							fieldNew[yp][xp] = 0;
						}
					}
					else 
					{
						if (neighborCount == 3)
						{
							//come alive!
							fieldNew[yp][xp] = 1;
						}
						else 
						{
							// stay dead!
							fieldNew[yp][xp] = 0;
						}
					}
				}
			}
		}
	}
    field = fieldNew;
}

processing.draw = function() {
	processing.background(255, 255, 255);
	drawField();
	drawPlayer(player);
	drawMessage();
	
}