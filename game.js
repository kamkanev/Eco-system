// Creating variables

var a = new Rabbit(7,8);

console.log(a);

let noiseScale=0.02;
var arr = [];

var t = new Terrain();

t.init();

// for (let y = 0; y < canvas.height; y++) {
//   arr[y] = [];
//   for (var x = 0; x < canvas.width; x++) {
//     let noiseVal = PerlinNoise.noise(x*noiseScale, y*noiseScale, .8);
//     // console.log(`noise: ${noiseVal*80}, all: ${noiseVal*255}`);
//     arr[y][x] = {
//       x: noiseVal*80,
//       y : noiseVal*80,
//       c : Math.round(noiseVal * 255)
//     }
//   }
// }

var myX = 0, myY = 0;

function update() {
    myX = myX+(mouseX-myX)/10;
    myY = myY+(mouseY-myY)/10;
}

function draw() {
    // This is how you draw a rectangle

    t.draw();

    context.fillColor = "blue";
    context.fillRect(myX, myY, 30, 30);


};

function keyup(key) {
    // Show the pressed keycode in the console
    console.log("Pressed", key);
};

function mouseup() {
    // Show coordinates of mouse on click
    console.log("Mouse clicked at", mouseX, mouseY);
};
