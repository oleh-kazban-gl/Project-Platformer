require("amd-loader");

var expect = require('expect.js'),
  sinon = require('sinon'),
  levels = require('./../js/app/Levels/Levels')
  ;

describe('Platformer', function () {

  describe('Levels', function () {
    it('Levels should be an Array', function () {
      expect(Object.prototype.toString.call(levels).toUpperCase()).to.equal('[OBJECT ARRAY]');
    });

    it('Should be non-zero length', function() {
      expect(levels.length).to.be.greaterThan(0);
    });

    it('Should consists of Arrays of \"Levels\"', function() {
      expect(Object.prototype.toString.call(levels[0]).toUpperCase()).to.equal('[OBJECT ARRAY]');
    });

    it('Level should be an Array of Strings', function() {
      expect(levels[0][0]).to.be.a('string');
    });
  });

});
