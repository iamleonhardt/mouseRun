let socket = io();
let grassFields = new Image();
grassFields.src = "/client/images/grassField.png";

// Canvas setup
const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
c.font = "15px sans-serif";

// Join Game

let joinGame = () => {
  socket.emit("playerJoined", "Joe");
  signInDiv.style.display = "none";
};
let signInDiv = document.getElementById("signIn");
let joinBtn = document.getElementById("joinBtn");
joinBtn.addEventListener("click", joinGame);

// Mouse events
let mousePosition = {
  x: 0,
  y: 0,
};

let mousePressed = false;

canvas.addEventListener("mousedown", () => {
  mousePressed = true;
  console.log("mousePressed: ", mousePressed);
});

canvas.addEventListener("mouseup", () => {
  mousePressed = false;
  console.log("mousePressed: ", mousePressed);
});

// Track mouse position on move
canvas.addEventListener("mousemove", (event) => {
  mousePosition.x = event.offsetX || event.layerX;
  mousePosition.y = event.offsetY || event.layerY;
  console.log("x: ", mousePosition.x + ", y: ", mousePosition.y);
});

// Resize Canvas when browser resizes
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Listen for player input
window.addEventListener("keydown", (e) => {
  socket.emit("keydown", e.keyCode);
});

window.addEventListener("keyup", (e) => {
  socket.emit("keyup", e.keyCode);
});

// Messaging
socket.on("message", (message) => {
  console.log(message);
});

// Update
socket.on("update", (players) => {
  drawMap();

  Object.keys(players).forEach((playerId) => {
    let playerObj = players[playerId];
    drawPlayer(playerObj);
  });
});

// Draw Player
let drawPlayer = (playerObj) => {
  c.fillStyle = playerObj.color;
  c.beginPath();
  c.arc(playerObj.x, playerObj.y, playerObj.radius, 0, 2 * Math.PI);
  c.fill();
};

// Draw map
let drawMap = () => {
  c.drawImage(grassFields, 0, 0, 1920, 1080);
};
