import Phaser from 'phaser';
import Player from '../entities/player';
import Pipe from '../entities/pipe';

export default class Level1Scene extends Phaser.Scene {
    static KEY = 'Level-1';

    constructor() {
        super({ key: Level1Scene.KEY });
        this.score = 0;
        this.gameFrozen = false;
        this.paused = false;
    }

    create() {
        this.resetGame();
        this.createPauseMenu();
        this.input.keyboard.on('keydown-P', () => this.togglePause());
        this.input.keyboard.on('keydown-M', () => { 
            if (this.paused) {
                this.scene.start('Main-Menu');
                this.scene.stop(Level1Scene.KEY);
            }
        });
    }

    resetGame() {
        this.gameFrozen = false;
        this.paused = false;
        this.score = 0;
        
        this.player = new Player(this, 200, 300);
        this.pipes = this.physics.add.group();
        
        this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#fff' });
        
        this.time.addEvent({
            delay: 1500,
            callback: this.addPipe,
            callbackScope: this,
            loop: true
        });
        
        this.physics.add.collider(this.player, this.pipes, this.gameOver, null, this);
        this.player.body.setVelocityX(0);
    }

    createPauseMenu() {
        this.pauseMenu = this.add.container(400, 300);
        const background = this.add.graphics();
        background.fillStyle(0x000000, 0.7);
        background.fillRect(-150, -100, 300, 200);
        
        const pauseText = this.add.text(0, -50, 'Game Paused', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
        const resumeText = this.add.text(0, 0, 'Press P to Resume', { fontSize: '24px', fill: '#fff' }).setOrigin(0.5);
        const menuText = this.add.text(0, 50, 'Press M to Return to Menu', { fontSize: '24px', fill: '#fff' }).setOrigin(0.5);
        
        this.pauseMenu.add([background, pauseText, resumeText, menuText]);
        this.pauseMenu.setVisible(false);
    }

    togglePause() {
        if (this.paused) {
            this.unpauseGame();
        } else {
            this.pauseGame();
        }
    }

    pauseGame() {
        this.paused = true;
        this.gameFrozen = true;
        this.pauseMenu.setVisible(true);
    }

    unpauseGame() {
        this.paused = false;
        this.gameFrozen = false;
        this.pauseMenu.setVisible(false);
    }

    update() {
        if (this.gameFrozen) return;
        
        this.player.update();
        this.checkScore();
        
        this.pipes.children.iterate(pipe => {
            if (pipe && pipe.update) {
                pipe.update(this.player.x);
            }
            if (pipe && pipe.x < -pipe.width) {
                pipe.destroy();
            }
        });
    }

    addPipe() {
        if (this.gameFrozen) return;

        const pipeHoleHeight = 150;
        const pipeHolePosition = Phaser.Math.Between(100, 500);
        const upperPipeHeight = Phaser.Math.Between(200, 400);
        const lowerPipeY = upperPipeHeight + pipeHoleHeight;

        const upperPipe = new Pipe(this, 800, upperPipeHeight / 2, 50, upperPipeHeight);
        const lowerPipe = new Pipe(this, 800, lowerPipeY + (600 - lowerPipeY) / 2, 50, 600 - lowerPipeY);

        this.pipes.add(upperPipe);
        this.pipes.add(lowerPipe);
    }

    checkScore() {
        if (this.gameFrozen) return;

        this.pipes.children.iterate(pipe => {
            if (pipe.x + pipe.width < this.player.x && !pipe.passed) {
                pipe.passed = true;
                this.score += 0.5;
                this.scoreText.setText('Score: ' + Math.floor(this.score));
            }
        });
    }

    gameOver() {
        this.gameFrozen = true;
        
        this.add.text(300, 250, 'Game Over', { fontSize: '48px', fill: '#ff0000' });
        this.add.text(270, 320, 'Press SPACE to Restart or M to return to Menu', { fontSize: '24px', fill: '#ffffff' });

        this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.restart();
        });
        this.input.keyboard.once('keydown-M', () => {
            this.scene.start('Main-Menu');
            this.scene.stop(Level1Scene.KEY);
        });
    }
}
