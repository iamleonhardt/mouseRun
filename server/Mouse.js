const Player = require("./Player");

class Mouse extends Player {
  constructor(...args) {
    super(...args);
    this.color = "#6D8595";
    this.radius = 15;
  }
}

module.exports = Mouse;
