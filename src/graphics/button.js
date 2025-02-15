import Phaser from 'phaser';
import Text from './text';

export default class Button extends Phaser.GameObjects.Container {

    /**
     * 
     * @param {Phaser.Scene} scene 
     */
    constructor(scene, text, x, y, width, height, callback) {
        super(scene, x, y);

    
        this.color = 0xff9933;
        this.hoverColor = 0xffff00;
        this.callback = callback;

        this.background = scene.add.rectangle(0, 0, width, height, this.color)
        this.background.originX = 0.5

        this.add(this.background)

        this.label = new Text(scene, 0, 0, text, 32, 'black')
        this.add(this.label)

        
        this.background.setInteractive();

        
        scene.add.existing(this);

        
        this.background.on('pointerover', this.onHover, this);
        this.background.on('pointerout', this.onOut, this);
        this.background.on('pointerdown', this.onClick, this);
    }

    
    onHover() {
        this.background.setFillStyle(this.hoverColor);
    }

   
    onOut() {
        this.background.setFillStyle(this.color);
    }

   
    onClick() {
        if (this.callback) {
            this.callback();
        }
    }
}