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

    this.g = 0.4

    this.jumping = false

    this.img = new Image()
    this.img.drawCount = 0
    this.img.frames = 9
    this.img.frameIndex = 0
    this.img.heightIndex = 0
    this.img.src = "./assets/img/girlsprite.png"

    this.followinBlock = null

  }

  onKeyEvent(event) {
    if (event.type === 'keydown') {
      switch (event.keyCode) {
        case KEY_RIGHT:
          if (this.x < this.ctx.canvas.width - this.w) {
            this.vx = 4
            this.img.heightIndex = 0
          } else {
            this.vx = 0
          } 
          break;
        case KEY_LEFT:
          if (this.x >= 0) {
            this.vx = -4
            this.img.heightIndex = this.img.height / 2
          } else {
            this.vx = 0
          }
          break;
        case KEY_UP:
          if(!this.isJumping()) {
            this.followingBlock = undefined
            this.vy = -12
          }
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
      }
    }
  }

  isJumping() {
    return this.y < this.y0
  }

  collidesWithBlock(block){
    return (this.y + this.h >= block.y &&
      this.y + this.h <= block.y + block.h &&
      this.x + this.w >= block.x &&
      this.x <= block.x + block.w &&
      this.y < block.y) 
  }
  
  follow(block) {
    this.followingBlock = block
    this.y = block.y - this.h
    this.y0 = this.y
    this.vy = 0
    if (this.x >= this.ctx.canvas.width) {
         this.x = -this.w
    }
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
      this.img.heightIndex, 
      this.img.width / this.img.frames,
      this.img.height/2,
      this.x,
      this.y,
      this.w,
      this.h
    )

  }

  move() {
    if (this.isJumping()) {
      this.vy += this.g

    }    
    
    this.x += this.vx
    this.y += this.vy   
  
    if (!this.isJumping()) {
      this.vy = 0
      this.y = this.y0
    }  
    
    if (this.followingBlock) {
      if (this.vx === 0) {
        this.x += this.followingBlock.vx
      }
    }
  }

  animate() {
   if ((this.vx !== 0 || this.vy !== 0) && !this.isJumping()) { 
      this.img.frameIndex++
      if (this.img.frameIndex >= this.img.frames) {
        this.img.frameIndex = 1
      }
    } else { 
        this.img.frameIndex = 0
      }
    }

  }

