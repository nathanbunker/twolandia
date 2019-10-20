var keys = []; // from original author: holds an array of which keys were pressed 
var tx = random(0, 400); // never used - remove
var ty = random(0, 400); // never used - remove
var visualline = false; // controls the button on the top-left corner 
var bt = 0; // time it takes to duplicate
var pause = false; // if the game is paused or not
var mobs = [];  // the list of moving entities
var foods = []; // the list of items the mobs can eat

// speed is never used
// targetx, targety: not sure these should be in the constructor, what if the target changes? 
var mob = function(x, y, targetx, targety, name, speed) {
	this.x = x;
	this.y = y;
	this.width = 15;
	this.height = 15;
	this.speed = speed;
	this.Color1 = random(1, 255);
	this.Color2 = random(1, 255);
	this.Color3 = random(1, 255);
	this.targetx = targetx;
	this.targety = targety;
	this.name = name;
	this.speed = random(0.1, 1);
	this.health = 99;
	this.healthr = round(this.health);
	this.dead = false;
	this.bubble = random(0, 400);
};

mob.prototype.draw = function() {
	noFill();
	if (this.dead === false) {
		ellipse(this.x, this.y, this.width, this.height);
		if (visualline === true) {
			line(this.x, this.y, this.targetx + 5, this.targety + 5);
		}
		stroke(0, 0, 0);
		arc(this.x, this.y, 9, 9, this.bubble, this.bubble + 90);
		textSize(12);
		fill(this.Color1, this.Color2, this.Color2);
		text(this.name, this.x - 10, this.y - 11);
		rect(this.targetx, this.targety, 7, 7);
		text(this.healthr, this.x + 10, this.y);
	}
	
	// if dead do you really want to do all this stuff? 

	// collision detection, did we get to eat? 
	if (this.x <= this.targetx + 5 && this.x >= this.targetx - 5
			&& this.y <= this.targety + 5 && this.y >= this.targety - 5) {
		this.targetx = random(0, 400);
		this.targety = random(0, 400);
		this.health = 100;

	}

	if (this.health < 30) {
		this.dead = true;
	}
	this.healthr = round(this.health);

	if (pause === false) {
		if (this.dead === false) {
			if (this.x < food.x) {
				this.x += this.speed;
			}
			if (this.x > food.x) {
				this.x -= this.speed;
			}
			if (this.y < food.y) {
				this.y += this.speed;
			}
			if (this.y > food.y) {
				this.y -= this.speed;
			}
		}
		this.health -= 0.2;
	}
	mouseClicked = function() {
		if (mouseX < 25) {
			mobs.push(new mob(random(0, 400), random(0, 400), food.x, food.y,
					"Bob", random(0.1, 1)));
		}
		if (mouseX > 25 && mouseX < 75 && mouseY < 25 && visualline === false) {
			visualline = true;
		} else if (mouseX > 25 && mouseX < 75 && mouseY < 25
				&& visualline === true) {
			visualline = false;
		}
	};
	if (this.health >= 100) {
		bt += 5;

	}
	if (bt > 5) {
		mobs.push(new mob(this.x, this.y, food.x, food.y, "Bob", random(
				this.speed - 0.1, this.speed + 0.1)));
		bt = 0;
	}

};


var food = function(x, y) {
	this.x = x;
	this.y = y;
};
food.prototype.draw = function() {
	rect(this.x, this.y, 10, 10);
};



draw = function() {
	background(255, 255, 255);

	line(25, 0, 25, 400);
	textSize(30);
	fill(0, 0, 0);
	text("a\nd\nd\n\no\nn\ne", 4, 96);
	noFill();
	rect(25, 0, 50, 25);
	fill(0, 0, 0);
	textSize(22);
	text("lines", 28, 21);

	for (var i = mobs.length - 1; i >= 0; i--) {
		mobs[i].draw();
	}

	// This creates a new food item 60 times a second, 
	// after 10 minutes of play you should have 60 * 60 * 10 = 36,000 pieces of food! 
	// To not create so much food, this creation statement has to be in an if statement
	foods.push(new food(random(0, 400), random(0, 400)));
	// recommend going in the positive direction generally
	// for (var i = 0; i < foods.length; i++) {
	for (var i = foods.length - 1; i >= 0; i--) {
		if (i < 10) {
			foods[i].draw();
			food.x = 0;
		}
	}

};

keyPressed = function() {
	keys[keyCode] = true;

};
keyReleased = function() {
	keys[keyCode] = false;
};