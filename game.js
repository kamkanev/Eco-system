// Creating variables
var t = new Terrain();

var a = new AStar(t, t.map[0][0], t.map[25][18], true);

var maze = maze(20, 20);

var mazePrint = display(maze).split("\n");

var pl = new Plant(t.map[13][8]);

var cursor = new Point();
var box = new Point(0, 0);
var clicked = undefined;
var path = undefined;

function update() {
    cursor.x = cursor.x+(mouseX-cursor.x)-5;
    cursor.y = cursor.y+(mouseY-cursor.y)-5;

    if(clicked != undefined){

      var dx = clicked.x*t.zoom - box.x;
      var dy = clicked.y*t.zoom - box.y;
      var dist = Math.sqrt(dx*dx, dy*dy);
      var speed = 10;
      var angle = Math.atan2(dy, dx);

      box.x += speed * Math.cos(angle);
      box.y += speed * Math.sin(angle);

      // console.log(dist);

      if(Math.round(box.x/t.zoom) == clicked.x && Math.round(box.y/t.zoom) == clicked.y){
        clicked = undefined;
      }

    }

    // a.update();

    if(a.isDone && !a.noSolution && path == undefined){
      path = a.path.slice(0);

    }

    if(clicked == undefined && path != undefined && path.length > 0){
      clicked = path.pop();
    }

}

function draw() {
    // This is how you draw a rectangle
    t.draw();
    // a.draw();
    // a.debugDraw(true);

    pl.draw();

    context.fillStyle = "pink";
    context.fillRect(cursor.x, cursor.y, 10, 10);

    context.fillStyle = "red";
    context.fillRect(box.x, box.y, t.zoom -1, t.zoom-1);

    // for (var i = 0; i < mazePrint.length; i++) {
    //   for (var j = 0; j < mazePrint[i].length; j++) {
    //     if(mazePrint[i][j] != " "){
    //       context.fillStyle = "black";
    //     }else{
    //       context.fillStyle = "#d8d8d8";
    //     }
    //     context.fillRect(i*20, j*20, 19, 19);
    //   }
    //
    // }

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

    //clicked = new Point(mouseX, mouseY);
};
