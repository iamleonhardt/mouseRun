const utils = require("../lib/utils");

exports.getRanColor = () => {
  let letters = "0123456789ABCDEF";
  let color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

exports.getRanNum = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// Get distance
exports.getDistance = (obj1, obj2) => {
  let a = obj1.x - obj2.x;
  let b = obj1.y - obj2.y;
  return Math.floor(Math.sqrt(a * a + b * b) - (obj1.radius + obj2.radius));
};

//Check collision
exports.checkCollision = (obj1id, obj1, obj2id, obj2) => {
  //if the distance between the two entities <= 0 then return colliding
  let d = utils.getDistance(obj1, obj2);
  if (d < 0) {
    console.log("--COLLISION: " + obj1id + " and " + obj2id);
  } else {
    // console.log("good: " + d);
  }
};
