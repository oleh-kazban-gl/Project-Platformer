/**
 * @license Project Platformer 1.0 Copyright (c) 2015, Oleh Kazban All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: https://github.com/olehkazban/Project-Platformer for details
 */

define(function(){
  'use strict';

  function trackKeys(codes) {
    var pressed = Object.create(null);

    function handler(event) {
      if (codes.hasOwnProperty(event.keyCode)) {
        var state = event.type == 'keydown';
        pressed[codes[event.keyCode]] = state;
        event.preventDefault();
      }
    }

    addEventListener('keydown', handler);
    addEventListener('keyup', handler);

    pressed.unregister = function() {
      removeEventListener('keydown', handler);
      removeEventListener('keyup', handler);
    };

    return pressed;
  }

  return trackKeys;
});

