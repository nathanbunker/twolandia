var x = 203;
var y = 221;
var t = random(0, 400);
var p = random(0, 400);
var wood = 0;
var time = 50;//50
var sx = random(600, 1000);
var sy = 305;
var st = 1;
var sm = random(sx +4, sx -4);
var sweed = 2;//2
var swy = 249;
var fix = 72;
var f = false;
var cx = random(0, 400);
var flx = 196;
var hx = 677;
var h1 = random(43, 107);
var h2 = random(47, 107);
var h3 = random(49, 107);
var h4 = random(50, 107);
var h5 = random(53, 107);
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
var food = random(0, 22);
var s = round(food);
var trade = false;//false
var hnb = false;//false
var a = 9;



/*to do:
    make animals. ;sheep. ;fish. ;bird. ;
    add house.*
    make use of gold.!
    make use of treasures.!
    create longer loops.!
*/

var player = function() { 
    fill(255, 145, 0);
    rect(x, y, 6, 10);//body
    fill(235, 202, 132);
    rect(x, y-2, 6, 5);//head
    //arms
    rect(x-1, y+2, 1, 6);
    rect(x+6, y+2, 1, 6);
    //fall in pond
    fill(0, 0, 0);
    if(x <= p + 50 && x >= p - 50) {y = 255;}
    //get out of pond
    if(x >= p + 50 || x <= p - 50 && y === 255) {y = 221;}
    //move
    if(keyIsPressed && keyCode === RIGHT) {point(x+5, y+0); point(x+3, y+0);}
    if(keyIsPressed && keyCode === LEFT) {point(x+1, y+0);
    point(x+3, y+0);}
    if(keyIsPressed === false || keyCode === UP || keyCode === DOWN) {point(x+2, y+0); point(x+4, y+0);}
};

var tree = function() {
    fill(128, 70, 0);
    rect(t, 201, 14, 30);
    fill(12, 105, 0);
    if(d === true) {fill(71, 166, 60);}
    if(x >= db + 100) {fill(214, 182, 79);}
    ellipse(t+7, 192, 47, 48);
    fill(255, 0, 0);
    if(d === true) {fill(232, 183, 116);}
    ellipse(t-3, 197, 7, 7);
    ellipse(t+16, 195, 7, 7);
    ellipse(t+9, 180, 7, 7);
    //move
    if(keyIsPressed && keyCode === RIGHT) {t = t -1.5;}
    if(keyIsPressed && keyCode === LEFT) {t = t +1.5;}
    //cant go there
    if(t <= p + 51 && t >= p- 51) {t = random(0, 400);}
    
    
};

var background1 = function() { 
    fill(107, 66, 0);
    rect(-1, 240, 402, 300);
    fill(0, 255, 43);
    stroke(0, 255, 51);
    if(d === true) {fill(87, 207, 76); stroke(87, 207, 76);}
    if(x >= db + 100) {fill(214, 182, 79); stroke(214, 182, 79);}
    rect(-4, 231, 407, 12, 19);
    stroke(0, 0, 0);
};

var sky = function() { 
    fill(9, 215, 230);
    if(time <= 10 && time > 0) {fill(128, 65, 95);}
    if(time <= 0) {fill(71, 71, 71);}
    rect(-1, -1, 402, 231);
};

var pond = function() { 
    fill(0, 119, 255);
    ellipse(p, 230, 102, 70);
    //move
    if(keyIsPressed && keyCode === RIGHT) {p = p -1.5;}
    if(keyIsPressed && keyCode === LEFT) {p = p +1.5;}
};

var timeofday = function() { 
    time = time -0.02;
    if(time <= -20) {time = 50;}
};

var sheep = function() { 
    fill(242, 242, 242);
    rect(sx+17, sy-80, 8, 5, 1);
    rect(sx+15, sy-82, 5, 4);
    stroke(255, 255, 255);
    rect(sx+18, sy-75, 1, 1);
    rect(sx+23, sy-75, 1, 1);
    stroke(0, 0, 0);
    //cant go there
    if(sx <= p + 51 && sx >= p- 49) {sx += 10;}
    //move
    if(keyIsPressed && keyCode === RIGHT) {sx = sx -1.5;}
    if(keyIsPressed && keyCode === LEFT) {sx = sx +1.5;}
    //movement
    st = st -0.01;
    if(st <= 0) {st = 1; sm = random(sx +6, sx -6);}
    if(sx < sm) {sx = sx +0.2;}
    if(sx > sm) {sx = sx -0.2;}
};

