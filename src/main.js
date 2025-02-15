import Phaser from 'phaser';
import MainMenuScene from './scenes/main-menu';
import Level1Scene from './scenes/level-1';
import './style.css';

/**
 * @type {Phaser.Types.Core.GameConfig}
 */

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: document.querySelector('#app'),
  scene: [
    MainMenuScene,
    Level1Scene
  ],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 }, 
      debug: true
    }
  }
};

const game = new Phaser.Game(config);