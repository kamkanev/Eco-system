// Creating variables
var t = new Terrain();

var a = new AStar(t, t.map[0][0], t.map[5][8]);

var cursor = new Point();
var box = new Point(100, 100);
var clicked = undefined;

function update() {
    cursor.x = cursor.x+(mouseX-cursor.x)-5;
    cursor.y = cursor.y+(mouseY-cursor.y)-5;

    if(clicked != undefined){

      var dx = clicked.x - box.x;
      var dy = clicked.y - box.y;
      var dist = Math.sqrt(dx*dx, dy*dy);
      var speed = 2;
      var angle = Math.atan2(dy, dx);

      box.x += speed * Math.cos(angle);
      box.y += speed * Math.sin(angle);

      // console.log(dist);

      if(Math.round(dist) <= 1){
        clicked = undefined;
      }

    }

    a.update();
}

function draw() {
    // This is how you draw a rectangle
    // t.draw();
    a.draw();

    context.fillStyle = "pink";
    context.fillRect(cursor.x, cursor.y, 10, 10);

    context.fillStyle = "red";
    context.fillRect(box.x, box.y, 30, 30);


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

    clicked = new Point(mouseX, mouseY);
};
