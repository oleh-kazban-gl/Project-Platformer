require("amd-loader");

//Tests
var expect = require('expect.js'),
  sinon = require('sinon');

//Levels
var levels = require('../js/app/Levels/Levels');

//Entities
var player = require('../js/app/Entity/Player'),
  coin = require('../js/app/Entity/Coin'),
  lava = require('../js/app/Entity/Lava');

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
      var testVector1 = new vector(1, 2);
      var testVector2 = new vector(1, 2);

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

        var resultVector = testVector1.plus(testVector2);

        expect(resultVector instanceof vector).to.equal(true);
      });

      it('Should return an new instance of \'Vector\' with expected coordinates as result of method \'plus\'', function () {
        var resultVector = testVector1.plus(testVector2);

        expect(resultVector).to.eql({x: 2, y: 4});
      });

      it('Should return an new instance of \'Vector\' as result of method \'times\'', function () {

        var resultVector = testVector1.times(2);

        expect(resultVector instanceof vector).to.equal(true);
      });

      it('Should return an new instance of \'Vector\' with expected coordinates as result of method \'times\'', function () {
        var resultVector = testVector1.times(2);

        expect(resultVector).to.eql({x: 2, y: 4});
      });

      it('Should return a \'Vector\' Object (test using constuctor name)', function () {
        var resultVector = testVector1.times(2);

        expect(resultVector.constructor.name).to.equal('Vector');
      });

      it('Should return a \'Vector\' Object (test using assert \'a\')', function () {
        var resultVector = testVector1.times(2);

        expect(resultVector).to.be.a(vector);
      });

      it('Should return a Object (test using assert \'an\')', function () {
        var resultVector = testVector1.times(2);

        expect(resultVector).to.be.an('object');
      });
    });
  });

  describe('Entities', function () {
    describe('Coin', function () {
      var testPos = new vector(1, 1);
      var testCoin = new coin(testPos);
      var testStep = 0.2;

      it('Should return Object', function () {
        expect(testCoin).to.be.a('object');
      });

      it('Should have \'type\' = coin', function () {
        expect(testCoin.type).to.equal('coin');
      });

      it('Should have method \'act\'', function () {
        expect(testCoin.act).to.be.a('function');
      });

      it('Should modify \'position\' after using \'act\' method', function () {
        var testActCoin = new coin(testPos);
        testActCoin.act(testStep);

        expect(testCoin.pos).to.not.eql(testActCoin.pos);
      });

      it('Should modify \'wobble\' after using \'act\' method', function () {
        var testActCoin = new coin(testPos);
        testActCoin.act(testStep);

        expect(testCoin.wobble).to.not.eql(testActCoin.wobble);
      })
    });

    describe('Lava', function () {
      var lavaChar = ['=', '|', 'v'];
      var testPos = new vector(1, 1);
      var testLava = new lava(testPos, lavaChar[1]);
      var testLevelPlan = levels[0];
      var testLevel = new level(testLevelPlan);
      var testStep = 0.2;

      it('Should return Object', function () {
        expect(testLava).to.be.a('object');
      });

      it('Should have \'type\' = lava', function () {
        expect(testLava.type).to.equal('lava')
      });

      it('Should have method \'act\'', function () {
        expect(testLava.act).to.be.a('function')
      });

      it('Should change \'speed\' after using \'act\' method', function () {
        var testActedLava = new lava(testPos, lavaChar[1]);
        testActedLava.act(testStep, testLevel);

        expect(testLava.speed).to.not.eql(testActedLava.speed);
      });
    });

    describe('Player', function () {
      var testVector = new vector(1, 1);
      var testPerson = new player(testVector);
      var testLevelPlan = levels[0];
      var testLevel = new level(testLevelPlan);
      var testStep = 2;

      var unregister = function () {
        removeEventListener('keydown', handler);
        removeEventListener('keyup', handler);
      };

      var actorKeysLeft = {
        'unregister': unregister,
        'up': false,
        'right': false,
        'left': true
      };
      var actorKeysRight = {
        'unregister': unregister,
        'up': false,
        'right': true,
        'left': false
      };
      var actorKeysUp = {
        'unregister': unregister,
        'up': true,
        'right': false,
        'left': false
      };
      var actorKeysMove = {
        'unregister': unregister,
        'up': true,
        'right': true,
        'left': true
      };

      var startPos = 'position';

      it('Should return Object', function () {
        expect(testPerson).to.be.a('object')
      });

      it('Should have property \'pos\'', function () {
        expect(testPerson.pos).to.be.a('object');
      });

      it('Should have property \'size\'', function () {
        expect(testPerson.size).to.be.a('object');
      });

      it('Should have property \'speed\'', function () {
        expect(testPerson.size).to.be.a('object');
      });

      it('Should have \'type\' = player', function () {
        expect(testPerson.type).to.equal('player')
      });

      it('Should have method \'act\'', function () {
        expect(testPerson.act).to.be.a('function')
      });

      it('Should have method \'moveX\'', function () {
        expect(testPerson.moveX).to.be.a('function')
      });

      it('Should have method \'moveY\'', function () {
        expect(testPerson.moveY).to.be.a('function')
      });

      it('Should throw an Error if constructor parameter is not Vector', function () {
        expect(function () {
          var testPerson = new player(startPos);
        }).to.throwError();
      });

      //I'll enable tests after I should know how to test DOM :)
      //it('[TEST] Should change \'position\' in corresponding direction as result of \'act\' method', function () {
      //  testPerson.act(testStep, testLevel, actorKeysLeft);
      //  expect(testPerson.pos).to.eql({x: 1, y: 2.5});
      //});
      //
      //it('[TEST] Should change \'position\' in corresponding direction as result of \'act\' method', function () {
      //  testPerson.act(testStep, testLevel, actorKeysRight);
      //  expect(testPerson.pos).to.eql({x: 15, y: 4.5});
      //});
      //
      //it('[TEST] Should change \'position\' in corresponding direction as result of \'act\' method', function () {
      //  testPerson.act(testStep, testLevel, actorKeysUp);
      //  expect(testPerson.pos).to.eql({x: 15, y: 6.5});
      //});
      //
      //it('[TEST] Should change \'speed\' in corresponding direction as result of \'act\' method', function () {
      //  testPerson.act(testStep, testLevel, actorKeysLeft);
      //  expect(testPerson.speed).to.eql({x: -7, y: 0});
      //});
      //
      //it('[TEST] Should change \'speed\' in corresponding direction as result of \'act\' method', function () {
      //  testPerson.act(testStep, testLevel, actorKeysRight);
      //  expect(testPerson.speed).to.eql({x: 7, y: 0});
      //});
      //
      //it('[TEST] Should change \'speed\' in corresponding direction as result of \'act\' method', function () {
      //  testPerson.act(testStep, testLevel, actorKeysUp);
      //  expect(testPerson.speed).to.eql({x: 0, y: -17});
      //});
      //
      //it('[TEST] Should change \'size\' in corresponding direction as result of \'act\' method', function () {
      //  testPerson.act(testStep, testLevel, actorKeysUp);
      //  expect(testPerson.size).to.eql({x: 0.8, y: -12.5});
      //});
      //
      //it('[TEST] Should change \'size\' in corresponding direction as result of \'act\' method', function () {
      //  testPerson.act(testStep, testLevel, actorKeysUp);
      //  expect(testPerson.size).to.eql({x: 0.8, y: -14.5});
      //});
      //
      //it('[TEST] Should change \'size\' in corresponding direction as result of \'act\' method', function () {
      //  testPerson.act(testStep, testLevel, actorKeysUp);
      //  expect(testPerson.size).to.eql({x: 0.8, y: -16.5});
      //});
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

      // Except zero level :) - it is used only for "Game over" function, it does not need any coins for playing, so we should start from 1, not 0
      for (var count = 1; count < levels.length; count++) {
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
