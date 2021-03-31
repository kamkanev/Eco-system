class Tile extends Point {
  constructor(x, y, type = 0) {
    super(x, y);
    this.type = type;
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
