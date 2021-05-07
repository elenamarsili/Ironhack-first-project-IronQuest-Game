class Life {
    constructor(ctx, x) {
        this.ctx = ctx;

        this.x = x;
        this.y = 30;

        this.h = 20;
        this.w = 25;

        this.img = new Image();
        this.img.src = "./assets/img/heart.png";
    }

    draw() {
        this.ctx.drawImage(
            this.img,
            this.x,
            this.y,
            this.w,
            this.h
        );
    }
}