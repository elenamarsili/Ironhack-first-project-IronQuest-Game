class Background {
    constructor(ctx) {
        this.ctx = ctx

        this.y = 1439

        this.h = this.ctx.canvas.height
        this.w = this.ctx.canvas.width

        this.img = new Image()

        this.img.src = "./assets/img/background2.png"
    }

    draw() {
        this.ctx.drawImage(
            this.img,
            0,
            1185 + this.y,
            640,
            480,
            0,
            0,
            640,
            480
        )
    }

    move(character) {
        this.y = character.y - character.h
    }




}