class Block {
    constructor (ctx, y, vx) {
        this.ctx = ctx;

        this.h = 19
        this.w = 100

        this.x = 0
        this.y = y

        this.vx = vx 
        this.vy = 0

        this.img = new Image()
        this.img.src = "./assets/img/tile.png"
    }

    draw() {
        this.ctx.drawImage(
            this.img,
            this.x,
            this.y,
            this.w,
            this.h
          )


    }

    move(character) {
        this.x += this.vx

        if (this.x + this.w >= this.ctx.canvas.width) {
            this.vx = -this.vx
        }

        if (this.x <= 0) {
            this.vx = -this.vx
        }  

        this.vy = character.vy * -5
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