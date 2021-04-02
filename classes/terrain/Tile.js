class Tile extends Point {
  constructor(x, y, type = 0, size = 30) {
    super(x, y);
    this.type = type;
    this.isOccupie = false;
    this.size = size;
  }
}

Tile.types = TERRAIN_TYPES;


//Moving cost
/*
  ** from higher to lower cost

  -------- High cost -------
  * rocks -> snow
  * sand -> water

  * grass -> rocks

  * grass -> sand

** from lower to higher cost

  -------- Low cost -------
  * water -> sand
  * rocks -> grass

  * snow -> rocks
  * sand -> grass

*/
