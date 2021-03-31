class Terrain {
  constructor(isInverted = false) {

    //Generate random noiseScale for the terrain
    this.noiseScale = {
      x: (Math.random() < .90) ? Number((Math.random()/10).toFixed(3)) : Number((Math.random()/5).toFixed(3)),
      y: (Math.random() < .90) ? Number((Math.random()/10).toFixed(3)) : Number((Math.random()/5).toFixed(3)),
      z: Number(((Math.random()*10+1)/2).toFixed(2))
    }

    this.map = [];
    this.zoom = 30;
    this.isInBuildMode = false;
    this.isInverted = isInverted;
    this.deltaPoint = new Point();

    this.init();

  }

  init(){

    this.__generateNewTerrain();
  }

  // Renders the map
  __generateNewTerrain(){
    this.map = [];
    for (let x = 0; x < canvas.width; x++) {
      this.map[x] = [];
      for (var y = 0; y < canvas.height; y++) {
        let noiseVal = PerlinNoise.noise(x * this.noiseScale.x, y * this.noiseScale.x, this.noiseScale.z);
        this.__initMap(x, y, noiseVal);
      }
    }
  }

  __initMap(x, y, noise){

        this.map[x][y] = new Tile(x, y, this.getRandomType(noise));

  }

  getRandomType(noise){

    if(!this.isInverted){
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
    }else{
      if(noise < 0.10){
        return TERRAIN_TYPES.SNOW;
      }else if(noise < 0.20){
        return TERRAIN_TYPES.ROCKS
      }else if(noise < 0.40){
        return TERRAIN_TYPES.GRASS;
      }else if(noise < 0.50){
        return TERRAIN_TYPES.SAND;
      }else{
        return TERRAIN_TYPES.WATER;
      }
    }

  }

  // Is used to move the map coords when zoomed
  move(x = 0, y = 0){
    if(Math.round(this.map.length/this.zoom) + x < canvas.width){
      if(Math.round(this.map[0].length/this.zoom) + y < canvas.height){
        if(x >= 0 && y >= 0){
          this.deltaPoint = new Point(x, y);
        }
      }
    }
  }

  //Can change the zoom - to see more or less from the map
  changeZoom(z = 30){
    if(z >= 1 && z <= 200){
      this.zoom = z;
    }else if(z < 1){
      this.zoom = 1;
    }else if(z > 200){
      this.zoom = 200;
    }
  }

  //toggles build mode

  setBuildMode(b = true){
    this.isInBuildMode = b;
  }

  changeBuildMode(){
    this.isInBuildMode = !this.isInBuildMode;
  }

  // Draws the map using all properties from above
  draw(){

    var size = this.zoom;

    if(this.isInBuildMode){
      size--;
    }

    for (var x = this.deltaPoint.x; x < Math.round(this.map.length/this.zoom)+this.deltaPoint.x; x++) {

      if(this.map[x] != undefined){

        for (var y = this.deltaPoint.y; y < Math.round(this.map[x].length/this.zoom)+this.deltaPoint.y; y++) {

          if(this.map[x][y] != undefined){

            var c = this.map[x][y].type;
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

            context.fillRect((x - this.deltaPoint.x)*this.zoom, (y - this.deltaPoint.y)*this.zoom, size, size);

          }

        }
      }

    }

  }
}

Terrain.types = TERRAIN_TYPES;
