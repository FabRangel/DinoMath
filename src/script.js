/* const Phaser = require("phaser");

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }

};
var game = new Phaser.Game(config);
//Antes de que inicie el juego
function preload(){ 
    game.load.image('sky','assets/sky.png');
}

//añadir la plataforma y fondo
function create(){ 
    game.add.image(300,400,'sky');
}

//Cómo se mueve el jugador?
function update(){ } 
 */

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
const spine = this.add.spine().setDepth(5);
const fix = this.add.rectangle(0,0,4,4, 0x000000).setDepth(5.5); 

function preload() {
    this.load.image('background', 'assets/sky.png');
    this.load.image('ground', 'assets/ground.png');
    this.load.image('dino', 'assets/dino.png');
    this.load.image('coin', 'assets/coin.png');
}

function create() {
    this.add.image(400, 300, 'background');
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    this.player = this.physics.add.sprite(100, 450, 'dino');
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, this.platforms);

    this.coins = this.physics.add.group({
        key: 'coin',
        repeat: 10,
        setXY: { x: 12, y: 0, stepX: 70 }
    });
    this.physics.add.collider(this.coins, this.platforms);

    this.physics.add.overlap(this.player, this.coins, collectCoin, null, this);

    this.score = 0;
    this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
}

function update() {
    var cursors = this.input.keyboard.createCursorKeys();

    if (cursors.left.isDown) {
        this.player.setVelocityX(-160);
    } else if (cursors.right.isDown) {
        this.player.setVelocityX(160);
    } else {
        this.player.setVelocityX(0);
    }

    if (cursors.up.isDown && this.player.body.touching.down) {
        this.player.setVelocityY(-330);
    }
}

function collectCoin(player, coin) {
    coin.disableBody(true, true);
    this.score += 10;
    this.scoreText.setText('Score: ' + this.score);
}
