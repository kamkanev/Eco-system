class Spot extends Point{
  constructor(x, y, isWall = false) {

    super(x, y);
    this.f = 0; // over all cost g + h
    this.g = 0; // cost to this spot
    this.h = 0; // heuristics
    this.isWall = isWall;

    this.previous = undefined;
    this.neighbors = [];

    // if(Math.random() < 0.4){
      // this.isWall = true;
    // }

  }

  addNeighbors(grid, withDiagonals = false){

    var i = this.x
    var j = this.y

    if(i < grid.length - 1)
      this.neighbors.push(grid[i+1][j])
    if(i > 0)
      this.neighbors.push(grid[i-1][j])
    if(j < grid[0].length - 1)
      this.neighbors.push(grid[i][j+1])
    if(j > 0)
      this.neighbors.push(grid[i][j-1])
    if(withDiagonals){
      if(i > 0 && j > 0)
        this.neighbors.push(grid[i-1][j-1])
      if(i < grid.length - 1 && j > 0)
        this.neighbors.push(grid[i+1][j-1])
      if(i < grid.length - 1 && j < grid[0].length - 1)
        this.neighbors.push(grid[i+1][j+1])
      if(i > 0 && j < grid[0].length - 1)
        this.neighbors.push(grid[i-1][j+1])
    }

  }

  show(color, size = 30, showG = false){

    context.fillStyle = color;
    context.fillRect(this.x * size, this.y * size, size - 1, size - 1);

    if(!showG){
      //draw the coords
      context.fillStyle = "black";
      context.font = "9px Arial";
      context.fillText(`${this.x},${this.y}`, this.x * size + size/4, this.y * size + size/2);
    }else{
      //draw the coords
      context.fillStyle = "black";
      context.font = "10px Arial";
      context.fillText(`${this.g}`, this.x * size + size/2, this.y * size + size/2);
    }

  }
}
