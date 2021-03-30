const TERRAIN_TYPES = {
  WATER: 0,
  SAND: 1,
  GRASS: 2,
  ROCKS: 3,
  SNOW: 4
};

class Terrain {
  constructor() {

    this.noiseScale = {
      x: (Math.random() < .90) ? Number((Math.random()/10).toFixed(3)) : Number((Math.random()/5).toFixed(3)),
      y: (Math.random() < .90) ? Number((Math.random()/10).toFixed(3)) : Number((Math.random()/5).toFixed(3)),
      z: Number(((Math.random()*10+1)/2).toFixed(2))
    }

    this.map = [];
    this.zoom = 15;
    this.deltaPoint = new Point();

  }

  init(){

    // this.imageData = c2d.createImageData(canvas.width, canvas.height);
    // var data = this.imageData.data;
    // var minN = 1, maxTh = 0;

    for (let x = 0; x < canvas.width; x++) {
      this.map[x] = [];
      for (var y = 0; y < canvas.height; y++) {
        let noiseVal = PerlinNoise.noise(x * this.noiseScale.x, y * this.noiseScale.x, this.noiseScale.z);
        // minN = Math.min(minN, noiseVal);
        // maxTh = Math.max(maxTh, noiseVal);
        // console.log(x, y, noiseVal);
        // // console.log(`noise: ${noiseVal}, all: ${noiseVal*255}`);
        // var i = (y * canvas.width + x) * 4;
        // data[i + 0] = 0|((1 + noiseVal) / 2 * 255);//0x0f;
        // data[i + 1] = 0|((1 + noiseVal) / 2 * 255);//0x70;
        // data[i + 2] = 0|((1 + noiseVal) / 2 * 255);//0x07;
        // data[i + 3] = 0|((1 + noiseVal) / 2 * 255);
        this.__initMap(x, y, noiseVal);
      }
    }

            // console.log(data.length);
  }

  __initMap(x, y, noise){

        this.map[x][y] = this.getRandomType(noise);

  }

  getRandomType(noise){

    if(noise < 0.30){
      return TERRAIN_TYPES.WATER;
    }else if(noise < 0.40){
      return TERRAIN_TYPES.SAND
    }else if(noise < 0.60){
      return TERRAIN_TYPES.GRASS;
    }else if(noise < 0.80){
      return TERRAIN_TYPES.ROCKS;
    }else if(noise < 0.90){
      return TERRAIN_TYPES.SNOW;
    }

  }

  move(x, y){
    if(Math.round(this.map.length/this.zoom) + x < canvas.width){
      if(Math.round(this.map[0].length/this.zoom) + y < canvas.height){
        if(x >= 0 && y >= 0){
          this.deltaPoint = new Point(x, y);
        }
      }
    }
  }

  draw(){

    for (var x = this.deltaPoint.x; x < Math.round(this.map.length/this.zoom)+this.deltaPoint.x; x++) {
      for (var y = this.deltaPoint.y; y < Math.round(this.map[x].length/this.zoom)+this.deltaPoint.y; y++) {
        var c = this.map[x][y];
        // console.log(c);
        if(c == TERRAIN_TYPES.WATER){
          context.fillStyle = "#0000ff";
        }else if(c == TERRAIN_TYPES.SAND){
          context.fillStyle = "#fff000";
        }else if(c == TERRAIN_TYPES.GRASS){
          context.fillStyle = "#00ff00";
        }else if(c == TERRAIN_TYPES.ROCKS){
          context.fillStyle = "#787878";
        }else if(c == TERRAIN_TYPES.SNOW){
          context.fillStyle = "#ffffff";
        }

        context.fillRect((x - this.deltaPoint.x)*this.zoom, (y - this.deltaPoint.y)*this.zoom, this.zoom, this.zoom);

      }
    }

  }
}

Terrain.types = TERRAIN_TYPES;
