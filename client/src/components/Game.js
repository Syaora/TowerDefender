import './style/Game.css'
import map from './maps/meadow/meadowMap.png'
import waypoints from './maps/meadow/meadowWaypoints'
import placementTileData from "./maps/meadow/meadowPlacementTile.js"
import { useEffect } from "react"
export default function Game() {
  // const canvasRef = useRef(null)

  useEffect(() => {
    const mouse = {
      x: undefined, 
      y: undefined
    }
  
    window.addEventListener('mousemove', (event) => {
      mouse.x = event.clientX
      mouse.y = event.clientY
    })
    
    const canvas = document.querySelector('canvas')
    const ctx = canvas.getContext('2d')

    canvas.width = 1280
    canvas.height = 768

    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const placementTileData2D = []

    for (let i = 0; i < placementTileData.length; i += 20){
      placementTileData2D.push(placementTileData.slice(i, i + 20))
    }

    class PlacementTile {
      constructor({ position = { x: 0, y:0 }}){
        this.position = position
        this.size = 64
        this.color = 'rgba(255, 255, 255, 0.1)'
      }

      draw() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.position.x, this.position.y, this.size, this.size)
      }

      update(mouse) {
        this.draw()
        
        if (mouse.x > this.position.x &&
           mouse.x < this.position.x + this.size && 
           mouse.y > this.position.y && 
           mouse.y < this.position.y + this.size) {
            console.log("colliding")
          }
      }
    }

    const placementTiles = []

    placementTileData2D.forEach((row, y) => {
      row.forEach((symbol, x) => {
        if (symbol === 170) {
          //add building placement tile here
          placementTiles.push(
            new PlacementTile({
              position: {
                x: x * 64,
                y: y * 64
              }
            })
          )
        }
      })
    })

    const image = new Image()
    image.src = map

    class Enemy {
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

      draw() {
        ctx.fillStyle = 'red'
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
      }

      //Function for enemies going on a path
      update() {
        this.draw()

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

    const enemies = []
    for (let i = 1; i < 10; i++) {
      const xOffset = i * 70
      enemies.push(
        new Enemy({
          position: { x: waypoints[0].x - xOffset, y: waypoints[0].y }
        })
      )
    }

    //Animation looop
    function animate() {
      requestAnimationFrame(animate)

      //map
      ctx.drawImage(image, 0, 0)
      enemies.forEach(enemy => {
        enemy.update()
      })

      placementTiles.forEach(tile => {
        tile.update(mouse)
      })
    }

    animate()
  }, [])

  return (
    <>
      <canvas />
    </>
  )
}