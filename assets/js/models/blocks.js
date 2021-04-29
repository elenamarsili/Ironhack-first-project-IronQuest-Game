class Block {
    constructor (ctx) {
        this.ctx = ctx;

        this.h = 63
        this.w = 254

        this.x = 0
        this.y = 250

        this.vx = 3

        this.img = new Image()
        this.img.src = "./assets/img/tile-1.png"
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

    move() {
        this.x += this.vx

        if (this.x >= this.ctx.canvas.width) {
            this.x = -this.w
        }
/*         if (this.x + this.w >= this.ctx.canvas.width) {
            this.vx *= -1
        }
      
        if (this.x <= 0) {
            this.vx *= -1
        } */
    }
}