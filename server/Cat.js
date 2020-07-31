const Player = require("./Player");

class Cat extends Player {
  constructor(...args) {
    super(...args);
    this.color = "#eec39a";
    this.radius = 30;
  }
}

module.exports = Cat;
