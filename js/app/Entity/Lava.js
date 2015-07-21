/**
 * @license Project Platformer 1.0 Copyright (c) 2015, Oleh Kazban All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: https://github.com/olehkazban/Project-Platformer for details
 */

define(function (require) {
  'use strict';

  var Vector = require('../World/Vector');

  function Lava(pos, ch) {
    this.pos = pos;
    this.size = new Vector(1, 1);

    if (ch == '=') {
      this.speed = new Vector(2, 0);
    } else if (ch == '|') {
      this.speed = new Vector(0, 2);
    } else if (ch == 'v') {
      this.speed = new Vector(0, 3);
      this.repeatPos = pos;
    }
  }

  Lava.prototype.type = 'lava';

  Lava.prototype.act = function (step, level) {
    var newPos = this.pos.plus(this.speed.times(step));

    if (!level.obstacleAt(newPos, this.size))
      this.pos = newPos;
    else if (this.repeatPos)
      this.pos = this.repeatPos;
    else
      this.speed = this.speed.times(-1);
  };

  return Lava;
});

