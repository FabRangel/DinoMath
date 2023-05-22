import {Game} from './game.js';
import {Start} from './main.js';

const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    scene:[Start,Game],
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 300 },
            debug: false,
        }
    }
};
var game = new Phaser.Game(config);

