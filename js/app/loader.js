/**
 * @license Project Platformer 1.0 Copyright (c) 2015, Oleh Kazban All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: https://github.com/olehkazban/Project-Platformer for details
 */

define(function (require) {
    'use strict';

    var runGame = require('./Helpers/runGame');
    var GAME_LEVELS = require('./Levels/Levels');
    var DOMDisplay = require('./Engine/DOMDisplay/EngineDOM');
    var CanvasDisplay = require('./Engine/CanvasDisplay/EngineCanvas');

    return runGame.run(GAME_LEVELS, CanvasDisplay);
});
