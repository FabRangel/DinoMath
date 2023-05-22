
export class Start extends Phaser.Scene{
    
    constructor() { 
        super({ key: "StartScene" });
    }
    init(){
        this.score= 0;
    }
    preload() {
        // Carga de imágenes
        this.load.image('background', 'assets/sky.png'); 
        this.load.image('logo', 'assets/logo.png');
        this.load.image('button', 'assets/boton-de-inicio.png'); 
        this.load.image("coin", "assets/meat.png");
        this.load.image("bomb", "assets/met.png");
        this.load.image("ophi", "assets/ophiw.png");
        this.load.image("ophi1", "assets/ophiw1.png");
        this.load.image("ophi2", "assets/ophiw2.png");
        this.load.image("ophi3", "assets/ophiw3.png");
        this.load.image("ophi4", "assets/ophiw4.png");
        this.load.image("ophi5", "assets/ophiw5.png");
        this.load.image("ophi6", "assets/ophiw6.png");
        this.load.image("ophi7", "assets/ophiw7.png");
        this.load.image("ophi8", "assets/ophiw8.png");
        this.load.image("ophi9", "assets/ophiw9.png");
        this.load.image("dead", "assets/dead.png");
        this.load.image("dead1", "assets/dead1.png");
        this.load.image("dead2", "assets/dead2.png");
        this.load.image("dead3", "assets/dead3.png");
        this.load.image("dead4", "assets/dead4.png");
        this.load.image("dead5", "assets/dead5.png");
        this.load.image("nube", "assets/cloud1.png");
        this.load.image("nube2", "assets/cloud2.png");
        this.load.image("montania", "assets/montania.png");
        this.load.image("montania2", "assets/montania2.png");
        this.load.image("arbol", "assets/arbol.png");
        this.load.image("bloque", "assets/block.png");
        this.load.image("piedrita", "assets/piedrita.png");
        this.load.image("bloquePlat", "assets/blockPlat.png");
        this.load.image("stone", "assets/stone.png");
        this.load.image("plat", "assets/Plat1.png");
        this.load.image("espinas", "assets/espinas.png");
        //Carga de sonido
        this.load.audio("fondo", "assets/inicioFondo.mp3");
    }
    create() {
        //Musica
        const music = this.sound.add("fondo", { loop: true });
        music.play();
        music.volume = 0.03;
        // Fondo
        this.add.image(0, 0, 'background').setScale(2).setOrigin(0);
        this.fondo = this.physics.add.staticGroup();
        this.fondo.create(200, window.innerHeight - 200, "montania");
        this.fondo.create(600, window.innerHeight - 100, "montania2");
        this.fondo.create(window.innerWidth - 250, window.innerHeight - 250, "arbol");
        this.fondo.create(window.innerWidth - 50, window.innerHeight - 100, "piedrita");
        this.piso = this.physics.add.staticGroup({
            key: "bloque",
            repeat: 50,
            setXY: {
                x: 0,
                y: window.innerHeight - 35,
                stepX: 64,
            },
        });

        // Logo
        var titleText = this.add.text(this.game.config.width / 2, this.game.config.height/3, 'Dino Math', { fontSize: '64px', fill: '#ffffff' });
        titleText.setOrigin(0.5);

        // Botón de inicio
        var startButton = this.add.image(this.game.config.width / 2, this.game.config.height / 2, 'button').setScale(1.5).setInteractive();
        startButton.on('pointerdown', this.startGame, this);
    }
    startGame() {
        // Iniciar la escena del juego principal
        //music.stop();
        this.scene.start('game');
    }
}

