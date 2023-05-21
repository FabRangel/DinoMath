import {Game} from './game.js';

const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    scene:[Game],
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 300 },
            debug: false,
        }
    }
};
var game = new Phaser.Game(config);