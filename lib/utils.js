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

//Get distances
// let getDistance = (entity1, entity2) => {
//   let distance =
//     Math.floor(
//       Math.sqrt(
//         Math.pow(entity1.x - entity2.x, 2) + Math.pow(entity1.y - entity2.y, 2)
//       )
//     ) -
//     (entity1.radius + entity2.radius);
//   return distance;
// };

exports.getDistance = (obj1, obj2) => {
  let a = obj1.x - obj2.x;
  let b = obj1.y - obj2.y;
  return Math.sqrt(a * a + b * b) - (obj1.radius + obj2.radius);
};

//Check collision
// let checkCollision = (entity1, entity2) => {
//   //if the distance between the two entities minus their radius <= 0 then return colliding
//   if (getDistance(entity1, entity2) < 0) {
//     return true;
//   } else {
//     return false;
//   }
// };
