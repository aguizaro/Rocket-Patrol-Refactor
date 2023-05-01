class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    
    preload() {
        // load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('fire', './assets/flame.png'); 
        this.load.image('spaceship2', './assets/spaceship_blue.png');   
    }

    create() {
        //background music
        this.backgroundMusic = this.sound.add('bg_music');
        this.backgroundMusic.loop = true; // This is what you are looking for
        this.backgroundMusic.play();
        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);
        // add spaceships (x3)
        let choice= this.chooseRandom([true, false, true, false]);
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0, 0);
        if (choice){ this.ship01.flipX= true;}

        choice= this.chooseRandom([true, false, true, false]);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0);
        if (choice){ this.ship02.flipX= true;}

        choice= this.chooseRandom([true, false, true, false]);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0);
        if (choice){ this.ship03.flipX= true;}

        choice= this.chooseRandom([true, false, true, false]);
        this.ship04 = new Spaceship(this, game.config.width + borderUISize*6,  borderPadding*27, 'spaceship2', 0, 35).setOrigin(0,0);
        if (choice){ this.ship04.flipX= true;}
        this.ship04.moveSpeed += 3; //make the blue ship faster by 3pixels per sec
        //after 30 sec, speed up spaceships
        this.clock = this.time.delayedCall(30000, () => {
            this.ship01.moveSpeed+= 2;
            this.ship02.moveSpeed+= 2;
            this.ship03.moveSpeed+= 2;
            this.ship04.moveSpeed+= 2;
        }, null, this);

        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        // initialize score
        this.p1Score = 0;
        // display score
        this.scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, this.scoreConfig);
        this.scoreConfig.backgroundColor= '#de8978';
        this.scoreConfig.color= '#000000';
        this.displayHighScore = this.add.text(game.config.width - 300, borderUISize + borderPadding*2, game.highScore, this.scoreConfig);
        // GAME OVER flag
        this.gameOver = false;
        // 60-second play clock
        this.scoreConfig.fixedWidth = 0;
        
        this.clock= new Phaser.Time.Clock(this);
        this.clock.timeScale= 10000;
        this.seconds_left= Math.floor((game.settings.gameTimer/1000) + .5 - (this.clock.now/60));
        
        // display time
        let timeConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#f2e4ee',
            color: '#037ffc',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.timeLeft = this.add.text(game.config.width - 150,  borderUISize + borderPadding*2, game.settings.gameTimer/1000 + 1, timeConfig);
    }

    update() {
        if (this.seconds_left < 1){ 
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', this.scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', this.scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }
        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
        this.starfield.tilePositionX -= 4;
        if (!this.gameOver) {          
            this.p1Rocket.update();         // update rocket sprite
            //update ships direction right or left if flipped or not
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
            this.ship04.update();
            this.updateClock();
        }else{
            this.backgroundMusic.stop();
        } 
        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);   
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
        if (this.checkCollision(this.p1Rocket, this.ship04)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship04);
        }
        //update scores
        this.scoreLeft.text = this.p1Score;
        this.displayHighScore.text= game.highScore;
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
          rocket.x + rocket.width > ship.x && 
          rocket.y < ship.y + ship.height &&
          rocket.height + rocket.y > ship. y) {  
          return true;
        } else {
          return false;
        }
      }

    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        const emitter = this.add.particles(ship.x, ship.y, 'fire', {
            lifespan: 2000,
            speed: { min: 200, max: 300 },
            scale: { start: 0.1, end: 0 },
            gravityY: 150,
            blendMode: 'ADD',
            emitting: true
        });
        emitter.explode(50);
        ship.reset();                         // reset ship position
        ship.alpha = 1;
        /*
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
          ship.reset();                         // reset ship position
          ship.alpha = 1;                       // make ship visible again
          boom.destroy();                       // remove explosion sprite
        });
        */
        
        // score add and repaint
        this.p1Score += ship.points;
        //update high score
        if (this.p1Score > game.highScore){
            game.highScore= this.p1Score;
        }
        //random sound effect
        this.sound.play(this.chooseRandom(['sfx_explosion1','sfx_explosion2','sfx_explosion3','sfx_explosion4', 'sfx_explosion5']));
        //add 1 sec to clock on successful hit
        game.settings.gameTimer+= 1000;
        this.updateClock();        

    }

    updateClock(){
        //update clock display
        this.seconds_left= Math.floor((game.settings.gameTimer/1000) + .5 - (this.clock.now/60));        
        this.clock.now++;
        this.timeLeft.setText(this.seconds_left); 
    }

    chooseRandom(choices){
        let index= Math.floor(Math.random() * choices.length);
        return choices[index];
    }
}