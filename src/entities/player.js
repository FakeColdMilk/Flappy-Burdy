import Phaser from 'phaser';

export default class Player extends Phaser.GameObjects.Rectangle {
    constructor(scene, x, y) {
        super(scene, x, y, 40, 40, 0x2277ff);

        this.jumpVelocity = -300; 
        this.isJumping = false;

        window.addEventListener('keydown', this.#onKeyDown.bind(this));

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setGravityY(1000); 
    }

    update() {
        if (this.isJumping) {
            this.body.setVelocityY(this.jumpVelocity);
            this.isJumping = false;
        }

        
        if (this.y < 0 || this.y > this.scene.sys.game.config.height) {
            this.scene.scene.restart(); 
        }
    }

    #onKeyDown(event) {
        if (event.key === ' ') { 
            this.isJumping = true;
        }
    }
}
