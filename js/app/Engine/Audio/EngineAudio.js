/**
 * @license Project Platformer 1.0 Copyright (c) 2015, Oleh Kazban All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: https://github.com/olehkazban/Project-Platformer for details
 */

define(function () {
    var soundEngine = {
        sounds: {
            pauseSound: 'sounds/smb_pause.wav',
            gameOver: 'sounds/smb_gameover.wav',
            jump: 'sounds/smb_jump-small.wav',
            death: 'sounds/smb_mariodie.wav',
            powerUp: 'sounds/smb_powerup.wav',
            coin: 'sounds/smb_coin.wav'
        },

        soundInit: function () {
            for (var property in soundEngine.sounds) {
                if (soundEngine.sounds.hasOwnProperty(property)) {
                    var audio = document.createElement('audio');
                    audio.setAttribute('id', property);

                    var source = document.createElement('source');
                    source.setAttribute('src', soundEngine.sounds[property]);

                    audio.appendChild(source);

                    document.body.appendChild(audio);
                }
            }
        },

        soundPlay: function(sound) {
            var playSound = document.getElementById(sound);

            if (playSound.play()) {
                playSound.stop(sound)
            }

            playSound.play();
        }

    };

    return soundEngine;
});

