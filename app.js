const favicon = require("serve-favicon");
const utils = require("./lib/utils");
const Player = require("./server/Player");
const Cat = require("./server/Cat");
const Mouse = require("./server/Mouse");

// Setup Express
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/client/views/index.html");
});
app.use("/client", express.static(__dirname + "/client"));
app.use(favicon(__dirname + "/client/views/favicon.png"));

// Listen on port
const http = require("http").Server(app);
http.listen(3000, () => {
  console.log("New Server on Port 3000");
});

// Setup Socket.io
const io = require("socket.io")(http);

// Track sockets and players
let currentSockets = {};
let currentPlayers = {};

let currentCats = 0;
let maxCats = 1;

// Socket Connection
io.sockets.on("connection", (socket) => {
  // Log connection
  console.log("New socket connection detected");
  socket.emit("message", "You are connected! 🕹️");
  // Create ID and push to currentSocket and currentPlayer
  socket.socketID = Math.random();
  currentSockets[socket.socketID] = socket;

  socket.on("playerJoined", (name) => {
    // Create cats before creating mice
    if (currentCats < maxCats) {
      currentPlayers[socket.socketID] = new Cat(
        utils.getRanNum(0, 400),
        utils.getRanNum(0, 400),
        "cat",
        name
      );
      currentCats++;
    } else {
      currentPlayers[socket.socketID] = new Mouse(
        utils.getRanNum(0, 400),
        utils.getRanNum(0, 400),
        "mouse",
        name
      );
    }
  });

  // Socket Disconnect
  socket.on("disconnect", () => {
    console.log("Socket disconnected: ", socket.socketID);
    if (currentPlayers[socket.socketID]) {
      // When disconnecting check if its a cat
      if (currentPlayers[socket.socketID].type == "cat") {
        currentCats--;
      }
      delete currentPlayers[socket.socketID];
      delete currentSockets[socket.socketID];
    }
  });

  // Player key inputs
  socket.on("keydown", (keyCode) => {
    if (currentPlayers[socket.socketID]) {
      if (keyCode == 65 || keyCode == 37) {
        currentPlayers[socket.socketID].movingLeft = true;
      }
      if (keyCode == 68 || keyCode == 39) {
        currentPlayers[socket.socketID].movingRight = true;
      }
      if (keyCode == 87 || keyCode == 38) {
        currentPlayers[socket.socketID].movingUp = true;
      }
      if (keyCode == 83 || keyCode == 40) {
        currentPlayers[socket.socketID].movingDown = true;
      }
    }
  });

  socket.on("keyup", (keyCode) => {
    if (currentPlayers[socket.socketID]) {
      if (keyCode == 65 || keyCode == 37) {
        currentPlayers[socket.socketID].movingLeft = false;
      }
      if (keyCode == 68 || keyCode == 39) {
        currentPlayers[socket.socketID].movingRight = false;
      }
      if (keyCode == 87 || keyCode == 38) {
        currentPlayers[socket.socketID].movingUp = false;
      }
      if (keyCode == 83 || keyCode == 40) {
        currentPlayers[socket.socketID].movingDown = false;
      }
    }
  });
});

//Get distances
let getDistance = (entity1, entity2) => {
  let distance =
    Math.floor(
      Math.sqrt(
        Math.pow(entity1.x - entity2.x, 2) + Math.pow(entity1.y - entity2.y, 2)
      )
    ) -
    (entity1.radius + entity2.radius);
  return distance;
};

// //Check collision
// let checkCollision = (entity1, entity2) => {
//   //if the distance between the two entities minus their radius <= 0 then return colliding
//   if (getDistance(entity1, entity2) < 0) {
//     return true;
//   } else {
//     return false;
//   }
// };

// Heartbeat to send updates to clients
setInterval(() => {
  Object.keys(currentSockets).forEach((playerId) => {
    let player = currentPlayers[playerId];
    player ? player.update() : null;
    currentSockets[playerId].emit("update", currentPlayers);
  });
}, 1000 / 60);
