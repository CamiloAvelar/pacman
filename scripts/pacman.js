class Pacman extends Mobile {
  constructor(x, y, width, height, speed) {
    super(x, y, width, height, speed)
    this.frameCount = 7;
    this.currentFrame = 1;
    setInterval(() => {
      this.changeAnimation();
    }, 100);
  }

  draw() {
    canvasContext.save();
    canvasContext.translate(
      this.x + oneBlockSize / 2,
      this.y + oneBlockSize / 2
    );
    canvasContext.rotate((this.direction * 90 * Math.PI) / 180);
    canvasContext.translate(
      -this.x - oneBlockSize / 2,
      -this.y - oneBlockSize / 2
    );
    canvasContext.drawImage(
      pacmanFrames,
      (this.currentFrame - 1) * oneBlockSize,
      0,
      oneBlockSize,
      oneBlockSize,
      this.x,
      this.y,
      this.width,
      this.height
    );
    canvasContext.restore();
  }

  changeAnimation() {
    this.currentFrame =
      this.currentFrame == this.frameCount ? 1 : this.currentFrame + 1;
  }
}
