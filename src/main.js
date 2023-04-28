/*
    NAME: Antonio Guizar Orozco
    TITLE: Rocket Patrol Refactor
    TIME: 2hrs so far
    MODS:
        - Display the time remaining (in seconds) on the screen (10)
        - Implement a new timing/scoring mechanism that adds time to the clock for successful hits (15)
        - Create 4 new explosion sound effects and randomize which one plays on impact (10)
        - Use Phaser's particle emitter to create a particle explosion when the rocket hits the spaceship (15)
        - Create a new enemy Spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (15)
        - Implement the speed increase that happens after 30 seconds in the original game (5)
        - Allow the player to control the Rocket after it's fired (5)
        - Create a new title screen (e.g., new artwork, typography, layout) (10)
        - Add your own (copyright-free) background music to the Play scene (please be mindful of the volume) (5)
        - Randomize each spaceship's movement direction at the start of each play (5)
        - Track a high score that persists across scenes and display it in the UI (5)

    SOURCES:
        - https://stackoverflow.com/questions/9071573/is-there-a-simple-way-to-make-a-random-selection-from-an-array-in-javascript-or
        - https://labs.phaser.io/edit.html?src=src/game%20objects/particle%20emitter/explode%20emitter.js
        - https://blog.ourcade.co/posts/2020/phaser-3-web-audio-best-practices-games/
*/
let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config);
game.highScore= 0;
// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT;
// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
