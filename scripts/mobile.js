class Mobile {
  constructor(x, y, width, height, speed) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.direction = 4;
    this.nextDirection = 4;
  }

  moveForwards() {
    switch (this.direction) {
      case DIRECTION_RIGHT:
        this.x += this.speed;
        break;
      case DIRECTION_UP:
        this.y -= this.speed;
        break;
      case DIRECTION_LEFT:
        this.x -= this.speed;
        break;
      case DIRECTION_BOTTOM:
        this.y += this.speed;
        break;
    }
  }

  moveProcess() {
    const isSameDirection = this.direction === this.nextDirection;

    if (
      this.willCollide() &&
      (isSameDirection || this.nextDirectionWillCollide())
    ) {
      return;
    }

    if (!this.nextDirectionWillCollide()) {
      this.direction = this.nextDirection;
    }

    this.moveForwards();

    if (this.getMapX() === -1) {
      this.x = 399;
    }

    if (this.getMapX() === 21) {
      this.x = 0;
    }
  }

  nextDirectionWillCollide() {
    if (this.nextDirection === DIRECTION_RIGHT) {
      if (!this.YIsFree()) {
        return true;
      }

      return map[this.getMapY()][this.getNextMapX()] === MAP_WALL;
    }

    if (this.nextDirection === DIRECTION_LEFT) {
      if (!this.YIsFree()) {
        return true;
      }

      return map[this.getMapY()][this.getLastMapX()] === MAP_WALL;
    }

    if (this.nextDirection === DIRECTION_BOTTOM) {
      if (!this.XIsFree()) {
        return true;
      }

      return map[this.getLastMapY()][this.getMapX()] === MAP_WALL;
    }

    if (this.nextDirection === DIRECTION_UP) {
      if (!this.XIsFree()) {
        return true;
      }

      return map[this.getNextMapY()][this.getMapX()] === MAP_WALL;
    }
  }

  willCollide() {
    if (this.direction === DIRECTION_RIGHT) {
      return map[this.getMapY()][this.getNextMapX()] === MAP_WALL;
    }

    if (this.direction === DIRECTION_LEFT) {
      return map[this.getMapY()][this.getLastMapX()] === MAP_WALL;
    }

    if (this.direction === DIRECTION_BOTTOM) {
      return map[this.getLastMapY()][this.getMapX()] === MAP_WALL;
    }

    if (this.direction === DIRECTION_UP) {
      return map[this.getNextMapY()][this.getMapX()] === MAP_WALL;
    }
  }

  getNextMapX() {
    return this.getMapX() + 1;
  }

  getLastMapX() {
    return this.getMapX() - 1;
  }

  getMapX() {
    if (this.direction === DIRECTION_LEFT) {
      return Math.ceil(this.x / oneBlockSize);
    }

    if (this.direction === DIRECTION_RIGHT) {
      return Math.floor(this.x / oneBlockSize);
    }

    return parseInt(this.x / oneBlockSize);
  }

  XIsFree() {
    return this.x % oneBlockSize === 0;
  }

  getNextMapY() {
    return this.getMapY() - 1;
  }

  getLastMapY() {
    return this.getMapY() + 1;
  }

  getMapY() {
    if (this.direction === DIRECTION_UP) {
      return Math.ceil(this.y / oneBlockSize);
    }

    if (this.direction === DIRECTION_BOTTOM) {
      return Math.floor(this.y / oneBlockSize);
    }

    return parseInt(this.y / oneBlockSize);
  }

  YIsFree() {
    return this.y % oneBlockSize === 0;
  }
}
