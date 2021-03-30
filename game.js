// Creating variables

var a = new Rabbit(7,8);

console.log(a);

let noiseScale=0.02;
var arr = [];

var t = new Terrain();

var cursor = new Point();

function update() {
    cursor.x = cursor.x+(mouseX-cursor.x);
    cursor.y = cursor.y+(mouseY-cursor.y);
}

function draw() {
    // This is how you draw a rectangle
    t.draw();

    context.fillStyle = "pink";
    context.fillRect(cursor.x, cursor.y, 30, 30);


};

function keyup(key) {
    // Show the pressed keycode in the console
    console.log("Pressed", key);

    if(key == 66){//b
      t.changeBuildMode();
    }
};

function keydown(key) {
    // Show the pressed keycode in the console
    console.log("PressedDown", key);

    if(isKeyPressed[90]){//z
      t.changeZoom(t.zoom + 5);
    }

    if(isKeyPressed[88]){//x
      t.changeZoom(t.zoom - 5);
    }


    if(isKeyPressed[37]){//left
      t.move(t.deltaPoint.x-1, t.deltaPoint.y);
    }

    if(isKeyPressed[39]){//right
      t.move(t.deltaPoint.x+1, t.deltaPoint.y);
    }

    if(isKeyPressed[38]){//up
      t.move(t.deltaPoint.x, t.deltaPoint.y-1);
    }

    if(isKeyPressed[40]){//down
      t.move(t.deltaPoint.x, t.deltaPoint.y+1);
    }
};

function mouseup() {
    // Show coordinates of mouse on click
    console.log("Mouse clicked at", mouseX, mouseY);
};
