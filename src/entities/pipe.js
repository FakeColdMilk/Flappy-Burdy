import Phaser from 'phaser';

export default class Pipe extends Phaser.GameObjects.Rectangle {
    constructor(scene, x, y, width, height, speed = 200) {
        super(scene, x, y, width, height, 0x00ff00);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setImmovable(true); 
        this.passed = false; 

        this.speed = speed;
    }

    update(playerX) {
        
        this.body.setVelocityX(-(this.speed + (playerX / 10)));
    }
}
