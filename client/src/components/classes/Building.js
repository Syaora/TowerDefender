import Projectile from "./Projectile"
import Sprite from "./Sprite"
import buildingImg from "./../img/Tower03.png"
import weaponImg from "./../img/Tower03weapon.png"

export default class Building extends Sprite {
  constructor({ position = { x: 0, y: 0 } }) {
    //creates the weapon for building
    super({
      position,
      imageSrc: weaponImg,
      offset: {
        x: -15,
        y: -55
      },
      frames: {
        max: 8
      }
    })
    this.width = 64
    this.height = 64
    this.center = {
      x: this.position.x + this.width / 2,
      y: this.position.y + this.height / 2
    }
    //handles attack range
    this.projectiles = []
    this.target = null
    this.radius = 150

    //handles building base
    this.building = new Sprite({
      position,
      imageSrc: buildingImg,
      offset: {
        x: 0,
        y: -65
      }
    })
  }

  draw(ctx) {
    this.building.draw(ctx)
    super.draw(ctx)

    //shooting range area
    // ctx.beginPath()
    // ctx.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2)
    // ctx.fillStyle = 'rgba(0, 0, 255, 0.2)'
    // ctx.fill()
  }

  update(ctx) {
    this.draw(ctx)

    if (this.target || (!this.target && this.frames.current !== 0)) super.update(ctx)

    if (this.target &&
      this.frames.current === 5 &&
      this.frames.elapsed % this.frames.hold === 0) this.shoot(ctx)
  }

  shoot(ctx) {
    this.projectiles.push(
      new Projectile({
        position: {
          x: this.center.x - 4,
          y: this.center.y - 65
        },
        enemy: this.target
      })
    )
  }
}