var waterplants = function() { 
    fill(30, 255, 0);
    stroke(30, 255, 0);
    rect(p-21, swy, 1, 11);
    if(sweed <= 1 && sweed > 0) {rect(p-24, 252, 2, 1); rect(p-19, 257, 2, 1);}
    if(sweed <= 0 && sweed > -1) {rect(p-24, 257, 2, 1); rect(p-19, 252, 2, 1);}
    stroke(0, 0, 0);
    //plant two
    fill(30, 255, 0);
    stroke(30, 255, 0);
    rect(p-5, swy+4, 1, 11);
    if(sweed <= 1 && sweed > 0) {rect(p-8, 260, 2, 1); rect(p-3, 255, 2, 1);}
    if(sweed <= 0 && sweed > -1) {rect(p-8, 255, 2, 1); rect(p-3, 260, 2, 1);}
    stroke(0, 0, 0);
    //plant three
    fill(30, 255, 0);
    stroke(30, 255, 0);
    rect(p+11, swy+3, 1, 11);
    if(sweed <= 1 && sweed > 0) {rect(p+13, 258, 2, 1); rect(p+8, 254, 2, 1);}
    if(sweed <= 0 && sweed > -1) {rect(p+8, 258, 2, 1); rect(p+13, 254, 2, 1);}
    stroke(0, 0, 0);
    //movement
    sweed = sweed -0.025;
    if(sweed < -1) {sweed = 2;}
    //sweed = 1.1;
    
};

var mud = function() { 
    fill(79, 45, 0);
    rect(p-47, 193, 95, 70, 23);
};

var fishy = function() { 
    stroke(255, 140, 0);
    rect(fix, 240, 3, 1);
    stroke(0, 0, 0);
    //get there
    if(fix >= p +47) {fix = fix -20;}
    if(fix <= p-47) {fix = fix +20;}
    //move
    if(fix < p +51 && fix > p -51) {fix = fix +0.1;
    if(fix >= p +30) {f = true;
    }
    if(f === true) {fix -= 0.2;}
    if(fix <= p -30) {f = false;}
    }
    //move
    if(keyIsPressed && keyCode === RIGHT) {fix = fix -1.5;}
    if(keyIsPressed && keyCode === LEFT) {fix = fix +1.5;}
};

var clouds = function() { 
    fill(255, 255, 255);
    stroke(255, 255, 255);
    ellipse(cx, 49, 51, 51);
    ellipse(cx-20, 37, 51, 51);
    ellipse(cx-35, 49, 51, 51);
    stroke(0, 0, 0);
    //move
    cx = cx + 0.05;
    //player move
    if(keyIsPressed && keyCode === RIGHT) {cx = cx -1.5;}
    if(keyIsPressed && keyCode === LEFT) {cx = cx +1.5;}
    if(cx > 460) {cx = -50;}
    if(cx < -50) {cx = 450;}
    
};

var flowers = function() { 
    strokeWeight(2);
    stroke(19, 140, 17);//poppy
    line(flx, 227, flx, 231);
    stroke(0, 0, 0);
    stroke(255, 0, 0);
    strokeWeight(4);
    point(flx, 227);
    stroke(0, 0, 0);
    strokeWeight(1);
    //move
    if(keyIsPressed && keyCode === RIGHT) {flx = flx -1.5;}
    if(keyIsPressed && keyCode === LEFT) {flx = flx +1.5;}
    //cant go there
    if(flx <= p + 51 && flx >= p- 51) {flx = flx +1;}
    //loop
    if(flx > 403) {flx = -3;}
    if(flx < -3) {flx = 403;}
};

var background2 = function() { 
    fill(99, 72, 30);
    stroke(13, 255, 0);
    strokeWeight(5);
    if(d === true) {stroke(89, 212, 78);}
    if(x >= db + 100) {stroke(214, 182, 79);}
    arc(hx, 231, 175, h1, -179, 0);
    arc(hx+81, 231, 139, h2, -179, -0);
    arc(hx+160, 231, 145, h3, -179, -0);
    arc(hx+260, 231, 139, h4, -179, -0);
    arc(hx+323, 231, 139, h5, -179, -0);
    stroke(0, 0, 0);
    strokeWeight(1);
    //move
    if(keyIsPressed && keyCode === RIGHT) {hx = hx -1.5;}
    if(keyIsPressed && keyCode === LEFT) {hx = hx +1.5;}
    //loop
    if(hx < -400) {hx = 699; h1 = random(43, 107);
h2 = random(47, 107);
h3 = random(49, 107);
h4 = random(50, 107);
h5 = random(53, 107);}
    if(hx > 700) {hx = -372;}
};

