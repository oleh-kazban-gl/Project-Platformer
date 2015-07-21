var utils = require('./utils'),
  expect = require('expect.js'),
  sinon = require('sinon');

describe('Utils', function () {

  describe('#sort()', function () {
    it('Should sort given array of numbers and pass in ascending ordering (with ascending comparator: a < b)', function () {
      expect(utils.deepEqual(utils.sort([2, 1, 1, 0], function (a, b) {
        return a < b;
      }), [0, 1, 1, 2])).to.equal(true);
    });
  });

});