import Phaser from 'phaser';

export default class MainMenuScene extends Phaser.Scene {
    static KEY = 'Main-Menu';

    constructor() {
        super({ key: MainMenuScene.KEY });
    }

    create() {
        this.add.text(400, 200, 'Flappy Burd', { fontSize: '64px', fill: '#fff' }).setOrigin(0.5);
        this.add.text(400, 300, 'Press Space to Start', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
        
        
        this.input.keyboard.on('keydown-SPACE', () => {
            this.scene.start('Level-1');  
            this.scene.stop(MainMenuScene.KEY); 
        });
    }
}
