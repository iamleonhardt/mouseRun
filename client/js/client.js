let socket = io();

// Canvas setup
const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

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
    c.fillStyle = playerObj.color;
    c.beginPath();
    c.arc(playerObj.x, playerObj.y, playerObj.radius, 0, 2 * Math.PI);
    c.fill();
  });
});

let grassFields = new Image();
grassFields.src = "/client/images/grassField.png";

let drawMap = () => {
  c.drawImage(grassFields, 0, 0, window.innerWidth, window.innerHeight);
};
