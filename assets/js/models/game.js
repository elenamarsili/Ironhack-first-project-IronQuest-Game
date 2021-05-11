class Game {
    constructor(canvasId, level, timer, onWin) {
        const canvas = document.getElementById(canvasId);
        this.ctx = canvas.getContext("2d");

        this.level = level

        this.intervalId = null;

        this.life1 = new Life(this.ctx, 520);
        this.life2 = new Life(this.ctx, 560);
        this.life3 = new Life(this.ctx, 600);
        this.lives = [this.life1, this.life2, this.life3];


        this.drawCount = 0;
        this.background = new Background(this.ctx);
        this.character = new Character(this.ctx);
        this.block1 = new Block(this.ctx, 499, 2);
        this.block2 = new Block(this.ctx, 342, 3);
        this.block3 = new Block(this.ctx, 185, 4);
        this.block4 = new Block(this.ctx, 28, 6);
        this.block5 = new Block(this.ctx, -129, 5);
        this.block6 = new Block(this.ctx, -286, 6);
        this.block7 = new Block(this.ctx, -443, 4);
        this.block8 = new Block(this.ctx, 499, 5);
        this.block9 = new Block(this.ctx, 342, 6);
        this.block10 = new Block(this.ctx, 185, 7);
        this.block11 = new Block(this.ctx, 28, 8);
        this.block12 = new Block(this.ctx, -129, 7);
        this.block13 = new Block(this.ctx, -286, 6);
        this.block14 = new Block(this.ctx, -443, 8);
        this.blocks = [];

        this.bird1 = new Bird(this.ctx, 550, 600);
        this.bird2 = new Bird(this.ctx, 393, 400);
        this.bird3 = new Bird(this.ctx, 236, 200);
        this.bird4 = new Bird(this.ctx, 79, 600);
        this.bird5 = new Bird(this.ctx, -78, 500);
        this.bird6 = new Bird(this.ctx, -235, 300);
        this.bird7 = new Bird(this.ctx, -392, 600);
        this.bird8 = new Bird(this.ctx, -549, 400);
        this.birds = [];

        this.castle = new Castle(this.ctx);

        this.timer = timer || new Timer(this.ctx);

        this.canvasBoard = document.getElementById("canvas-layer")

        this.onWin = onWin;
        this.winBoard = document.getElementById("win")

        this.onGameOver = () => {};
        this.gameOverBoard = document.getElementById("game-over")

        this.soundtrack = new Audio('./assets/sounds/soundtrack.mp3');
        this.gameOverSound = new Audio('./assets/sounds/game-over.wav');
        this.winSound = new Audio('./assets/sounds/win.mp3');
        this.hitSound = new Audio('./assets/sounds/hit.mp3');

        this.pauseButton = document.getElementById('pause')
        this.isPaused = false

    }

    checkLevel() {
        if (this.level === 1) {
            this.blocks = [this.block1, this.block2, this.block3, this.block4, this.block5, this.block6, this.block7];
            this.birds = [this.bird1, this.bird2, this.bird3, this.bird4, this.bird5, this.bird6, this.bird7, this.bird8];
            this.background.img.src = "./assets/img/background2.png";
            this.blocks.forEach((block) => block.img.src = "./assets/img/tile.png")
        }
        if (this.level === 2) {
            this.blocks = [this.block8, this.block9, this.block10, this.block11, this.block12, this.block13, this.block14];
            this.birds = [this.bird1, this.bird2, this.bird3, this.bird4, this.bird5, this.bird6, this.bird7, this.bird8];
            this.background.img.src = "./assets/img/background3.png";
            this.blocks.forEach((block) => block.img.src = "./assets/img/tile2.png")
        }
        if (this.level === 3) {
            this.blocks = [this.block8, this.block9, this.block10, this.block11, this.block12, this.block13, this.block14];
            this.birds = [this.bird1, this.bird2, this.bird3, this.bird4, this.bird5, this.bird6, this.bird7, this.bird8];
            this.birds.forEach((bird) => bird.vx = -5);
            this.background.img.src = "./assets/img/background4.png";
            this.blocks.forEach((block) => block.img.src = "./assets/img/tile3.png")
        }
    }

    startGame() {
        if (!this.intervalId) {
            this.checkLevel()
            if (!this.isPaused) {
                this.soundtrack.play();
                this.timer.start();

                this.intervalId = setInterval(() => {
                    this.clear();
                    this.move();
                    this.draw();
                    this.checkCollisionsWithBlocks();
                    this.checkCollisionsWithCastle();
                    this.checkCollisionsWithBirds()
                    this.fall();
                }, 1000 / 60);

            } else {
                this.draw();
                this.soundtrack.pause();
            }
        }

    }

    pauseGame() {
        if (!this.isPaused) {
            this.soundtrack.pause();
            this.isPaused = true;
            this.pauseButton.innerText = "Resume";
            this.timer.stop()
            this.stop()
        } else {
            this.soundtrack.play();
            this.isPaused = false;
            this.pauseButton.innerText = "Pause";
            this.timer.start()
            this.startGame()
        }
    }

    clear() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    }

    move() {
        this.character.move();
        this.blocks.forEach((block) => block.move(this.character));
        this.birds.forEach((bird) => bird.move(this.character));
        this.background.move(this.character);
        this.castle.move(this.character);
    }

    draw() {
        this.background.draw();
        this.character.draw();
        this.blocks.forEach(block => block.draw());
        this.birds.forEach(bird => bird.draw());
        this.castle.draw();
        this.timer.draw();
        this.lives.forEach(life => life.draw());
    }

    checkCollisionsWithBlocks() {
        const landingBlock = this.blocks.find(block => {
            return this.character.collidesWithBlock(block);
        })
        if (landingBlock) {
            this.character.follow(landingBlock);
        } else if (!this.character.isShrunk()) {
            this.character.y0 = 575;
            this.character.followingBlock = undefined;
        }
    }

    checkCollisionsWithCastle() {
        if (this.character.collidesWithCastle(this.castle)) {
            this.character.x = this.castle.x + this.castle.w / 2;
            this.character.y = this.castle.y + this.castle.h - this.character.h - 45;
            this.character.vx = 0;
            this.character.vy = 0;
            this.character.g = 0;
            this.clear();
            this.draw();
            this.win();
        }
    }

    checkCollisionsWithBirds() {
        const collision = this.birds.some(bird => this.character.collidesWithBirds(bird))
        if (collision) {
            if (this.lives.length > 1) {
                this.hitSound.play();
                this.lives.pop();
            } else {
                this.hitSound.play();
                this.lives.pop();
                this.gameOver();
            }
        }
    }

    onKeyEvent(event) {
        this.character.onKeyEvent(event);
    }

    win() {
        this.stop()
        this.soundtrack.pause();
        this.winSound.play();
        this.onWin();
    }

    fall() {
        if (this.character.isFalling()) {
            this.gameOver();
        }
    }

    gameOver() {
        this.stop()

        this.gameOverBoard.style.display = "block";
        this.canvasBoard.style.display = "none";

        this.onGameOver();
        this.soundtrack.pause();
        this.gameOverSound.play();
    }

    stop() {
        clearInterval(this.intervalId);
        this.intervalId = null;
    }
}