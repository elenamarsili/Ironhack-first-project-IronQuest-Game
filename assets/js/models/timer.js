class Timer {
    constructor(ctx) {
        this.ctx = ctx
        this.time = 0
        this.seconds = 0
        this.minutes = 0
        this.setTimer() 
    }

    draw(){
        this.ctx.fillStyle = "#AB4787"
        this.ctx.fillRect(10,10, 200, 60)

        this.ctx.fillStyle = "#FFF"
        this.ctx.font = "40px Arial"
        this.ctx.textAlign = "center"
        this.ctx.fillText(`${this.twoDigitsNumber(this.minutes)}:${this.twoDigitsNumber(this.seconds)}`, 110, 55);
    }

    twoDigitsNumber(number) {
        return number.toString().padStart(2, '0')
    }

    setTimer() {
        this.time = setInterval(() => {
            if (++this.seconds === 60) {
                this.minutes++
                this.seconds = 0
            }
        }, 1000);

    }






}