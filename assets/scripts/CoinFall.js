cc.Class({
    extends: cc.Component,

    properties: {
     coinPrefab: {
        type: cc.Prefab,
        default: null,
      },
      batchCoinCount: {
        default: 10,
      }, 
      sprintDurationMillis: {
        // Should be larger than `Coin.durationMillis` of a single coin.
        default: 3000,
      }, 
      sprintIntervalMinMillis: {
        default: 100,
      }, 
      sprintIntervalMaxMillis: {
        default: 200,
      }, 
      minSpawnXMagnitude: {
        default: 0,
      },
      maxSpawnXMagnitude: {
        default: 10,
      },
      minSpawnYMagnitude: {
        default: 0,
      },
      maxSpawnYMagnitude: {
        default: 10,
      },
    },

    // LIFE-CYCLE CALLBACKS:
    start () {
      const self = this;
      const marginMillis = 10;
      const lifetimeMillis = marginMillis + self.sprintDurationMillis; 
      const sprintStartedAt = Date.now();
      let spawnedCount = 0;
      const theCb = () => {
        if (spawnedCount >= self.batchCoinCount) return;
        const elapsedMillis = Date.now() - sprintStartedAt;
        if (elapsedMillis > self.sprintDurationMillis) return;
        ++spawnedCount;
        self.spawnNewCoin();
        const randomMillis = getRandomInt(self.sprintIntervalMinMillis, self.sprintIntervalMaxMillis);  
        setTimeout(theCb, randomMillis); 
      };
      setTimeout(theCb, 0);

      setTimeout(() => {
        self.node.destroy(); 
      }, lifetimeMillis)
    },

    spawnNewCoin: function() {
      const newCoin = cc.instantiate(this.coinPrefab);
      const toggle = getRandomInt(0, 2);
      const x = (toggle % 2 > 0 ? getRandomArbitrary(self.minSpawnXMagnitude, self.maxSpawnXMagnitude) : getRandomArbitrary(-self.maxSpawnXMagnitude, -self.minSpawnXMagnitude)); 
      const anotherToggle = getRandomInt(0, 2);
      const y = (anotherToggle % 2 > 0 ? getRandomArbitrary(self.minSpawnYMagnitude, self.maxSpawnYMagnitude) : getRandomArbitrary(-self.maxSpawnYMagnitude, -self.minSpawnYMagnitude))
      newCoin.setPosition(cc.v2(x, y));
      this.node.addChild(newCoin);
    },

    onLoad () {
    },

    update: function (dt) {
    },
});
