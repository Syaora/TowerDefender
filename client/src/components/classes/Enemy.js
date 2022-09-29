export default class Enemy {
  constructor({position = { x: 0, y: 0 }}) {
    this.position = position
    this.width = 50
    this.height = 50
    this.waypointIndex = 0
    this.center = {
      x: this.position.x + this.width / 2,
      y: this.position.y + this.height / 2
    }
  }

  draw(ctx) {
    ctx.fillStyle = 'red'
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
  }

  //Function for enemies going on a path
  update(ctx, waypoints) {
    this.draw(ctx)

    const waypoint = waypoints[this.waypointIndex]
    const yDistance = waypoint.y - this.center.y
    const xDistance = waypoint.x - this.center.x
    const angle = Math.atan2(yDistance, xDistance)

    this.position.x += Math.cos(angle)
    this.position.y += Math.sin(angle)

    this.center = {
      x: this.position.x + this.width / 2,
      y: this.position.y + this.height / 2
    }

    if (
      Math.round(this.center.x) === Math.round(waypoint.x) && 
      Math.round(this.center.y) === Math.round(waypoint.y) &&
      this.waypointIndex < waypoints.length - 1
      ) {
      this.waypointIndex++
    }
  }
}