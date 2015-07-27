/**
 * @license Project Platformer 1.0 Copyright (c) 2015, Oleh Kazban All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: https://github.com/olehkazban/Project-Platformer for details
 */

define(function (require) {
    'use strict';

    var runLevel = require('./runLevel');
    var Level = require('../World/Level');
    var soundEngine = require('../Engine/Audio/EngineAudio');

    var runGame = {
        run: function (plans, Display) {

            soundEngine.soundInit();

            function startLevel(n) {
                var level = new Level(plans[n]);

                runGame.coins = level.coins;
                runGame.level = level;
                level.levelId = n;

                runLevel(level, Display, function (status) {
                    if (status === 'lost' && runGame.lives > 0) {
                      console.log('Level: ' + n);

                        // If player contrives to die at zero level, restoring
                        if (n === 0) {
                          startLevel(0);
                        } else {
                          runGame.lives -= 1; // Player died, for respawn spent 1 life
                          console.log('Level: #' + n + ', lives: ' + runGame.lives);

                          startLevel(n);
                        }

                    } else if (status === 'lost' && runGame.lives <= 0) {
                        soundEngine.soundPlay('gameOver');
                        runGame.lives = 3;

                        startLevel(0);
                    } else if (n < plans.length - 1) {
                        runGame.lives += 1; // Reward for finishing level
                        n += 1;

                        soundEngine.soundPlay('nextLevel');

                        console.log('Level: #' + n + ', lives: ' + runGame.lives);

                        startLevel(n);
                    } else {
                        console.log('You win!');
                    }
                });
            }

            startLevel(0);
        },
        lives: 3,
        level: {}
    };

    return runGame;
});

