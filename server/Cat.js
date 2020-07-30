const Player = require("./Player");

class Cat extends Player {
  constructor(...args) {
    super(...args);
    this.color = "#C5851C";
    this.radius = 30;
  }
}

module.exports = Cat;
