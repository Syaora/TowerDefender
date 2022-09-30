import React from "react"
import test from "./../img/Tower03projectile.png"

export default class Sprite extends React.Component {
  constructor({ position = { x: 0, y: 0 }, frames = { max: 1}}) {
    super({ position })
    this.position = position
    this.image = new Image()
    this.image.src = test
    this.frames = {
      max: frames.max,
      current: 0,
      elapsed: 0,
      hold: 3
    }
  }

  draw(ctx) {
    const cropWidth = this.image.width / this.frames.max //used to get specific sprite
    const crop = {
      position: {
        x: cropWidth * this.frames.current,
        y: 0
      },
      width: cropWidth,
      height: this.image.height
    }
    ctx.drawImage(
      this.image, 
      crop.position.x, 
      crop.position.y, 
      crop.width, 
      crop.height,
      this.position.x,
      this.position.y,
      crop.width,
      crop.height)

    //responsible for animation
    this.frames.elapsed++
    if (this.frames.elapsed % this.frames.hold === 0) { //frame rate
      this.frames.current++
      if (this.frames.current >= this.frames.max - 1) {
        this.frames.current = 0
      }
    }
  }
}