var forest = function() { 
    fill(0, 79, 1);
    stroke(0, 0, 0);
    rect(fox, -2, 10000, 233);
    textSize(3);
    textSize(70);
    fill(0, 0, 0);
    text("evil\nforest", fox+9789, 70);
    //move
    if(keyIsPressed && keyCode === RIGHT) {fox = fox -1.5;}
    if(keyIsPressed && keyCode === LEFT) {fox = fox +1.5;}
};

var town = function() { 
    fill(158, 150, 41);
    strokeWeight(4);
    stroke(148, 106, 21);//houses
    rect(to+121, 187, 40, 42);
    rect(to+3, 185, 48, 44);
    rect(to+63, 220, 48, 9);//garden wall
    strokeWeight(1);
    stroke(0, 0, 0);
    fill(0, 0, 0);
    rect(to+21, 214, 10, 16);//doors
    rect(to+135, 214, 10, 16);
    //garden plants
    fill(37, 222, 9);
    stroke(55, 214, 55);
    rect(to+66, 212, 7, 5);
    rect(to+78, 212, 7, 5);
    rect(to+90, 212, 7, 5);
    rect(to+102, 212, 7, 5);
    stroke(0, 0, 0);
    //move
    if(keyIsPressed && keyCode === RIGHT) {to = to -1.5;}
    if(keyIsPressed && keyCode === LEFT) {to = to +1.5;}
    //loop
    if(to <= -166) {to = random(600, 900);}
    if(to >= 1001) {to = -167;}
};

var birds = function() { 
    fill(30, 0, 255);//blue bird
    stroke(21, 0, 255);
    ellipse(bx, by, 4, 4);
    //fly
    bx = bx +0.2;
    if(bx >= 500) {back = true;}
    if(back === true) {bx = bx -0.6;}
    if(bx <= -100) {back = false;}
    by = by -0.2;
    if(by <= 100) {up = true;}
    if(up === true) {by = by +0.6;}
    if(by >= 150) {up = false;}
    //move
    if(keyIsPressed && keyCode === RIGHT) {bx = bx -1.5;}
    if(keyIsPressed && keyCode === LEFT) {bx = bx +1.5;}
};

var inventoryscreen = function() { 
    fill(255, 255, 255);
    stroke(0, 0, 0);
    rect(354, 356, 46, 44);//inventory window
    fill(176, 117, 14);
    rect(366, 369, 24, 24, 3);//chest
    fill(0, 0, 0);
    rect(366, 378, 24, 1);//lid
    fill(179, 179, 179);
    rect(376, 376, 4, 8);//lock
    textSize(11);
    fill(0, 0, 0);
    text("inventory", 357, 366);
    //if clicked
    if(mouseIsPressed && mouseX >= 354 && mouseY >=  356) {inventory = true;}
    if(inventory === true) {
        background(186, 186, 186);
        textSize(60);
        text("treasures: "+rm, 70, 70);
        text("gold: "+gn, 70, 128);
        fill(255, 255, 255);
    }
    if(mouseIsPressed && mouseX >= 354 && mouseY >=  356 && inventory === true) {inventory = false;}
    
    
};

var desert = function() { 
    //move
    if(keyIsPressed && keyCode === RIGHT) {db = db -1.5;}
    if(keyIsPressed && keyCode === LEFT) {db = db +1.5;}
    if(x >= db) {d = true;}
    else{d = false;}
    
};

var treasurechest = function() { 
    fill(189, 120, 0);
    rect(chestx - 4, 224, 7, 7);//chest
    line(chestx - 4, 227, chestx + 3, 227);//lid
    stroke(158, 158, 158);
    strokeWeight(2);
    line(chestx, 227, chestx, 228);//lock
    strokeWeight(1);
    //move
    if(keyIsPressed && keyCode === RIGHT) {chestx = chestx -1.5;}
    if(keyIsPressed && keyCode === LEFT) {chestx = chestx +1.5;}
    //pond
    if(chestx <= p + 51 && chestx >= p- 51) {chestx = random(0, 700);}
    //loop
    if(chestx <= -20) {chestx = 3000;}
    //reapear
    if(mouseIsPressed && mouseX >= chestx && mouseX <= chestx + 7 && mouseY >= 224 && mouseY <= 224 + 7) {rm = rm + 1; gn += 5; chestx = random(x + 1000, x + 3000);}
};

