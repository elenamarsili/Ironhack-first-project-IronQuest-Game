class Game {
    constructor(canvasId) {
        const canvas = document.getElementById(canvasId) 
        this.ctx = canvas.getContext("2d") 
        
        this.intervalId = null

        this.drawCount = 0
        this.background = new Background(this.ctx)
        this.character = new Character(this.ctx)
        this.block1 = new Block(this.ctx, 499, 4)
        this.block2 = new Block(this.ctx, 342, 5)
        this.block3 = new Block(this.ctx, 185, 6)
        this.block4 = new Block(this.ctx, 28, 7)
        this.block5 = new Block(this.ctx, -129, 8)
        this.block6 = new Block(this.ctx, -286, 9)
        this.block7 = new Block(this.ctx, -443, 10)
        this.blocks = [this.block1, this.block2, this.block3, this.block4, this.block5, this.block6, this.block7]
        
        this.bird1 = new Bird (this.ctx, 550, 4)
        this.bird2 = new Bird (this.ctx, 393, 5)
        this.bird3 = new Bird (this.ctx, 236, 6)
        this.bird4 = new Bird (this.ctx, 79, 7)
        this.bird5 = new Bird (this.ctx, -78, 8)
        this.bird6 = new Bird (this.ctx, -235, 9)
        this.bird7 = new Bird (this.ctx, -392, 10)
        this.birds = [this.bird1, this.bird2, this.bird3, this.bird4, this.bird5, this.bird6, this.bird7]

        this.castle = new Castle(this.ctx)
    }

    startGame() {
        this.intervalId = setInterval(() => {
            this.clear()
            this.move()
            this.draw()
            this.checkCollisionsWithBlocks()
            this.checkCollisionsWithCastle()
            this.fall()
        }, 1000 / 60)
    }

    clear() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    }

    move() {
        this.character.move()
        this.blocks.forEach((block) => block.move(this.character)) 
        this.birds.forEach((bird) => bird.move(this.character)) 
        this.background.move(this.character)
        this.castle.move(this.character)
    }

    draw() {
        this.background.draw()
        this.character.draw()
        this.blocks.forEach(block => block.draw())
        this.birds.forEach(bird => bird.draw())
        this.castle.draw()
    }



    checkCollisionsWithBlocks() { 
        const landingBlock = this.blocks.find(block => {
            return this.character.collidesWithBlock(block)
        }) 
        
        if (landingBlock) {
            this.character.follow(landingBlock)
        } else {
            this.character.y0 = 575
            this.character.followingBlock = undefined
        }
    }

    checkCollisionsWithCastle() { 
        if (this.character.collidesWithCastle(this.castle)) {
            this.character.x = this.castle.x + this.castle.w /2
            this.character.y = this.castle.y + this.castle.h - this.character.h - 45
            this.character.vx = 0
            this.character.vy = 0
            this.character.g = 0
            setTimeout(() => {this.win()}, 500)
        }

    }
    onKeyEvent(event) {
        this.character.onKeyEvent(event)
      }

    win() {
        clearInterval(this.intervalId)
        
        const img = new Image()
        img.src = "./assets/img/rectangle.png"

        this.ctx.drawImage(
            img,
            50,
            175,
            550,
            350
          )

        this.ctx.font = "40px Verdana";
        this.ctx.textAlign = "center";
        this.ctx.fillStyle = "#AB4787";
        this.ctx.fillText(
          "CONGRATS!",
          this.ctx.canvas.width / 2,
          251
        )
        this.ctx.fillText(
            "You found the castle",
            this.ctx.canvas.width / 2,
            329
          );
        this.ctx.fillText(
            "and completed the quest!",
            this.ctx.canvas.width / 2,
            407
          );
        this.ctx.fillText(
            "Your score is...",
            this.ctx.canvas.width / 2,
            485
          );
    }

    fall() {
        if (this.character.isFalling()) {
            setTimeout(() => {this.gameOver()}, 600)
        }
    }
    
    gameOver() {
        clearInterval(this.intervalId)
        
        const img = new Image()
        img.src = "./assets/img/rectangle3.png"

        this.ctx.drawImage(
            img,
            50,
            175,
            550,
            350
          )

        this.ctx.font = "40px Verdana";
        this.ctx.textAlign = "center";
        this.ctx.fillStyle = "#AB4787";
        this.ctx.fillText(
          "GAME OVER!",
          this.ctx.canvas.width / 2,
          this.ctx.canvas.height / 2
        )
    }
}