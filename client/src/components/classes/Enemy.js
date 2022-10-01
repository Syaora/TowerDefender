import Sprite from "./Sprite"
import firebug from "./../img/Firebug.png"

export default class Enemy extends Sprite {
  constructor({position = { x: 0, y: 0 }}) {
    super({ 
      position, 
      imageSrc: firebug, 
      frames: {
        max: 8
      },
      offset: {
        x: -35,
        y: -10
      }
    })
    this.width = 50
    this.height = 50
    this.waypointIndex = 0
    this.center = {
      x: this.position.x + this.width / 2,
      y: this.position.y + this.height / 2
    }
    this.radius = 25 //use to check collision
    this.health = 100
    this.velocity = {
      x: 0,
      y: 0
    }
  }

  draw(ctx) {
    super.draw(ctx)

    //health bar
    ctx.fillStyle = 'red'
    ctx.fillRect(this.position.x, this.position.y - 15, this.width, 10)

    ctx.fillStyle = 'green'
    ctx.fillRect(this.position.x, this.position.y - 15, this.width * this.health / 100, 10)
  }

  //Function for enemies going on a path
  update(ctx, waypoints) {
    this.draw(ctx)
    super.update(ctx)

    const waypoint = waypoints[this.waypointIndex]
    const yDistance = waypoint.y - this.center.y
    const xDistance = waypoint.x - this.center.x
    const angle = Math.atan2(yDistance, xDistance)

    const speed = 2

    this.velocity.x = Math.cos(angle) * speed
    this.velocity.y = Math.sin(angle) * speed

    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    this.center = {
      x: this.position.x + this.width / 2,
      y: this.position.y + this.height / 2
    }

    if (
      Math.abs(Math.round(this.center.x) - Math.round(waypoint.x)) < Math.abs(this.velocity.x) && 
      Math.abs(Math.round(this.center.y) - Math.round(waypoint.y)) < Math.abs(this.velocity.y) &&
      this.waypointIndex < waypoints.length - 1
      ) {
      this.waypointIndex++
    }
  }
}