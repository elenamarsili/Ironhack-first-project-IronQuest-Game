class Block {
    constructor (ctx, y, vx) {
        this.ctx = ctx;

        this.h = 19
        this.w = 254

        this.x = 0
        this.y = y

        this.vx = vx 

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

    move() {
        this.x += this.vx

        if (this.x >= this.ctx.canvas.width) {
            this.x = -this.w
        }
    }
}