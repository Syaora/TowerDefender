import './style/Game.css'
import map from './img/meadowMap.png'
import waypoints from './waypoints/meadowWaypoints.js'
import { useEffect, useRef } from "react"

export default function Game() {
  // const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = document.querySelector('canvas')
    const ctx = canvas.getContext('2d')

    canvas.width = 1280
    canvas.height = 768

    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const image = new Image()
    image.src = map

    class Enemy {
      constructor({position = { x: 0, y: 0 }}) {
        this.position = position
        this.width = 100
        this.height = 100
      }

      draw() {
        ctx.fillStyle = 'red'
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
      }

      update() {
        this.draw()

        const waypoint = waypoints[0]
        const yDistance = waypoint.y - this.position.y
        const xDistance = waypoint.x - this.position.x
        const angle = Math.atan2(yDistance, xDistance)

        this.position.x += Math.cos(angle)
        this.position.y += Math.sin(angle)
      }
    }

    const enemy = new Enemy({position: {x: 200, y:400}})
    const enemy2 = new Enemy({position: {x: 0, y:400}})

    //Animation looop
    function animate() {
      requestAnimationFrame(animate)

      //map
      ctx.drawImage(image, 0, 0)
      enemy.update()
      enemy2.update()
    }

    animate()
  }, [])

  return (
    <>
      <canvas />
    </>
  )
}