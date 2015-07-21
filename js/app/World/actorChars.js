/**
 * @license Project Platformer 1.0 Copyright (c) 2015, Oleh Kazban All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: https://github.com/olehkazban/Project-Platformer for details
 */

define(function (require) {
  'use strict';

  var Player = require('../Entity/Player');
  var Coin = require('../Entity/Coin');
  var Lava = require('../Entity/Lava');

  var actorChars = {
    '@': Player,
    'o': Coin,
    '=': Lava,
    '|': Lava,
    'v': Lava
  };

  return actorChars;
});

