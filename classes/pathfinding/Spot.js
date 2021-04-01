class Spot extends Point{
  constructor(x, y) {

    super(x, y);
    this.f = 0; // over all cost g + h
    this.g = 0; // cost to this spot
    this.h = 0; // heuristics
    this.isWall = false;

    this.previous = undefined;
    this.neighbors = [];

    // if(Math.random() < 0.4){
    //   this.isWall = true;
    // }

  }

  addNeighbors(grid){

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
    if(i > 0 && j > 0)
      this.neighbors.push(grid[i-1][j-1])
    if(i < grid.length - 1 && j > 0)
      this.neighbors.push(grid[i+1][j-1])
    if(i < grid.length - 1 && j < grid[0].length - 1)
      this.neighbors.push(grid[i+1][j+1])
    if(i > 0 && j < grid[0].length - 1)
      this.neighbors.push(grid[i-1][j+1])

  }

  show(color, size = 30){

    context.fillStyle = color;
    context.fillRect(this.x * size, this.y * size, size - 1, size - 1);

    //draw the coords
    context.fillStyle = "black";
    context.font = "9px Arial";
    context.fillText(`${this.x},${this.y}`, this.x * size + size/4, this.y * size + size/2);

  }
}
