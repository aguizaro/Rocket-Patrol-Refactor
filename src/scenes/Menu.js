class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion1', './assets/explosion38.wav');
        this.load.audio('sfx_explosion2', './assets/explosion2.wav');
        this.load.audio('sfx_explosion3', './assets/explosion3.ogg');
        this.load.audio('sfx_explosion4', './assets/explosion4.wav');
        this.load.audio('sfx_explosion5', './assets/explosion5.ogg');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
        this.load.audio('bg_music','./assets/8bitRetro.mp3');
    }

    create() {
        let menuConfig = {
            fontFamily: 'Georgia',
            fontSize: '30px',
            backgroundColor: '#c24848',
            color: '#3407a6',
            align: 'center',
            padding: {
            top: 3,
            bottom: 3,
            },
            fixedWidth: 0
        }
        //show menu text
        // show menu text
        this.add.text(game.config.width/2, game.config.height/3 - borderUISize - borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Use <- / -> arrows to move & (F) key to fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#64ad55';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5);
        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // easy mode
          game.settings = {
            spaceshipSpeed: 3,
            gameTimer: 60000    
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // hard mode
          game.settings = {
            spaceshipSpeed: 4,
            gameTimer: 45000    
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
      }
    
}