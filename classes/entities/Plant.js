class Plant{
  constructor(tile, terrain) {
    this.location = tile;
    this.terrain = terrain;
    this.screenBox = translatePointToScreen(this.location, terrain.zoom, terrain.deltaPoint);
  }

  update(){


    this.screenBox = translatePointToScreen(this.location, this.terrain.zoom, this.terrain.deltaPoint);

  }

  draw(){

    var tile = this.location;

    context.fillStyle = "green";
    context.fillRect(this.screenBox.x + 5, this.screenBox.y + 5, this.terrain.zoom/2 - 1, this.terrain.zoom/2 - 1);

  }
}
