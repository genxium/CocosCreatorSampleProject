cc.Class({
  extends: cc.Component,

  properties: {
  },

  // LIFE-CYCLE CALLBACKS:
  onLoad () {
    const maxVxMagnitude = +40.0;
    const minVxMagnitude = maxVxMagnitude/2;

    const maxVyMagnitude = +200;
    const minVyMagnitude = 0.667*maxVyMagnitude;
    const initialVy = getRandomArbitrary(minVyMagnitude, maxVyMagnitude);
    const toggle = getRandomInt(0, 2);
     
    const initialVx = (toggle % 2 > 0 ? this.getRandomArbitrary(minVxMagnitude, maxVxMagnitude) : this.getRandomArbitrary(-maxVxMagnitude, -minVxMagnitude));   
    this.v = cc.v2(initialVx, initialVy); 
    this.g = cc.v2(0, -1.2*initialVy);
    this.startedAt = null;
    this.durationMillis = 5000;
  },

  start () {
    this.startedAtMillis = Date.now();
  },

  update: function (dt) {
    const elapsedMillis = Date.now() - this.startedAtMillis; 
    if (elapsedMillis > this.durationMillis) {
      this.node.destroy();
      return;
    }
    let posDiff = this.v.mul(dt);
    this.node.setPosition(this.node.position.add(posDiff));

    this.v = this.v.add(this.g.mul(dt));
  },
});
