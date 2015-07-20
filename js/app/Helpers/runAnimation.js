/**
 * @license Project Platformer 1.0 Copyright (c) 2015, Oleh Kazban All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: https://github.com/olehkazban/Project-Platformer for details
 */

define(function () {
  'use strict';

  function runAnimation(frameFunc) {
    var lastTime = null;

    function frame(time) {
      var stop = false;

      if (lastTime != null) {
        var timeStep = Math.min(time - lastTime, 100) / 1000;
        stop = frameFunc(timeStep) === false;
      }

      lastTime = time;

      if (!stop) {
        requestAnimationFrame(frame);
      }
    }

    requestAnimationFrame(frame);
  }

  return runAnimation;
});

