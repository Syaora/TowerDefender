import './style/Game.css'
import map from './maps/meadow/meadowMap.png'
import waypoints from './maps/meadow/meadowWaypoints'
import placementTileData from "./maps/meadow/meadowPlacementTile.js"
import { useEffect, useRef } from "react"
import PlacementTile from './classes/PlacementTile'
import Enemy from "./classes/Enemy"

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
        enemy.update(ctx, waypoints)
      })

      placementTiles.forEach(tile => {
        tile.update(mouse, ctx)
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