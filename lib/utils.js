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
