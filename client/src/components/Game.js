import './style/Game.css'
import map from './maps/meadow/meadowMap.png'
import waypoints from './maps/meadow/meadowWaypoints'
import placementTileData from "./maps/meadow/meadowPlacementTile.js"
import { useEffect, useRef } from "react"
import PlacementTile from './classes/PlacementTile'
import Building from "./classes/Building"
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

      for (let i = 0; i < placementTiles.length; i++) {
        const tile = placementTiles[i]

        activeTile = null
        if (mouse.x > tile.position.x &&
          mouse.x < tile.position.x + tile.size &&
          mouse.y > tile.position.y &&
          mouse.y < tile.position.y + tile.size) {
          activeTile = tile
          break
        }

      }
    })

    const canvas = document.querySelector('canvas')
    const ctx = canvas.getContext('2d')

    canvas.width = 1280
    canvas.height = 768

    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const placementTileData2D = []

    for (let i = 0; i < placementTileData.length; i += 20) {
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

    canvas.addEventListener('click', (event) => {
      if (activeTile && !activeTile.isOccupied) {
        buildings.push(new Building({
          position: {
            x: activeTile.position.x,
            y: activeTile.position.y
          }
        }))
        activeTile.isOccupied = true
      }
    })

    const buildings = []
    let activeTile = undefined

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

      buildings.forEach(building => {
        building.draw(ctx)
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