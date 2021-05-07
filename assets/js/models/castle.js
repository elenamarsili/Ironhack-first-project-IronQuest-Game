class Castle {
    constructor(ctx) {
        this.ctx = ctx;

        this.h = 121;
        this.w = 150;

        this.x = 276;
        this.y = -700;

        this.vy = 0;
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
        this.vy = character.vy * -1.8;
        this.y += this.vy
    }
}