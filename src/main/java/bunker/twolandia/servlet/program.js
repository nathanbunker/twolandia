var x = 130;

void keyPressed() {
	if (keyCode === RIGHT) {
		x++;
	} else if (keyCode === LEFT) {
		x--;
	}
}



draw = function() {
	fill(255, 0, 0);
	background(255, 200, 200);
	text('Hello World', x, 100);
}
