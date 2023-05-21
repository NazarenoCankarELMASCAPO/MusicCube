class Cube {
    constructor(x, y, w, h, color = "rgb(255,255,255)", v = { x: 1, y: 1}, note = "./src/sounds/c.wav") {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.color = color;

      this.v = v

      this.note = note
    }
  
    draw(ctx, offsetX, offsetY) {
      ctx.fillStyle = "rgb(0,0,0)"
      ctx.lineWidth = 2;
      ctx.strokeRect(this.x + offsetX, this.y + offsetY, this.w, this.h);
      ctx.fillStyle = this.color
      ctx.fillRect(this.x + offsetX, this.y + offsetY, this.w, this.h);
    }

    update(ctx, offsetX, offsetY, started) {
        this.draw(ctx, -offsetX, -offsetY)

        if(!started) return
        
        this.x += this.v.x
        this.y += this.v.y
    }
  }
  