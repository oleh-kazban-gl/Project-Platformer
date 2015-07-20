/**
 * @license Project Platformer 1.0 Copyright (c) 2015, Oleh Kazban All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: https://github.com/olehkazban/Project-Platformer for details
 */

define(function(){
  'use strict';

  function Vector(x, y) {
    this.x = x;
    this.y = y;
  }

  Vector.prototype.plus = function (other) {
    return new Vector(this.x + other.x, this.y + other.y);
  };

  Vector.prototype.times = function (factor) {
    return new Vector(this.x * factor, this.y * factor);
  };

  return Vector;
});

