import Projectile from "./Projectile"
import Sprite from "./Sprite"

export default class Building {
  constructor({ position = { x: 0, y: 0 } }) {
    this.position = position
    this.width = 64
    this.height = 64
    this.center = {
      x: this.position.x + this.width / 2,
      y: this.position.y + this.height / 2
    }
    this.projectiles = []
    this.target = null
    this.radius = 150
    this.frames = 0
  }

  draw(ctx) {
    ctx.fillStyle = 'blue'
    ctx.fillRect(this.position.x, this.position.y, 64, 64)

    ctx.beginPath()
    ctx.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(0, 0, 255, 0.2)'
    ctx.fill()
  }

  update(ctx) {
    this.draw(ctx)

    if (this.frames % 100 === 0 && this.target) {
      this.projectiles.push(new Projectile({
        position: {
          x: this.center.x,
          y: this.center.y
        },
        enemy: this.target
      })
      )
    }
    this.frames++
  }
}