class Ghost extends Mobile {
  constructor(
    x,
    y,
    width,
    height,
    speed,
    imageX,
    imageY,
    imageWidth,
    imageHeight,
    range
  ) {
    super(x, y, width, height, speed);
    this.imageX = imageX;
    this.imageY = imageY;
    this.imageHeight = imageHeight;
    this.imageWidth = imageWidth;
    this.range = range;
    this.randomTargetIndex = parseInt(Math.random() * 4);
    this.target = randomTargetsForGhosts[this.randomTargetIndex];
    setInterval(() => {
      this.changeRandomDirection();
    }, 10000);
  }

  changeRandomDirection() {
    this.randomTargetIndex = Math.floor(Math.random() * (3 - 0 + 1) + 0);
  }

  move() {
    if (this.isInRange()) {
      this.target = pacman;
    } else {
      this.target = randomTargetsForGhosts[this.randomTargetIndex];
    }

    const graph = new Graph(map);

    const start = graph.grid[this.getMapY()][this.getMapX()];
    const end = graph.grid[this.target.getMapY()][this.target.getMapX()];
    const result = astar.search(graph, start, end);

    if (result.length > 0) {
      if (this.getMapY() > result[0].x) {
        this.nextDirection = DIRECTION_UP;
      }

      if (this.getMapY() < result[0].x) {
        this.nextDirection = DIRECTION_BOTTOM;
      }

      if (this.getMapX() > result[0].y) {
        this.nextDirection = DIRECTION_LEFT;
      }

      if (this.getMapX() < result[0].y) {
        this.nextDirection = DIRECTION_RIGHT;
      }
    } else {
      this.changeRandomDirection();
      this.target = randomTargetsForGhosts[this.randomTargetIndex];
    }

    this.moveProcess();
  }

  isInRange() {
    let xDistance = Math.abs(pacman.getMapX() - this.getMapX());
    let yDistance = Math.abs(pacman.getMapY() - this.getMapY());

    return (
      Math.sqrt(xDistance * xDistance + yDistance * yDistance) <= this.range
    );
  }

  changeAnimation() {
    this.currentFrame =
      this.currentFrame == this.frameCount ? 1 : this.currentFrame + 1;
  }

  draw() {
    canvasContext.save();
    canvasContext.drawImage(
      ghostFrames,
      this.imageX,
      this.imageY,
      this.imageWidth,
      this.imageHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
    canvasContext.restore();
    canvasContext.beginPath();
    canvasContext.strokeStyle = "red";
    canvasContext.arc(
      this.x + oneBlockSize / 2,
      this.y + oneBlockSize / 2,
      this.range * oneBlockSize,
      0,
      2 * Math.PI
    );
    canvasContext.stroke();
  }
}

let updateGhosts = () => {
  for (let i = 0; i < ghosts.length; i++) {
    ghosts[i].move();
  }
};

let drawGhosts = () => {
  for (let i = 0; i < ghosts.length; i++) {
    ghosts[i].draw();
  }
};
