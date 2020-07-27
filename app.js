const favicon = require("serve-favicon");
const utils = require("./lib/utils");
const Player = require("./server/Player");

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

// Socket Connection
io.sockets.on("connection", (socket) => {
  // Log connection
  console.log("New socket connection detected");
  socket.emit("message", "You are connected! 🕹️");
  // Create ID and push to currentSocket and currentPlayer
  socket.socketID = Math.random();
  currentSockets[socket.socketID] = socket;
  currentPlayers[socket.socketID] = new Player(
    utils.getRanNum(0, 400),
    utils.getRanNum(0, 400),
    utils.getRanNum(8, 24),
    utils.getRanColor()
  );

  // Socket Disconnect
  socket.on("disconnect", () => {
    console.log("Socket disconnected: ", socket.socketID);
    delete currentPlayers[socket.socketID];
    delete currentSockets[socket.socketID];
  });

  // Heartbeat to send updates to clients
  setInterval(() => {
    Object.keys(currentPlayers).forEach((playerId) => {
      let player = currentPlayers[playerId];
      player.x++;
      player.y++;
    });
    socket.emit("update", currentPlayers);
  }, 1000 / 30);
});
