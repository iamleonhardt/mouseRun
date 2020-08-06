const Player = require("./Player");

class Mouse extends Player {
  constructor(...args) {
    super(...args);
    this.color = "#9badb7";
    this.radius = 16;
  }
}

module.exports = Mouse;
