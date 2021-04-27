class Background {
    constructor(ctx) {
        this.ctx = ctx

        this.x = 0
        this.y = 0

        this.h = this.ctx.canvas.height
        this.w = this.ctx.canvas.width

        this.img = new Image()

        this.img.src = "./assets/img/background2.png"
    }

draw() {
    this.ctx.drawImage(
        this.img, 
        0, 
        1439, 
        640, 
        480, 
        0, 
        0, 
        640, 
        480
        )
}

move() {

}

}