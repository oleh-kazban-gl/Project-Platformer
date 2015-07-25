/**
 * @license Project Platformer 1.0 Copyright (c) 2015, Oleh Kazban All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: https://github.com/olehkazban/Project-Platformer for details
 */

define(function(require){
  'use strict';

  var actorChars = require('./actorChars');
  var Vector = require('./Vector');

  var maxStep = 0.05;

  var soundEngine = require('../Engine/Audio/EngineAudio');

  function Level(plan) {
    this.width = plan[0].length;
    this.height = plan.length;
    this.grid = [];
    this.actors = [];

    for (var y = 0; y < this.height; y++) {
      var line = plan[y], gridLine = [];

      for (var x = 0; x < this.width; x++) {
        var ch = line[x], fieldType = null;
        var Actor = actorChars[ch];

        if (Actor) {
          this.actors.push(new Actor(new Vector(x, y), ch));
        } else if (ch == 'x') {
          fieldType = 'wall';
        } else if (ch == '!') {
          fieldType = 'lava';
        }
        gridLine.push(fieldType);
      }

      this.grid.push(gridLine);
    }

    this.player = this.actors.filter(function (actor) {
      return actor.type == 'player';
    })[0];
    this.status = this.finishDelay = null;
  }

  Level.prototype.isFinished = function () {
    return this.status != null && this.finishDelay < 0;
  };

  Level.prototype.obstacleAt = function (pos, size) {
    var xStart = Math.floor(pos.x);
    var xEnd = Math.ceil(pos.x + size.x);
    var yStart = Math.floor(pos.y);
    var yEnd = Math.ceil(pos.y + size.y);

    if (xStart < 0 || xEnd > this.width || yStart < 0) {
      return 'wall';
    }

    if (yEnd > this.height) {
      return 'lava';
    }

    for (var y = yStart; y < yEnd; y++) {
      for (var x = xStart; x < xEnd; x++) {
        var fieldType = this.grid[y][x];

        if (fieldType) {
          return fieldType;
        }
      }
    }
  };

  Level.prototype.actorAt = function (actor) {
    for (var i = 0; i < this.actors.length; i++) {
      var other = this.actors[i];

      if (other != actor &&
        actor.pos.x + actor.size.x > other.pos.x &&
        actor.pos.x < other.pos.x + other.size.x &&
        actor.pos.y + actor.size.y > other.pos.y &&
        actor.pos.y < other.pos.y + other.size.y) {
        return other;
      }
    }
  };

  Level.prototype.animate = function (step, keys) {
    if (this.status != null) {
      this.finishDelay -= step;
    }

    while (step > 0) {
      var thisStep = Math.min(step, maxStep);
      this.actors.forEach(function (actor) {
        actor.act(thisStep, this, keys);
      }, this);
      step -= thisStep;
    }
  };

  Level.prototype.playerTouched = function (type, actor) {
    if (type == 'lava' && this.status == null) {
      soundEngine.soundPlay('death');

      this.status = 'lost';
      this.finishDelay = 1;
    } else if (type == 'coin') {
      soundEngine.soundPlay('coin');

      this.actors = this.actors.filter(function (other) {
        return other != actor;
      });

      if (!this.actors.some(function (actor) {
          return actor.type == 'coin';
        })) {
        this.status = 'won';
        this.finishDelay = 1;
      }
    }
  };

  return Level;
});

