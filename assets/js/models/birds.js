class Bird {
    constructor (ctx, y, vx) {
        this.ctx = ctx;

        this.h = 51
        this.w = 51

        this.x = this.ctx.canvas.width - this.w
        this.y = y

        this.vx = -vx 
        this.vy = 0

        this.img = new Image()
        this.img.drawCount = 0
        this.img.frames = 14
        this.img.frameIndex = 0
        this.img.heightIndex = 0
        this.img.src = "./assets/img/birdsprite.png"
    }

    draw() {
        this.img.drawCount++

        if (this.img.drawCount >= 5) {
            this.img.drawCount = 0
            this.animate()
          }

        this.ctx.drawImage(
            this.img,
            this.img.frameIndex * this.img.width / this.img.frames,
            0, 
            this.img.width / this.img.frames,
            this.img.height,
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

        this.vy = character.vy * -1.5
        this.y += this.vy        
    }

    animate() { 
           this.img.frameIndex++
           if (this.img.frameIndex >= this.img.frames) {
             this.img.frameIndex = 0
           }
    }
 
}