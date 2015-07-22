require("amd-loader");

//Tests
var expect = require('expect.js'),
  sinon = require('sinon');

//Levels
var levels = require('../js/app/Levels/Levels'); //tested

//Entities
var player = require('../js/app/Entity/Player'),
  coin = require('../js/app/Entity/Coin'),
  lava = require('../js/app/Entity/Lava');

//Engine
var engine = require('../js/app/Engine/DOMDisplay/EngineDOM');

//Helpers
var element = require('../js/app/Helpers/element'),
  runAnimation = require('../js/app/Helpers/runAnimation'),
  runGame = require('../js/app/Helpers/runGame'),
  runLevel = require('../js/app/Helpers/runLevel'),
  trackKeys = require('../js/app/Helpers/trackKeys');

//World
var actorChars = require('../js/app/World/actorChars'),
  keys = require('../js/app/World/keys'),
  level = require('../js/app/World/level'),
  vector = require('../js/app/World/vector');

describe('Platformer', function () {
  before(function () {
    var spy = sinon.spy();
  });

  after(function () {

  });


  describe('World', function () {
    describe('actorChars', function () {
      it('Should be an Object', function () {
        expect(actorChars).to.be.a('object');
      });

      it('Should contain symbol for Player', function () {
        var hasPlayer = false;

        for (var property in actorChars) {

          if (actorChars.hasOwnProperty(property)) {
            if (property == '@') {
              hasPlayer = true;
            }
          }
        }

        expect(hasPlayer).to.be(true);
      });

      it('Should contain symbol for Coin', function () {
        var hasCoin = false;

        for (var property in actorChars) {

          if (actorChars.hasOwnProperty(property)) {
            if (property == 'o') {
              hasCoin = true;
            }
          }
        }

        expect(hasCoin).to.be(true);
      });

      it('Should contain symbol for Lava', function () {
        var hasLava = false;

        for (var property in actorChars) {

          if (actorChars.hasOwnProperty(property)) {
            if (property == '=' || property == '|' || property == 'v') {
              hasLava = true;
            }
          }
        }

        expect(hasLava).to.be(true);
      });

      it('Should call corresponding function for Player', function () {
        var playerChar = '@';
        var playerFunction;

        for (var property in actorChars) {

          if (actorChars.hasOwnProperty(property)) {
            if (property === playerChar) {
              playerFunction = actorChars[property];
            }
          }
        }

        expect(playerFunction.name).to.equal('Player');
      });
    });

    describe('keys', function () {
      it('Should be an Object', function () {
        expect(keys).to.be.a('object')
      });

      it('Should contains left key code', function () {
        expect(keys[37]).to.equal('left')
      });

      it('Should contains up key code', function () {
        expect(keys[38]).to.equal('up')
      });

      it('Should contains right key code', function () {
        expect(keys[39]).to.equal('right')
      });
    });

    describe('level', function () {
    });

    describe('vector', function () {
      it('Should contain method \'plus\'', function () {
        expect(vector.prototype.plus).to.be.a('function');
      });

      it('Should contain method \'times\'', function () {
        expect(vector.prototype.times).to.be.a('function');
      });

      it('Should return a function \'Vector\'', function () {
        expect(vector).to.be.a('function');
      });

      it('Should return new Object', function () {
        var testVector = new vector(1, 2);

        expect(testVector).to.be.a('object');
      });

      it('Should return new Object \'Vector\'', function () {
        var testVector = new vector(1, 2);

        expect(testVector instanceof vector).to.equal(true);
      });

      it('Should throw an Error if constructor parameters is null', function () {
        expect(function () {
          var testVector = new vector(null);
        }).to.throwError();
      });

      it('Should throw an Error if constructor parameters is undefined', function () {
        expect(function () {
          var testVector = new vector(undefined);
        }).to.throwError();
      });

      it('Should return an new instance of \'Vector\' as result of method \'plus\'', function () {
        var testVector1 = new vector(1, 1);
        var testVector2 = new vector(1, 1);

        var resultVector = testVector1.plus(testVector2);

        expect(resultVector instanceof vector).to.equal(true);
      });

      it('Should return an new instance of \'Vector\' with expected coordinates as result of method \'plus\'', function () {
        var testVector1 = new vector(1, 1);
        var testVector2 = new vector(1, 1);

        var resultVector = testVector1.plus(testVector2);

        expect(resultVector).to.eql({x: 2, y: 2});
      });


    });
  });

  describe('Helpers', function () {
    describe('element', function () {

    });

    describe('runAnimation', function () {

    });

    describe('runGame', function () {

    });

    describe('runLevel', function () {

    });

    describe('trackKeys', function () {

    });
  });

  describe('Engine', function () {

  });

  describe('Entities', function () {
    describe('Coin', function () {

    });

    describe('Lava', function () {

    });

    describe('Player', function () {

    });
  });

  describe('Levels', function () {
    it('Levels should be an Array', function () {
      expect(levels).to.be.a('array');
    });

    it('Should be non-zero length', function () {
      expect(levels.length).to.be.greaterThan(0);
    });

    it('Should consists of Arrays of \"Levels\"', function () {
      expect(levels[0]).to.be.a('array');
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

        if (currentLevel.indexOf(true) >= 0) {
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

        if (currentLevel.indexOf(true) >= 0) {
          correct.push(true);
        } else {
          correct.push(false);
        }
      }

      expect(correct.indexOf(false)).to.equal(-1);
    });

    it('Each level should contain corresponding symbols for Lava', function () {
      var lavaChar = ['=', '|', 'v'];
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

        if (currentLevel.indexOf(true) >= 0) {
          correct.push(true);
        } else {
          correct.push(false);
        }
      }

      expect(correct.indexOf(false)).to.equal(-1);
    });

    it('Each level should contain corresponding symbols for Walls', function () {
      var wallChar = 'x';
      var correct = [];

      for (var count = 0; count < levels.length; count++) {
        var level = levels[count];
        var currentLevel = [];

        for (var i = 0; i < level.length; i++) {
          if (level[i].indexOf(wallChar) >= 0) {
            currentLevel.push(true);
          } else {
            currentLevel.push(false);
          }
        }

        if (currentLevel.indexOf(true) >= 0) {
          correct.push(true);
        } else {
          correct.push(false);
        }
      }

      expect(correct.indexOf(false)).to.equal(-1);
    });
  });

});
