window.random0To1 = function() {
  return Math.random();
};

window.randomMinus1To1 = function() {
  return Math.random() * 2 + -1;
};

window.getRandomArbitrary = function(min, max) {
  return Math.random() * (max - min) + min;
};

window.getRandomInt = function(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
};


