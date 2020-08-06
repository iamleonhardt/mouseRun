const utils = require("../lib/utils");
const Player = require("./Player");
const Cat = require("./Cat");
const Mouse = require("./Mouse");

class Game {
  constructor() {
    console.log("--GAME INITIATED");
    this.sockets = {};
    this.players = {};
    this.currentCats = 0;
    this.maxCats = 1;
  }

  addSocket = (uid, socket) => {
    console.log("--SOCKET CONNECTED: ", uid);
    this.sockets[uid] = socket;
    this.logSockets();
    this.logPlayers();
  };

  addPlayer = (uid, name) => {
    console.log("--PLAYER JOINED: ", uid);
    // Create cats before creating mice
    if (this.currentCats < this.maxCats) {
      this.players[uid] = new Cat(
        utils.getRanNum(0, 400),
        utils.getRanNum(0, 400),
        "cat",
        name
      );
      this.currentCats++;
    }
    // Create mice
    else {
      this.players[uid] = new Mouse(
        utils.getRanNum(0, 400),
        utils.getRanNum(0, 400),
        "mouse",
        name
      );
    }
    this.logPlayers();
  };

  disconnect = (uid) => {
    console.log("--SOCKET DISCONNECTED: ", uid);
    if (this.players[uid]) {
      // When disconnecting check if its a cat
      if (this.players[uid].type == "cat") {
        this.currentCats--;
      }
      delete this.players[uid];
    }
    delete this.sockets[uid];
    this.logSockets();
    this.logPlayers();
  };

  keyDown = (uid, keyCode) => {
    if (this.players[uid]) {
      // a || left arrow
      if (keyCode == 65 || keyCode == 37) {
        this.players[uid].movingRight = false;
        this.players[uid].movingLeft = true;
      }
      // d || right arrow
      if (keyCode == 68 || keyCode == 39) {
        this.players[uid].movingLeft = false;
        this.players[uid].movingRight = true;
      }
      // w || up arrow
      if (keyCode == 87 || keyCode == 38) {
        this.players[uid].movingDown = false;
        this.players[uid].movingUp = true;
      }
      // s || down arrow
      if (keyCode == 83 || keyCode == 40) {
        this.players[uid].movingUp = false;
        this.players[uid].movingDown = true;
      }
    }
  };

  keyUp = (uid, keyCode) => {
    if (this.players[uid]) {
      // a || left arrow
      if (keyCode == 65 || keyCode == 37) {
        this.players[uid].movingLeft = false;
      }
      // d || right arrow
      if (keyCode == 68 || keyCode == 39) {
        this.players[uid].movingRight = false;
      }
      // w || up arrow
      if (keyCode == 87 || keyCode == 38) {
        this.players[uid].movingUp = false;
      }
      // s || down arrow
      if (keyCode == 83 || keyCode == 40) {
        this.players[uid].movingDown = false;
      }
    }
  };

  checkAllcollisions = () => {
    let playerArr = Object.keys(this.players);
    playerArr.forEach((self, i) => {
      playerArr.forEach((obj2, j) => {
        j > i
          ? utils.checkCollision(
              self,
              this.players[self],
              obj2,
              this.players[obj2]
            )
          : null;
      });
    });
  };

  logPlayers = () => {
    // console.log("Players: ", this.players);
    console.log("Players keys: ", Object.keys(this.players));
    console.log("Players.length: " + Object.keys(this.players).length);
  };
  logSockets = () => {
    console.log("Socket keys: ", Object.keys(this.sockets));
    console.log("Socket length: " + Object.keys(this.sockets).length);
  };
}

module.exports = Game;
