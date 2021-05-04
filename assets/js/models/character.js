class Character {
  constructor(ctx) {
    this.ctx = ctx;

    this.h = 81
    this.w = 55

    this.x = 0
    this.y = 575
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

    this.followingBlock = null

  }

  onKeyEvent(event) {
    if (event.type === 'keydown') {
      switch (event.keyCode) {
        case KEY_RIGHT:
          if (this.x < this.ctx.canvas.width - this.w) {
            this.vx = 5
            this.img.heightIndex = 0
          } else {
            this.vx = 0
          } 
/*           if (this.followingBlock) {
            if (this.x > block.x + block.w){
              this.vy = 2
              this.y += this.vy */
          
          break;
        case KEY_LEFT:
          if (this.x >= 0) {
            this.vx = -5
            this.img.heightIndex = this.img.height / 2
          } else {
            this.vx = 0
          }
/*           if (this.followingBlock) {
            if (this.x + this.w < block.x){
              this.vy = 2
              this.y += this.vy */
          
          break;
        case KEY_UP:
          if(!this.isJumping()) {
            this.followingBlock = undefined
            this.y0 = 575
            this.vy = -9
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

  isFalling() {
    const falling = this.vy > 10 && this.y < 499
    return falling
  }

  collidesWithBlock(block){
    const collide =  (this.y + this.h >= block.y &&
      this.y + this.h <= block.y + block.h &&
      this.x + this.w >= block.x &&
      this.x <= block.x + block.w &&
      this.y < block.y) 

      return collide
  }
  
  collidesWithCastle(castle){
    const collide =  (this.y + this.h <= castle.y + castle.h &&
      this.y + this.h >= castle.y &&
      this.x + this.w >= castle.x &&
      this.x <= castle.x + castle.w
      ) 

      return collide
  }

  follow(block) {
      this.followingBlock = block
      this.y = block.y - this.h
      this.y0 = this.y
      this.vy = 0
  
  
/*     if (this.x + this.w < block.x || this.x > block.x + block.w){
        this.vy = 2
        
/*     if (this.x >= this.ctx.canvas.width) { //cuando tenga todo arreglado volveré a intentar que de la vuelta a la montaña
         this.x = -this.w
    } */
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

