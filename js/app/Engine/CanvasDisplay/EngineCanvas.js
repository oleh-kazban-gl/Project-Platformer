/**
 * @license Project Platformer 1.0 Copyright (c) 2015, Oleh Kazban All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: https://github.com/olehkazban/Project-Platformer for details
 */

define(function (require) {
    'use strict';

    var runGame = require('../../Helpers/runGame');
    var Level = require('../../World/Level');

    var scale = 20;

    var results = [
        {name: 'Satisfied', count: 1043, color: 'lightblue'},
        {name: 'Neutral', count: 563, color: 'lightgreen'},
        {name: 'Unsatisfied', count: 510, color: 'pink'},
        {name: 'No comment', count: 175, color: 'silver'}
    ];

    var otherSprites = document.createElement('img');
    otherSprites.src = 'images/sprites.png';

    var playerSprites = document.createElement('img');
    playerSprites.src = 'images/player.png';
    var playerXOverlap = 4;

    function flipHorizontally(context, around) {
        context.translate(around, 0);
        context.scale(-1, 1);
        context.translate(-around, 0);
    }

    function CanvasDisplay(parent, level) {
        this.canvas = document.createElement('canvas');
        this.canvas.width = Math.min(window.innerWidth, level.width * scale);
        this.canvas.height = Math.min(window.innerHeight, level.height * scale);
        parent.appendChild(this.canvas);
        this.context = this.canvas.getContext('2d');

        this.level = level;
        this.animationTime = 0;
        this.flipPlayer = false;

        this.viewport = {
            left: 0,
            top: 0,
            width: this.canvas.width / scale,
            height: this.canvas.height / scale
        };

        this.drawFrame(0);
    }

    CanvasDisplay.prototype.clear = function () {
        this.canvas.parentNode.removeChild(this.canvas);
    };

    CanvasDisplay.prototype.drawFrame = function (step) {
        this.animationTime += step;

        this.updateViewport();
        this.clearDisplay();
        this.drawBackground();
        this.drawActors();
        this.drawStats();
    };

    CanvasDisplay.prototype.updateViewport = function () {
        var view = this.viewport, margin = view.width / 3;
        var player = this.level.player;
        var center = player.pos.plus(player.size.times(0.5));

        if (center.x < view.left + margin) {
            view.left = Math.max(center.x - margin, 0);
        } else if (center.x > view.left + view.width - margin) {
            view.left = Math.min(center.x + margin - view.width,
                this.level.width - view.width);
        }

        if (center.y < view.top + margin) {
            view.top = Math.max(center.y - margin, 0);
        } else if (center.y > view.top + view.height - margin) {
            view.top = Math.min(center.y + margin - view.height,
                this.level.height - view.height);
        }
    };

    CanvasDisplay.prototype.clearDisplay = function () {
        if (this.level.status == 'won') {
            this.context.fillStyle = 'rgb(68, 191, 255)';
        } else if (this.level.status == 'lost') {
            this.context.fillStyle = 'rgb(44, 136, 214)';
        } else {
            this.context.fillStyle = 'rgb(52, 166, 251)';
        }

        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    };

    CanvasDisplay.prototype.drawBackground = function () {
        var view = this.viewport;
        var xStart = Math.floor(view.left);
        var xEnd = Math.ceil(view.left + view.width);
        var yStart = Math.floor(view.top);
        var yEnd = Math.ceil(view.top + view.height);

        for (var y = yStart; y < yEnd; y++) {
            for (var x = xStart; x < xEnd; x++) {
                var tile = this.level.grid[y][x];

                if (tile == null) continue;
                var screenX = (x - view.left) * scale;
                var screenY = (y - view.top) * scale;
                var tileX = tile == 'lava' ? scale : 0;

                this.context.drawImage(otherSprites, tileX, 0, scale, scale, screenX, screenY, scale, scale);
            }
        }
    };

    CanvasDisplay.prototype.drawPlayer = function (x, y, width, height) {
        var sprite = 8, player = this.level.player;
        width += playerXOverlap * 2;
        x -= playerXOverlap;

        if (player.speed.x != 0) {
            this.flipPlayer = player.speed.x < 0;
        }

        if (player.speed.y != 0) {
            sprite = 9;
        } else if (player.speed.x != 0) {
            sprite = Math.floor(this.animationTime * 12) % 8;
        }

        this.context.save();

        if (this.flipPlayer) {
            flipHorizontally(this.context, x + width / 2);
        }

        this.context.drawImage(playerSprites, sprite * width, 0, width, height, x, y, width, height);

        this.context.restore();
    };

    CanvasDisplay.prototype.drawActors = function () {
        this.level.actors.forEach(function (actor) {
            var width = actor.size.x * scale;
            var height = actor.size.y * scale;
            var x = (actor.pos.x - this.viewport.left) * scale;
            var y = (actor.pos.y - this.viewport.top) * scale;

            if (actor.type == 'player') {
                this.drawPlayer(x, y, width, height);
            } else {
                var tileX = (actor.type == 'coin' ? 2 : 1) * scale;
                this.context.drawImage(otherSprites, tileX, 0, width, height, x, y, width, height);
            }
        }, this);
    };

    CanvasDisplay.prototype.drawStats = function () {
        var lives = runGame.lives;
        var coins = runGame.level.coins;
        this.context.font = ('16px Georgia');
        this.context.fillStyle = '#fff';

        var x = 20;
        var y = 20;
        var tileX = 52;

        for (var count = 0; count < lives; x += 15) {
            this.context.drawImage(otherSprites, tileX, 0, 12, 12, x, y, 12, 12);
            count++;
        }

        y +=20, x = 20;

        this.context.drawImage(otherSprites, 40, 0, 12, 12, x, y, 12, 12);
        this.context.fillText(' x ' + coins + ' remains', 35, 50);


    };

    return CanvasDisplay;
});

