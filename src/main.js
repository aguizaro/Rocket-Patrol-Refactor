/*
    NAME: Antonio Guizar Orozco
    TITLE: Rocket Patrol Refactor
    TIME: 2hrs so far
    MODS:
        - Display the time remaining (in seconds) on the screen (10)
        - Implement a new timing/scoring mechanism that adds time to the clock for successful hits (15)
        - Create 4 new explosion sound effects and randomize which one plays on impact (10)
        - 
    
    SOURCES:
        - https://stackoverflow.com/questions/9071573/is-there-a-simple-way-to-make-a-random-selection-from-an-array-in-javascript-or
        - 

*/
let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config);
// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT;
// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
