class Player {
  constructor(x, y, type, name) {
    this.x = x;
    this.y = y;
    this.type = type; // Cat or Mouse
    this.name = name;
    // Movement
    this.speed = 8;
    this.movingUp = false;
    this.movingDown = false;
    this.movingLeft = false;
    this.movingRight = false;
  }
  update = () => {
    this.updatePosition();
  };

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
  //Check collision
  checkCollision = (entity) => {
    //if the distance between the two entities minus their radius <= 0 then return colliding
    if (getDistance(this, entity) < 0) {
      return true;
    } else {
      return false;
    }
  };
}

module.exports = Player;
