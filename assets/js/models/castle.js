class Castle {
    constructor (ctx) {
        this.ctx = ctx;

        this.h = 121
        this.w = 150

        this.x = 276
        this.y = -700

        this.vy = 0

/*         this.img = new Image()
        this.img.src = "./assets/img/castle.png" */
    }

    draw() {
        this.ctx.rect(
            this.img,
            this.x,
            this.y,
            this.w,
            this.h
          )


    }

    move(character) {
        this.vy = character.vy * -1.8
        this.y += this.vy
        


        
/*         if (this.x >= this.ctx.canvas.width) { //cuando tenga todo arreglado volveré a intentar que de la vuelta a la montaña
            this.x = -this.w
        } */
    }

/*     moveBlocksVertically(character) {
        if (character.y > this.ctx.canvas.height / 3) {
            this.x += 157
            this.draw()
        }
    } */
}