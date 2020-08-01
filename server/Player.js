class Player {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type; // Cat or Mouse
    // Movement
    this.speed = 5;
    this.movingUp = false;
    this.movingDown = false;
    this.movingLeft = false;
    this.movingRight = false;
  }

  updatePosition = () => {
    if (this.movingRight) {
      this.x += this.speed;
    }
    if (this.movingLeft) {
      this.x -= this.speed;
    }
    if (this.movingUp) {
      this.y -= this.speed;
    }
    if (this.movingDown) {
      this.y += this.speed;
    }
  };
}

module.exports = Player;
