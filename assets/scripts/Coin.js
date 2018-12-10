cc.Class({
  extends: cc.Component,

  properties: {
    minInitialVxMagnitude: {
      default: 5.0,
    },
    maxInitialVxMagnitude: {
      default: 50.0, 
    },
    minInitialVyMagnitude: {
      default: 100.0,
    },
    maxInitialVyMagnitude: {
      default: 150.0, 
    },
    gY: {
      default: -400.0, 
    },
    durationMillis: {
      default: 2000, 
    },
  },

  // LIFE-CYCLE CALLBACKS:
  onLoad () {
    const self = this;
    const initialVy = getRandomArbitrary(self.minInitialVyMagnitude, self.maxInitialVyMagnitude);
    const toggle = getRandomInt(0, 2);
     
    const initialVx = (toggle % 2 > 0 ? getRandomArbitrary(self.minInitialVxMagnitude, self.maxInitialVxMagnitude) : getRandomArbitrary(-self.maxInitialVxMagnitude, -self.minInitialVxMagnitude));   

    const anotherToggle = getRandomInt(0, 2);
    if (0 == anotherToggle % 2) {
      cc.loader.loadRes("textures/Gold", cc.SpriteFrame, (err, obj) => {
      
        self.node.getComponent(cc.Sprite).spriteFrame = obj;  
       });
    } else {
      cc.loader.loadRes("textures/Energy", cc.SpriteFrame, (err, obj) => {
      
        self.node.getComponent(cc.Sprite).spriteFrame = obj;  
       });
    }
    this.v = cc.v2(initialVx, initialVy); 
    this.g = cc.v2(0, self.gY);
    this.startedAt = null;
    this.halfDurationMillis = (0.5*this.durationMillis);
    this.opacityDegradeSpeed = (255*1000/this.halfDurationMillis);
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
    if (elapsedMillis <= this.halfDurationMillis) return;
    this.node.opacity -= (this.opacityDegradeSpeed*dt); 
  },
});