var startscreen = function() { 
    if(start === true) {
        fill(219, 219, 219);//back
        rect(11, 11, 377, 377);
        fill(255, 255, 255);//play game
        rect(28, 30, 107, 28);
        fill(0, 0, 0);
        textSize(23);
        text("play game", 36, 49);
        if(mouseIsPressed && mouseX >= 28 && mouseX <= 135 && mouseY >= 30 && mouseY <= 58) {start = false;}
        
        fill(0, 0, 0);
        textSize(11);
        if(s === 0) {text("used for making soup!", 18, 380);}//1
        if(s === 1) {text("anteaters caught on camera!", 18, 380);}//2
        if(s === 2) {text("insanely cute Llamas!", 18, 380);}//3
        if(s === 3) {text("save the ducks!", 18, 380);}//4
        if(s === 4) {text("needed for repairs!", 18, 380);}//5
        if(s === 5) {text("testing... 1, 2, 3,... testing...", 18, 380);}//6
        if(s === 6) {text("best if used by last week!", 18, 380);}//7
        if(s === 7) {text("D O N U T S!", 18, 380);}//8
        if(s === 8) {text("used for making soup!", 18, 380);}//9
        if(s === 9) {text("anteaters caught on camera!", 18, 380);}//10
        if(s === 10) {text("insanely cute Llamas!", 18, 380);}//1
        if(s === 11) {text("save the ducks!", 18, 380);}//2
        if(s === 12) {text("needed for repairs!", 18, 380);}//3
        if(s === 13) {text("testing... 1, 2, 3,... testing...", 18, 380);}//4
        if(s === 14) {text("best if used by last week!", 18, 380);}//5
        if(s === 15) {text("D O N U T S!", 18, 380);}//6
        if(s === 16) {text("bananas!", 18, 380);}//7                          /
        if(s === 17) {text("cheese!", 18, 380);}//8
        if(s === 18) {text("pizza!", 18, 380);}//9
        if(s === 19) {text("pineapples!", 18, 380);}//10
        if(s === 20) {text("apples!", 18, 380);}
        if(s === 21) {text("cereal!", 18, 380);}
        if(s === 22) {text("cookies!", 18, 380);}
        
    }
    
        
};

var intohouse = function() { 
    if(x >= to + 135 && x <= to +145 && keyIsPressed && keyCode === UP) {trade = true;}
    //line(to+135, 0, to+135, 400);
    //line(to+145, 0, to+145, 400);
    if(trade === true) {background(194, 184, 78);
    fill(171, 119, 55);
    stroke(171, 119, 55);
    triangle(1, 399, 123, 400, 68, 321);//floor
    triangle(400, 400, 292, 400, 340, 304);
    rect(68, 320, 272, 79);
    rect(178, 303, 161, 17);
    fill(194, 184, 78);//wall
    stroke(0, 0, 0);
    rect(75, -1, 264, 304);
    fill(135, 135, 135);
    rect(67, 264, 124, 55);//desk
    quad(190, 265, 192, 319, 202, 304, 200, 253);
    quad(67, 264, 190, 264, 200, 252, 76, 252);
    fill(255, 115, 0);//sign
    textSize(70);
    text("shop", 87, 42);
    //out
    if(keyIsPressed && keyCode === DOWN) {trade = false;}
    //change arrow
    if(trade === true) {a = 25;}
    else{a = 9;}
    
    
    }
    
};

var keynotation = function() { 
    //notation
    if(x >= to + 135 && x <= to +145) {hnb = true;}
    else{hnb = false;}
    if(hnb === true) {fill(0, 0, 0); rect(1, 1, 28, 30, 6);stroke(255, 255, 255);strokeWeight(4);line(16, 10, 16, 24);line(16, a, 25, 15);line(16, a, 6, 15);strokeWeight(1);}
};

draw = function() {
    background(255, 255, 255);
    
    //most everything
    if(trade === false) {
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
    player();
    clouds();
    flowers();
    birds();
    forest();
    treasurechest();
    inventoryscreen();
    desert();
    }
    
    //village shop(s)
    intohouse();
    
    //key notation
    keynotation();
    
    
    //start screen
    startscreen();//        =)
    
    
    
};