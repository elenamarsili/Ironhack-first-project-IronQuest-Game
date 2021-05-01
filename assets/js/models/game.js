class Game {
    constructor(canvasId) {
        const canvas = document.getElementById(canvasId) //encuentro el canvas
        this.ctx = canvas.getContext("2d") // creo el contexto
        
        this.intervalId = null

        this.drawCount = 0
        this.background = new Background(this.ctx)
        this.character = new Character(this.ctx)
        this.block1 = new Block(this.ctx, 259, 3)
        this.block2 = new Block(this.ctx, 102, 4)
        this.block3 = new Block(this.ctx, -55, 5)
        this.block4 = new Block(this.ctx, -212, 6)
        this.block5 = new Block(this.ctx, -369, 7)
        this.block6 = new Block(this.ctx, -526, 8)
        this.block7 = new Block(this.ctx, -683, 9)
        this.block8 = new Block(this.ctx, -840, 10)
        this.block9 = new Block(this.ctx, -997, 11)
        this.block10 = new Block(this.ctx, -1154, 12)
        this.blocks = [this.block1, this.block2, this.block3, this.block4, this.block5, this.block6, this.block7, this.block8, this.block9, this.block10]
    }

    startGame() {
        this.intervalId = setInterval(() => {
            this.clear()
            this.move()
            this.draw()
            this.checkCollisions()
        }, 1000 / 60)
    }

    clear() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    }

    move() {
        this.character.move()
        this.blocks.forEach((block) => block.move(this.character)) 
        this.background.move(this.character)
    }

    draw() {
        this.background.draw()
        this.character.draw()
        this.blocks.forEach(block => block.draw())


/*         if (this.character.y <= this.ctx.canvas.height / 2) {
            this.blocks.forEach(block => {
                block.y = block.y + 157
                return block.draw()
            })
        } */
        
        /*         if (this.character.collidesWithBlock()) {
            this.blocks.forEach((block) => {
                block.x += 157
            })
        } */
    }



    checkCollisions() { 
        const landingBlock = this.blocks.find(block => {
            return this.character.collidesWithBlock(block)
        }) 
        
        if (landingBlock) {
            this.character.follow(landingBlock)
        } else {
            this.character.y0 = 335
            this.character.followingBlock = undefined
        }
    }

    onKeyEvent(event) {
        this.character.onKeyEvent(event)
      }
/*     gameOver() {
        clearInterval(this.intervalId)
    
        this.ctx.font = "40px Comic Sans MS";
        this.ctx.textAlign = "center";
        this.ctx.fillText(
          "GAME OVER",
          this.ctx.canvas.width / 2,
          this.ctx.canvas.height / 2
        );
    } */
}