cc.Class({
  extends: cc.Component,

  properties: {
    pickRadius: 0,
    game: {
      default: null,
      serializable: false
    }
  },

  getPlayerDistance: function () {
    // judge the distance according to the position of the player node
    const playerPos = this.game.player.getPosition();
    // calculate the distance between two nodes according to their positions
    const dist = this.node.position.sub(playerPos).mag();
    return dist;
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad () {},

  start () {

  },

  update: function (dt) {
    // judge if the distance between the star and main character is shorter than the collecting distance for each frame
    if (this.getPlayerDistance() < this.pickRadius) {
      // invoke collecting behavior
      const boundCb = this.game.onStarPicked.bind(this.game);
      boundCb(this.node);
      return;
    }

    // update the transparency of the star according to the timer in the Game script
    var opacityRatio = 1 - this.game.timer/this.game.starDuration;
    var minOpacity = 50;
    this.node.opacity = minOpacity + Math.floor(opacityRatio * (255 - minOpacity));
  },
});
