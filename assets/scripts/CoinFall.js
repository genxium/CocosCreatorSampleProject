cc.Class({
    extends: cc.Component,

    properties: {
     coinPrefab: {
        type: cc.Prefab,
        default: null,
      },
      batchCoinCount: {
        default: 0,
      }, 
      sprintDurationMillis: {
        default: 1000,
      }, 
      sprintIntervalMinMillis: {
        default: 100,
      }, 
      sprintIntervalMaxMillis: {
        default: 200,
      }, 
    },

    // LIFE-CYCLE CALLBACKS:
    start () {
      const self = this;
      const sprintStartedAt = Date.now();
      const theCb = () => {
        const elapsedMillis = Date.now() - sprintStartedAt;
        if (elapsedMillis > self.sprintDurationMillis) return;
        self.spawnNewCoin();
        const randomMillis = self.getRandomInt(100, 300);  
        setTimeout(theCb, randomMillis); 
      };
      setTimeout(theCb, 0);
    },

    spawnNewCoin: function() {
      const newCoin = cc.instantiate(this.coinPrefab);
      newCoin.setPosition(cc.v2());
      this.node.addChild(newCoin);
    },

    onLoad () {
    },

    update: function (dt) {
    },
});
