function Cell(i, j) {
  this.i = i;
  this.j = j;
  this.wall = 3;
  this.walls = [true, true, true, true];
  this.visited = false;
  this.end = false;
  this.checkNeighbors = function () {
    let neighbors = [];

    let top = grid[index(i, j - 1)];
    let right = grid[index(i + 1, j)];
    let bottom = grid[index(i, j + 1)];
    let left = grid[index(i - 1, j)];

    if (top && !top.visited) {
      neighbors.push(top);
    }
    if (right && !right.visited) {
      neighbors.push(right);
    }
    if (bottom && !bottom.visited) {
      neighbors.push(bottom);
    }
    if (left && !left.visited) {
      neighbors.push(left);
    }

    if (neighbors.length > 0) {
      this.wall -= 1;
      let r = floor(random(0, neighbors.length));
      return neighbors[r];
    } else {
      return undefined;
    }
  };
  this.highlight = function () {
    let x = this.i * w;
    let y = this.j * w;
    noStroke();
    fill(0, 0, 255, 100);
    rect(x, y, w, w);
  };

  this.show = function () {
    let x = this.i * w;
    let y = this.j * w;
    stroke(255);
    if (this.walls[0]) {
      line(x, y, x + w, y);
    }
    if (this.walls[1]) {
      line(x + w, y, x + w, y + w);
    }
    if (this.walls[2]) {
      line(x + w, y + w, x, y + w);
    }
    if (this.walls[3]) {
      line(x, y + w, x, y);
    }

    if (this.visited && !this.end) {
      noStroke();
      fill(255, 0, 255, 100);
      rect(x, y, w, w);
    }

    if (this.end) {
      noStroke();
      fill(255, 255, 0, 100);
      rect(x, y, w, w);
    }
  };
}