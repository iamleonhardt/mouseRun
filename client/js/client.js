let socket = io();

const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Resize Canvas when browser resizes
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

socket.on("message", (message) => {
  console.log(message);
});

socket.on("update", (players) => {
  c.fillStyle = "linen";
  c.fillRect(0, 0, window.innerWidth, window.innerHeight);

  Object.keys(players).forEach((playerId) => {
    let playerObj = players[playerId];
    c.fillStyle = playerObj.color;
    c.beginPath();
    c.arc(playerObj.x, playerObj.y, playerObj.radius, 0, 2 * Math.PI);
    // c.stroke();
    c.fill();
  });
});
