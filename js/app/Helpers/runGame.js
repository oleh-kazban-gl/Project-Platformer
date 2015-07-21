/**
 * @license Project Platformer 1.0 Copyright (c) 2015, Oleh Kazban All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: https://github.com/olehkazban/Project-Platformer for details
 */

define(function(require){
  'use strict';

  var runLevel = require('./runLevel');
  var Level = require('../World/Level');

  function runGame(plans, Display) {
    var lives = 3;

    function startLevel(n) {
      runLevel(new Level(plans[n]), Display, function (status) {
          if (status === 'lost' && lives > 0) {
            lives -= 1; // Player died, for respawn spent 1 life
            console.log('Level: #' + n + ', lives: ' + lives);

            startLevel(n);
          } else if (lives <= 0) {
            console.log('GAME OVER: You spent all your lives, you loose!');
            console.log('Press SPACE to restart');

            var div = document.createElement('div');
            div.style.width = 300 + 'px';
            div.style.height = 200 + 'px';

            div.style.background = 'red';
            div.style.borderRadius = 20 + 'px';
            div.style.color = 'white';

            div.style.position = 'absolute';
            div.style.left = ((screen.width / 2) - (div.width / 2)) + "px";
            div.style.top = ((screen.height / 2) - (div.height / 2)) + "px";

            var center = document.createElement('center');
            var divText = document.createTextNode('GAME OVER. PRESS SPACE TO RESTART.');
            center.appendChild(divText);
            div.appendChild(center);
            document.body.appendChild(div);

            addEventListener('keydown', function (event) {
              if (event.keyCode === 32) {
                var divs = [];

                for (var count = 0; count < document.body.childNodes.length; count++) {
                  var node = document.body.childNodes[count];
                  if (node.nodeType === document.ELEMENT_NODE && node.tagName === 'DIV') {
                    divs.push(node);
                  }
                }

                divs.forEach(function (div) {
                  document.body.removeChild(div);
                });

                lives = 3; // Restoring
                startLevel(0);
              }
            });
          } else if (n < plans.length - 1) {
            lives += 1; // Reward for finishing level
            n += 1;
            console.log('Level: #' + n + ', lives: ' + lives);

            startLevel(n);
          } else {
            console.log('You win!');
          }
        }
      );
    }

    startLevel(0);
  }

  return runGame;
});

