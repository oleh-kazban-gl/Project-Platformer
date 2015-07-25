/**
 * @license Project Platformer 1.0 Copyright (c) 2015, Oleh Kazban All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: https://github.com/olehkazban/Project-Platformer for details
 */

define(function (require) {
  'use strict';

  var runAnimation = require('./runAnimation');
  var trackKeys = require('./trackKeys');
  var arrowCodes = require('../World/keys');
  var soundEngine = require('../Engine/Audio/EngineAudio');

  function runLevel(level, Display, andThen) {
    var display = new Display(document.body, level);
    var running = 'yes';

    function handleKey(event) {
      if (event.keyCode == 27) {
        if (running == 'no') {
          running = 'yes';
          runAnimation(animation);
        } else if (running == 'pausing') {
          running = 'yes';
        } else if (running == 'yes') {
          running = 'pausing';
        }

        soundEngine.soundPlay('pauseSound');
      }
    }

    addEventListener('keydown', handleKey);
    var arrows = trackKeys(arrowCodes);

    function animation(step) {
      if (running == 'pausing') {
        running = 'no';
        return false;
      }

      level.animate(step, arrows);
      display.drawFrame(step);

      if (level.isFinished()) {
        display.clear();
        removeEventListener('keydown', handleKey);
        arrows.unregister();

        if (andThen) {
          andThen(level.status);
        }

        return false;
      }
    }

    runAnimation(animation);
  }

  return runLevel;
});