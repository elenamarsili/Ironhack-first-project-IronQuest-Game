class Character {
  constructor(ctx) {
    this.ctx = ctx;

    this.h = 81
    this.w = 55

    this.x = 0
    this.y = 335
    this.y0 = this.y

    this.vx = 0
    this.vy = 0

    this.ay = 0

    this.g = 0

    /*  this.isJumping = false */

    this.img = new Image()
    this.img.drawCount = 0
    this.img.frames = 9
    this.img.frameIndex = 0
    this.img.src = "./assets/img/girlsprite.png"

  }

  onKeyEvent(event) {
    if (event.type === 'keydown') {
      switch (event.keyCode) {
        case KEY_RIGHT:
          if (this.x < this.ctx.canvas.width - this.w) {
            this.vx = 2
          } else {
            this.vx = 0
          } 
          break;
        case KEY_LEFT:
          if (this.x >= 0) {
            this.vx = -2
          } else {
            this.vx = 0
          }
          break;
        case KEY_UP:
          this.vy = -2;
          this.ay = -2;
          this.g = 0.4;
          break;
      }
    } else {
      switch (event.keyCode) {
        case KEY_RIGHT:
          this.vx = 0
          break;
        case KEY_LEFT:
          this.vx = 0
          break;
        case KEY_UP:
          this.vy = 0
          this.ay = 0;
          this.g = 0;
          break;
      }
    }
  }

  isJumping() {
    /* return this.y < this.y0 */
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

  move() {
    this.x += this.vx
    this.y += this.vy
    this.vy += this.ay
    this.vy += this.g    
    
    
        /* if (this.isJumping()) {
            this.vy += this.g
        }

        if (!this.isJumping()) {
            this.vy = 0
            this.y = this.y0
        }   

        this.bullets.forEach(b => b.move())   */
  }

  animate() {
   if (this.vx !== 0 || this.vy !== 0) { 
      this.img.frameIndex++
      if (this.img.frameIndex >= this.img.frames) {
        this.img.frameIndex = 1
      }
    } else if (this.vx === 0 && this.vy === 0) { 
        this.img.frameIndex = 0
      }
    }

  }

