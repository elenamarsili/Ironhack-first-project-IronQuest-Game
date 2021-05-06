class Background {
    constructor(ctx) {
        this.ctx = ctx

        this.y = 650

        this.h = this.ctx.canvas.height
        this.w = this.ctx.canvas.width

        this.img = new Image()

        this.img.src = "./assets/img/background7.png"
    }

    draw() {
        this.ctx.drawImage(
            this.img,
            0,
            380 + this.y,
            640,
            600,
            0,
            0,
            640,
            700
        )
    }

    move(character) {
        if (!character.isShrunk()){
            this.y = character.y - character.h   
        }
        
    }




}