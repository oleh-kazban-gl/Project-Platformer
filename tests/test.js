require("amd-loader");

//Tests
var expect = require('expect.js'),
  sinon = require('sinon');

//Levels
var levels = require('../js/app/Levels/Levels');

//Entities
var player = require('../js/app/Entity/Player'),
  coin = require('../js/app/Entity/Coin'),
  lava = require('../js/app/Entity/Lava'),
  actorChars = require('../js/app/World/actorChars');

describe('Platformer', function () {

  describe('Levels', function () {
    it('Levels should be an Array', function () {
      expect(Object.prototype.toString.call(levels).toUpperCase()).to.equal('[OBJECT ARRAY]');
    });

    it('Should be non-zero length', function () {
      expect(levels.length).to.be.greaterThan(0);
    });

    it('Should consists of Arrays of \"Levels\"', function () {
      expect(Object.prototype.toString.call(levels[0]).toUpperCase()).to.equal('[OBJECT ARRAY]');
    });

    it('Level should be an Array of Strings', function () {
      expect(levels[0][0]).to.be.a('string');
    });

    it('Each level should contain corresponding symbols for Player', function () {
      var playerChar = '@';
      var correct = [];

      for (var count = 0; count < levels.length; count++) {
        var level = levels[count];
        var currentLevel = [];

        for (var i = 0; i < level.length; i++) {
          if (level[i].indexOf(playerChar) >= 0) {
            currentLevel.push(true);
          } else {
            currentLevel.push(false);
          }
        }

        if (currentLevel.indexOf(true) >= 0 ){
          correct.push(true);
        } else {
          correct.push(false);
        }
      }

      expect(correct.indexOf(false)).to.equal(-1);
    });
    
    it('Each level should contain corresponding symbols for Coins', function () {
      var coinChar = 'o';
      var correct = [];

      for (var count = 0; count < levels.length; count++) {
        var level = levels[count];
        var currentLevel = [];

        for (var i = 0; i < level.length; i++) {
          if (level[i].indexOf(coinChar) >= 0) {
            currentLevel.push(true);
          } else {
            currentLevel.push(false);
          }
        }

        if (currentLevel.indexOf(true) >= 0 ){
          correct.push(true);
        } else {
          correct.push(false);
        }
      }

      expect(correct.indexOf(false)).to.equal(-1);
    });

    it('Each level should contain corresponding symbols for Lava', function () {
      var lavaChar = ['=','|','v'];
      var correct = [];

      for (var count = 0; count < levels.length; count++) {
        var level = levels[count];
        var currentLevel = [];

        for (var i = 0; i < level.length; i++) {
          if (level[i].indexOf(lavaChar[0]) >= 0 || level[i].indexOf(lavaChar[1]) >= 0 || level[i].indexOf(lavaChar[2]) >= 0) {
            currentLevel.push(true);
          } else {
            currentLevel.push(false);
          }
        }

        if (currentLevel.indexOf(true) >= 0 ){
          correct.push(true);
        } else {
          correct.push(false);
        }
      }

      expect(correct.indexOf(false)).to.equal(-1);
    });

  });

});
