// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

cc.Class({
    extends: cc.Component,

    properties: {
        // When the distance between the star and main character is less than this value, collection of the point will be completed
        pickRadius: 0,
        // The game object
        game: {
          default: null,
          serializable: false
        }
    },

    getPlayerDistance: function () {
        // judge the distance according to the position of the player node
        var playerPos = this.game.player.getPosition();
        // calculate the distance between two nodes according to their positions
        var dist = this.node.position.sub(playerPos).mag();
        return dist;
    },

    getRandomInt: function(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    },

    onPicked: function() {
        // when the stars are being collected, invoke the interface in the Game script to generate a new star
        this.game.spawnNewStar();
        // invoke the scoring method of the Game script
        this.game.gainScore();
        // then destroy the current star's node
        this.node.destroy();
    },

    // LIFE-CYCLE CALLBACKS:

    getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    },

    onLoad () {
      const maxVxMagnitude = +40.0;
      const minVxMagnitude = maxVxMagnitude/2;

      const maxVyMagnitude = +200;
      const minVyMagnitude = 0.667*maxVyMagnitude;
      const initialVy = this.getRandomArbitrary(minVyMagnitude, maxVyMagnitude);
      const toggle = this.getRandomInt(0, 2);
       
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
      if (Date.now() - this.startedAtMillis > this.durationMillis) {
        cc.log(`Animation finished for star!`);
        this.node.destroy();
        return;
      }
      let posDiff = this.v.mul(dt);
      this.node.setPosition(this.node.position.add(posDiff));

      this.v = this.v.add(this.g.mul(dt));

      /*
      // judge if the distance between the star and main character is shorter than the collecting distance for each frame
      if (this.getPlayerDistance() < this.pickRadius) {
        // invoke collecting behavior
        this.onPicked();
        return;
      }
      */

      // update the transparency of the star according to the timer in the Game script
      var opacityRatio = 1 - this.game.timer/this.game.starDuration;
      var minOpacity = 50;
      this.node.opacity = minOpacity + Math.floor(opacityRatio * (255 - minOpacity));
    },
});
