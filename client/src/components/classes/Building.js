export default class Building {
  constructor({ position = { x: 0, y: 0 }}) {
    this.position = position
  }

  draw(ctx) {
    ctx.fillStyle = 'blue'
    ctx.fillRect(this.position.x, this.position.y, 64, 64)
  }
}