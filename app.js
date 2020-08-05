const favicon = require("serve-favicon");
const Game = require("./server/Game");

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

// Create new game
const game = new Game();

// Socket connection
io.sockets.on("connection", (socket) => {
  // Log connection
  socket.emit("message", "You are connected! 🕹️");

  // Add to sockets with id as key
  let uid = socket.id;
  game.addSocket(uid, socket);

  // Define socket calls
  socket.on("addPlayer", (name) => {
    game.addPlayer(uid, name);
  });
  socket.on("disconnect", () => {
    game.disconnect(uid);
  });
  socket.on("keydown", (keyCode) => {
    game.keyDown(uid, keyCode);
  });
  socket.on("keyup", (keyCode) => {
    game.keyUp(uid, keyCode);
  });
});

// Heartbeat to send updates to clients
setInterval(() => {
  Object.keys(game.sockets).forEach((uid) => {
    let player = game.players[uid];
    player ? player.update() : null;
    game.sockets[uid].emit("update", game.players);
  });
}, 1000 / 60);
