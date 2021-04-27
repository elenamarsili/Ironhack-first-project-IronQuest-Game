class Game {
    constructor(canvasId) {
        const canvas = document.getElementById(canvasId) //encuentro el canvas
        this.ctx = canvas.getContext("2d") // creo el contexto
        
        this.intervalId = null

        this.drawCount = 0
        this.background = new Background(this.ctx)
        this.character = new Character(this.ctx)
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
    }

    draw() {
        this.background.draw()
        this.character.draw()
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