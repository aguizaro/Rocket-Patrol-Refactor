// Spaceship prefab
class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
      super(scene, x, y, texture, frame);
      scene.add.existing(this);                            //add to existing scence
      this.points= pointValue;                             //store pointvalue
      this.moveSpeed = game.settings.spaceshipSpeed;       //pixels per frame
    }

    update(){
        //wrap around from left edge to right edge
        if (this.x <= 0 - this.width){
            this.x= game.config.width - this.width;
        }else if (this.x >= game.config.width - this.width){
            this.x= 0;
        }
        //move spaceship left if facing left
        if (!this.flipX){
            this.x -= this.moveSpeed;
        }else{ // move spaceship right if facing right
            this.x += this.moveSpeed;
        }
    }

    //position reset
    reset(){
        if (!this.flipX){
            this.x= game.config.width;
        }else{
            this.x= 0;
        }
    }

}
  