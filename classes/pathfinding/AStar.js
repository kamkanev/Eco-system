class AStar {
  constructor(terrain, start, end, includeDiagonals = true) {

    this.zoom = terrain.zoom;

    this.grid = this.__generateGrid(terrain.map);

    this.withDiagonals = includeDiagonals;

    this.init(start, end);

  }

  init(startPoint, endPoint){

    this.start = this.grid[startPoint.x][startPoint.y];
    this.end = this.grid[endPoint.x][endPoint.y];

    this.start.isWall = false;
    this.end.isWall = false;

    this.isDone = false;
    this.noSolution = false;

    this.openSet = [];
    this.openSet.push(this.start);
    this.closeSet = [];

    this.path = [];

  }

  __generateGrid(map){

    var grid = [];

    for (var i = 0; i < map.length; i++) {
      grid[i] = [];
      for (var j = 0; j < map[i].length; j++) {
        grid[i][j] = new Spot(i, j);
      }
    }

    for (var i = 0; i < map.length; i++) {
      for (var j = 0; j < map[i].length; j++) {
        grid[i][j].addNeighbors(grid);
      }
    }

    return grid;

  }

  __heuristic(a, b){

    var hip = distance(a, b);
    // var manhatanDis = Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

    return hip;
  }

  update(){

    if(!this.isDone){

      if(this.openSet.length > 0){

        var winner = 0;

        for (var i = 0; i < this.openSet.length; i++) {
          if(this.openSet[i].f < this.openSet[winner].f){
            winner = i;
          }
        }

        var curr = this.openSet[winner];

        if(curr == this.end){

          this.path

          console.log("Done");
          this.isDone = true;
          // return;
        }

        removeFromArray(this.openSet, curr);
        this.closeSet.push(curr);

        var neighbors = curr.neighbors;

        for (var i = 0; i < neighbors.length; i++) {
          var neighbor = neighbors[i];

          if(!this.closeSet.includes(neighbor) && !neighbor.isWall){
            var tempG = curr.g + 1;// change to be cost not 1 later

            var newPath = false;

            if(this.openSet.includes(neighbor)){
              if(tempG < neighbor.g){
                neighbor.g = tempG;
                newPath = true;
              }
            }else{
              //debug later
              neighbor.g = tempG;
              newPath = true;
              this.openSet.push(neighbor);
            }

            if(newPath){
              neighbor.h = this.__heuristic(neighbor, this.end);
              neighbor.f = neighbor.g + neighbor.h;
              neighbor.previous = curr;
            }
          }
        }

      }else{
        //no solution
        console.log("No solution");
        this.noSolution = true;
        this.isDone = true;
        // return;
      }

      if(!this.noSolution){
        this.path = [];
        var t = curr;
        this.path.push(t);
        while(t.previous){
          this.path.push(t.previous);
          t = t.previous;
        }
      }

    }

  }

  draw(){

    for (var i = 0; i < Math.round(this.grid.length/this.zoom); i++) {
      for (var j = 0; j < Math.round(this.grid[i].length/this.zoom); j++) {
        if(!this.grid[i][j].isWall){
          this.grid[i][j].show("#d6d6d6", this.zoom);
        }else{
          this.grid[i][j].show("#fff000", this.zoom);
        }
      }
    }

    for (var i = 0; i < this.openSet.length; i++) {
      this.openSet[i].show("#00ff00", this.zoom);
    }

    for (var i = 0; i < this.closeSet.length; i++) {
      this.closeSet[i].show("#ff0000", this.zoom);
    }

    for (var i = 0; i < this.path.length; i++) {
      this.path[i].show("#00bbff", this.zoom);
    }

  }

}
