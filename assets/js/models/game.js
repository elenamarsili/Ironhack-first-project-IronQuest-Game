class Game {
    constructor(canvasId) {
        const canvas = document.getElementById(canvasId) //encuentro el canvas
        this.ctx = canvas.getContext("2d") // creo el contexto
        
        this.intervalId = null

        this.drawCount = 0
        this.background = new Background(this.ctx)
        this.character = new Character(this.ctx)
        this.block = new Block(this.ctx)
    }

    startGame() {
        this.intervalId = setInterval(() => {
            this.clear()
            this.move()
            this.draw()
        }, 1000 / 60)

    }

    clear() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    }

    move() {
        this.character.move()
        this.block.move()
        if (this.isLanded()) {
            this.character.y = this.block.y - this.character.h
            this.character.x = this.block.x + this.block.w/2
            this.character.y0 = this.character.y
            this.character.vy = 0
            if (this.character.x >= this.ctx.canvas.width) {
                this.character.x = -this.character.w
            }
        }
    }

    draw() {
        this.background.draw()
        this.character.draw()
        this.block.draw()
    }

    isLanded() {
        return (this.character.y + this.character.h >= this.block.y &&
            this.character.y + this.character.h <= this.block.y + this.block.h &&
            this.character.x + this.character.w >= this.block.x &&
            this.character.x <= this.block.x + this.block.w &&
            this.character.y < this.block.y )
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