import Sprite from "./Sprite"
import image from "./../img/Tower03projectile.png"

export default class Projectile extends Sprite {
  constructor({ position = { x: 0, y: 0 }, enemy }) {
    super({ position, imageSrc: image, frames: {
      max: 6
    } })
    this.velocity = {
      x: 0,
      y: 0
    }
    this.enemy = enemy
    this.radius = 10
  }

  update(ctx) {
    this.draw(ctx)
    const angle = Math.atan2(
      this.enemy.center.y - this.position.y,
      this.enemy.center.x - this.position.x)

    const power = 4
    this.velocity.x = Math.cos(angle) * power
    this.velocity.y = Math.sin(angle) * power

    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
  }
}