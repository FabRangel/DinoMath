export class Game extends Phaser.Scene {
    constructor() {
        super({ key: "game" });
        this.gameOver = false;
        this.scoreText = null;
    }
    init() {
        this.score = 0;
    }
    preload() {
        this.anims.remove("left");
        this.anims.remove("turn");
        this.anims.remove("right");
        this.anims.remove("murio");
        this.load.image("background", "assets/sky.png");
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
        this.load.audio("fondo1", "assets/gameFondo.mp3");
        this.load.audio("gameOver", "assets/gameOver.wav");
        this.load.audio("come", "assets/come.wav");
        //Cuando el jugador se mueve a la izq
        this.anims.create({
            key: "left",
            frames: [
                { key: "ophi" },
                { key: "ophi1" },
                { key: "ophi2" },
                { key: "ophi3" },
                { key: "ophi4" },
                { key: "ophi5" },
            ],
            frameRate: 10,
            repeat: -1,
        });

        //Cuando el jugador está quieto
        this.anims.create({
            key: "turn",
            frames: [{ key: "ophi" }],
            frameRate: 20,
        });
        //Cuando el jugador se mueve a la derecha
        this.anims.create({
            key: "right",
            frames: [
                { key: "ophi" },
                { key: "ophi1" },
                { key: "ophi2" },
                { key: "ophi3" },
                { key: "ophi4" },
                { key: "ophi5" },
            ],
            frameRate: 10,
            //La animación vuelve a empezar cuando termine
            repeat: -1,
        });
        //Cuando el jugador se muere
        this.anims.create({
            key: "murio",
            frames: [
                { key: "dead" },
                { key: "dead1" },
                { key: "dead2" },
                { key: "dead3" },
                { key: "dead4" },
                { key: "dead5" },
            ],
            frameRate: 10,
            repeat: 0,
        });
    }

    create() {
        //const spine = this.add.spine().setDepth(5);
        const fix = this.add.rectangle(0, 0, 4, 4, 0x000000).setDepth(5.5);
        this.add
            .image(this.cameras.main.centerX, this.cameras.main.centerY, "background")
            .setScale(2);
        //nubes
        this.nubes = this.physics.add.staticGroup({
            key: "nube",
            repeat: 4,
            setXY: {
                x: 50,
                y: 50,
                stepX: 500,
            },
        });
        this.masNubes = this.physics.add.staticGroup({
            key: "nube2",
            repeat: 3,
            setXY: {
                x: 250,
                y: 150,
                stepX: 500,
            },
        });
        this.fondo = this.physics.add.staticGroup();
        this.fondo.create(200, window.innerHeight - 200, "montania");
        this.fondo.create(600, window.innerHeight - 100, "montania2");
        this.fondo.create(
            window.innerWidth - 250,
            window.innerHeight - 250,
            "arbol"
        );
        this.fondo.create(
            window.innerWidth - 50,
            window.innerHeight - 100,
            "piedrita"
        );
        //Piso
        this.piso = this.physics.add.staticGroup({
            key: "bloque",
            repeat: 50,
            setXY: {
                x: 0,
                y: window.innerHeight - 35,
                stepX: 64,
            },
        });
        //Espinas
        this.espinas = this.physics.add.staticGroup();
        this.espinas.create(800, window.innerHeight - 75, "espinas").setScale(0.7);
        this.espinas.create(850, 260, "espinas").setScale(0.7);
        this.espinas.create(10, 240, "espinas").setScale(0.7);
        this.espinas.create(window.innerWidth - 50, 410, "espinas").setScale(0.7);
        //Plataformas (estáticas)
        this.platforma1 = this.physics.add.staticGroup({
            key: "bloquePlat",
            repeat: 3,
            setXY: {
                x: 300,
                y: window.innerHeight - 250,
                stepX: 50,
            },
        });
        this.platforma2 = this.physics.add.staticGroup({
            key: "bloquePlat",
            repeat: 3,
            setXY: {
                x: 20,
                y: window.innerHeight - 470,
                stepX: 64,
            },
        });
        this.platforma3 = this.physics.add.staticGroup();
        this.platforma3.create(700, 210, "stone");
        this.platforma5 = this.physics.add.staticGroup({
            key: "bloquePlat",
            repeat: 1,
            setXY: {
                x: 500,
                y: 150,
                stepX: 64,
            },
        });
        this.platforma6 = this.physics.add.staticGroup({
            key: "bloquePlat",
            repeat: 3,
            setXY: {
                x: 850,
                y: 300,
                stepX: 64,
            },
        });
        this.platforma4 = this.physics.add.staticGroup();
        this.platforma4.create(600, window.innerHeight - 80, "stone").setScale(0.5);
        this.platforma4.create(632, window.innerHeight - 80, "stone").setScale(0.5);
        this.platforma4.create(664, window.innerHeight - 80, "stone").setScale(0.5);
        this.platforma4
            .create(617, window.innerHeight - 112, "stone")
            .setScale(0.5);
        this.platforma4
            .create(649, window.innerHeight - 112, "stone")
            .setScale(0.5);
        this.platforma4
            .create(632, window.innerHeight - 144, "stone")
            .setScale(0.5);
        this.platforma7 = this.physics.add.staticGroup({
            key: "bloquePlat",
            repeat: 4,
            setXY: {
                x: 1100,
                y: 150,
                stepX: 64,
            },
        });
        this.platforma8 = this.physics.add.staticGroup({
            key: "stone",
            repeat: 3,
            setXY: {
                x: window.innerWidth - 140,
                y: 450,
                stepX: 64,
            },
        });

        //Personaje
        this.player = this.physics.add.sprite(100, 450, "ophi").setScale(0.1);
        this.player.setCollideWorldBounds(true);
        this.player.setBounce(0.4);
        this.physics.add.collider(this.player, this.piso);
        //variar la gravedad en Y del jugador (mayor es más pesado y cae mas rapido)
        //Colisión entre player y plataformas
        this.physics.add.collider(this.player, this.platforma1);
        this.physics.add.collider(this.player, this.platforma2);
        this.physics.add.collider(this.player, this.platforma3);
        this.physics.add.collider(this.player, this.platforma4);
        this.physics.add.collider(this.player, this.platforma5);
        this.physics.add.collider(this.player, this.platforma6);
        this.physics.add.collider(this.player, this.platforma7);
        this.physics.add.collider(this.player, this.platforma8);
        this.cursor = this.input.keyboard.createCursorKeys();

        //Nuevo grupo
        this.coins = this.physics.add.group({
            key: "coin",
            repeat: 29,
            setXY: {
                x: 12,
                y: 0,
                stepX: 50,
            },
        });
        this.coinSound = this.sound.add("come");
        this.gameOverSound = this.sound.add("gameOver");
        //rebote en Y de estrellas con plataformas
        this.coins.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });

        this.physics.add.collider(this.coins, this.platforma1);
        this.physics.add.collider(this.coins, this.platforma2);
        this.physics.add.collider(this.coins, this.platforma3);
        this.physics.add.collider(this.coins, this.platforma4);
        this.physics.add.collider(this.coins, this.platforma5);
        this.physics.add.collider(this.coins, this.platforma6);
        this.physics.add.collider(this.coins, this.platforma7);
        this.physics.add.collider(this.coins, this.platforma8);
        this.physics.add.collider(this.coins, this.piso);
        //score
        this.scoreText = this.add.text(16, 16, "Carnitas: 0", {
            fontSize: "32px",
            fill: "#000",
        });
        //Coins y player
        console.log("score:" + this.scoreText.text);
        this.physics.add.overlap(
            this.player,
            this.coins,
            this.collectStar,
            this.null,
            this
        );

        //bombas
        this.bombs = this.physics.add.group();
        this.physics.add.collider(this.bombs, this.platforma1);
        this.physics.add.collider(this.bombs, this.platforma2);
        this.physics.add.collider(this.bombs, this.platforma3);
        this.physics.add.collider(this.bombs, this.platforma4);
        this.physics.add.collider(this.bombs, this.platforma5);
        this.physics.add.collider(this.bombs, this.platforma6);
        this.physics.add.collider(this.bombs, this.platforma7);
        this.physics.add.collider(this.bombs, this.platforma8);
        this.physics.add.collider(this.bombs, this.piso);
        this.physics.add.collider(
            this.player,
            this.bombs,
            this.hitBomb,
            null,
            this
        );
        //Espinas eviten a los coins
        this.physics.add.collider(
            this.espinas,
            this.coins,
            this.evitarColision,
            null,
            this
        );
        //Espinas contra player
        this.physics.add.collider(
            this.player,
            this.espinas,
            this.hitEspina,
            null,
            this
        );
    }

    update() {
        if (this.gameOver) {
            return;
        }
        //El player va izq o derecho
        if (this.cursor.left.isDown) {
            this.player.setFlipX(false);
            this.player.setVelocityX(-160);
            this.player.anims.play("left", true);
        } else if (this.cursor.right.isDown) {
            this.player.setScale(0.1);
            this.player.setFlipX(true);
            this.player.setVelocityX(160);
            this.player.anims.play("right", true);
        } else {
            this.player.setVelocityX(0);
            this.player.anims.play("turn");
        }
        //El jugador salta, para que salte solo si toca plataformas: player.body.tounching.down
        if (this.cursor.up.isDown) {
            this.player.setVelocityY(-330);
        }
    }

    //Funcion para coleccionar coins
    collectStar(player, coin) {
        console.log("score:" + this.scoreText);
        coin.disableBody(true, true);
        this.coinSound.play();
        this.score += 1;
        this.scoreText.setText("Carnitas: " + this.score);
        //Checar si no ha llegado al final
        if (this.score > 99) {
            this.congrats();
        }
        //Si ya no hay monedas
        if (this.coins.countActive(true) === 0) {
            //vuelve a lanzar las monedas
            this.coins.children.iterate(function (child) {
                child.enableBody(true, child.x, 0, true, true);
            });
            //Coordenada aleatoria al contrario del jugador
            var x =
                player.x < 400
                    ? Phaser.Math.Between(400, 800)
                    : Phaser.Math.Between(0, 400);
            var bomb = this.bombs.create(x, 16, "bomb");
            //Que la bomba rebote y no se salga
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        }
    }

    //Función para que el juego acabe si lo toca una bomba
    hitBomb(player, bomb) {
        this.physics.pause();
        this.player.setTint(0x9b9b9b);
        this.player.anims.play("murio");
        this.gameOverSound.play();
        const graphics = this.add.graphics();
        graphics.fillStyle(0x000000, 0.3);
        graphics.fillRect(0, 0, this.game.config.width, this.game.config.height);

        const text = this.add.text(
            this.game.config.width / 2,
            this.game.config.height / 2 - 50,
            "Game Over",
            { fontSize: "32px", fill: "#fff" }
        );
        text.setOrigin(0.5);
        const restartButton = this.add.text(
            this.game.config.width / 3 + 70,
            this.game.config.height / 2 + 40,
            "Restart",
            { fontSize: "24px", fill: "#fff" }
        );
        restartButton.setOrigin(0.5);
        restartButton.setInteractive();
        restartButton.on("pointerdown", this.resetGame, this);
        const seguirButton = this.add.text(
            this.game.config.width / 2 + 120,
            this.game.config.height / 2 + 35,
            "Seguir",
            { fontSize: "24px", fill: "#fff" }
        );
        seguirButton.setOrigin(0.5);
        seguirButton.setInteractive();
        seguirButton.on("pointerdown", this.continueGame, this);
        // Guardar el gráfico de "Game Over" en una variable adicional
        this.gameOverGraphics = graphics;
        this.gameOverText = text;
        this.restartButton = restartButton;
        this.seguirButton = seguirButton;

        this.gameOver = true;
    }
    //Función para que los coins eviten a las espinas
    evitarColision(espina, coin) {
        coin.disableBody(true, true);
        // Evitar colisión entre coins y espinas
        //coin.x -=100;
    }
    //Función para que el juego acabe si lo toca una espina
    hitEspina(player,espinas) {
        this.physics.pause();
        player.setTint(0x9b9b9b);
        player.anims.play("murio");
        this.gameOverSound.play();
        const graphics = this.add.graphics();
        graphics.fillStyle(0x000000, 0.3);
        graphics.fillRect(0, 0, this.game.config.width, this.game.config.height);

        const text = this.add.text(
            this.game.config.width / 2,
            this.game.config.height / 2 - 50,
            "Game Over",
            { fontSize: "32px", fill: "#fff" }
        );
        text.setOrigin(0.5);
        const restartButton = this.add.text(
            this.game.config.width / 3 + 70,
            this.game.config.height / 2 + 40,
            "Restart",
            { fontSize: "24px", fill: "#fff" }
        );
        restartButton.setOrigin(0.5);
        restartButton.setInteractive();
        restartButton.on("pointerdown", this.resetGame, this);
        const seguirButton = this.add.text(
            this.game.config.width / 2 + 180,
            this.game.config.height / 2 + 35,
            "Seguir",
            { fontSize: "24px", fill: "#fff" }
        );
        seguirButton.setOrigin(0.5);
        seguirButton.setInteractive();
        seguirButton.on("pointerdown", this.continueGame, this);
        // Guardar el gráfico de "Game Over" en una variable adicional
        this.gameOverGraphics = graphics;
        this.gameOverText = text;
        this.restartButton = restartButton;
        this.seguirButton = seguirButton;

        this.gameOver = true;
    }
    resetGame() {
        this.gameOver = false;
        this.score = 0;

        // Reactivar el jugador y las monedas
        this.player.enableBody(true, 100, 450, true, true);
        this.coins.children.iterate(function (child) {
            child.enableBody(true, child.x, 0, true, true);
        });

        // Reiniciar la posición y la animación del jugador
        this.player.setPosition(100, 450);
        this.player.setVelocityX(0);
        this.player.anims.play("turn");

        // Reiniciar el texto de puntuación
        this.scoreText.setText("Carnitas: 0");

        // Eliminar las bombas existentes
        this.bombs.clear(true, true);

        // Eliminar cualquier tintado aplicado al jugador
        this.player.clearTint();

        // Reactivar la física del juego
        this.physics.resume();
        // Destruir el gráfico de "Game Over"
        this.gameOverGraphics.destroy();
        this.gameOverText.destroy();
        this.restartButton.destroy();
        this.seguirButton.destroy();
    }
    continueGame() {
        var respuestaCorrecta = this.score * 0.5;
        Swal.fire({
            title: "¡Continuar jugando!",
            text: "Para seguir jugando, responde esta sencilla pregunta de matemáticas:\n\nSi tu dinosaurio aumenta 0.5 kilos por cada carnita que come. ¿Cuántos kilos aumentó?",
            input: "number",
            inputAttributes: {
                step: 0.5,
                maxlength: 10,
            },
            showCancelButton: true,
            confirmButtonText: "Enviar",
            showLoaderOnConfirm: true,
            customClass: {
                input: 'custom-input'
            },
            preConfirm: (respuestaUsuario) => {
                return new Promise((resolve) => {
                    resolve(respuestaUsuario);
                });
            },
            allowOutsideClick: () => !Swal.isLoading(),
        }).then((result) => {
            if (result.isConfirmed) {
                const respuestaUsuario = result.value;
                if (parseFloat(respuestaUsuario) === respuestaCorrecta) {
                    Swal.fire("¡Respuesta correcta!", "Puedes seguir jugando. :D", "success").then(() => {
                        this.seguirJuego();
                    });
                } else {
                    Swal.fire("Respuesta incorrecta", "Lo siento, esa no es la respuesta correcta :C. El juego se reiniciará.", "error").then(() => {
                        this.resetGame();
                    });
                }
            }
        });

    }
    seguirJuego() {
        this.gameOver = false;
        // Reactivar el jugador y las monedas
        this.player.enableBody(true, 100, 450, true, true);
        this.coins.children.iterate(function (child) {
            child.enableBody(true, child.x, 0, true, true);
        });

        // Reiniciar la posición y la animación del jugador
        this.player.setPosition(100, 450);
        this.player.setVelocityX(0);
        this.player.anims.play("turn");

        // Eliminar cualquier tintado aplicado al jugador
        this.player.clearTint();

        // Reactivar la física del juego
        this.physics.resume();
        // Destruir el gráfico de "Game Over"
        this.gameOverGraphics.destroy();
        this.gameOverText.destroy();
        this.restartButton.destroy();
        this.seguirButton.destroy();
    }
    congrats() {
        this.physics.pause();
        var respuestaCorrecta = 80;
        this.scoreText.setText("Carnitas: 100");
        var pregunta =
            "¡Pregunta Final!\n\n Si cada vez que el dinosaurio se come 20 carnitas aparecieran 2 meteoritos, ¿Cuántas carnitas se debe comer para que existan 8 meteoritos? \n\n\nTus carnitas: " +
            this.score;

        Swal.fire({
            title: "¡Pregunta Final!",
            html: pregunta,
            input: "number",
            inputAttributes: {
                step: 1,
            },
            showCancelButton: false,
            confirmButtonText: "Enviar",
            showLoaderOnConfirm: true,
            customClass: {
                input: 'custom-input'
            },
            preConfirm: (respuestaUsuario) => {
                return new Promise((resolve) => {
                    resolve(respuestaUsuario);
                });
            },
            allowOutsideClick: () => !Swal.isLoading(),
        }).then((result) => {
            if (result.isConfirmed) {
                const respuestaUsuario = result.value;
                if (parseFloat(respuestaUsuario) === respuestaCorrecta) {
                    Swal.fire(
                        "¡Respuesta correcta!",
                        "¡Felicidades! Ya tienes conocimientos sobre la regla de 3 :D",
                        "success"
                    );
                } else {
                    Swal.fire(
                        "Respuesta incorrecta",
                        "Lo siento, esa no es la respuesta correcta. El juego se reiniciará D:",
                        "error"
                    ).then(() => {
                        this.resetGame();
                    });
                }
            }
        });
    }
/*Versión Final*/
}
