class Bird {
    constructor(ctx, y, x) {
        this.ctx = ctx;

        this.h = 35;
        this.w = 35;

        this.x = x;
        this.y = y;

        this.vx = -3;
        this.vy = 0;

        this.img = new Image();
        this.img.drawCount = 0;
        this.img.frames = 14;
        this.img.frameIndex = 0;
        this.img.heightIndex = 0;
        this.img.src = "./assets/img/birdsprite.png";
    }

    draw() {
        this.img.drawCount++;

        if (this.img.drawCount >= 5) {
            this.img.drawCount = 0;
            this.animate()
        }

        this.ctx.drawImage(
            this.img,
            this.img.frameIndex * this.img.width / this.img.frames,
            this.img.heightIndex,
            this.img.width / this.img.frames,
            this.img.height / 2,
            this.x,
            this.y,
            this.w,
            this.h
        )
    }

    move(character) {
        this.x += this.vx;

        if (this.x + this.w >= this.ctx.canvas.width) {
            this.vx = -this.vx
        }

        if (this.x <= 0) {
            this.vx = -this.vx
        }


        if (this.vx > 0) {
            this.img.heightIndex = this.img.height / 2
        }

        if (this.vx < 0) {
            this.img.heightIndex = 0
        }

        if (!character.isShrunk()) {
            this.vy = character.vy * -1.5;
            this.y += this.vy;
        }
    }

    animate() {
        this.img.frameIndex++;
        if (this.img.frameIndex >= this.img.frames) {
            this.img.frameIndex = 0
        }
    }

}