class Plant{
  constructor(tile) {
    this.location = tile;
  }

  draw(){

    var tile = this.location;

    context.fillStyle = "green";
    context.fillRect(tile.x * tile.size + tile.size/4, tile.y * tile.size + tile.size/4, tile.size/2, tile.size/2);

  }
}
