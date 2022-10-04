import './style/Game.css'
import map from './maps/meadow/meadowMap.png'
import waypoints from './maps/meadow/meadowWaypoints'
import placementTileData from "./maps/meadow/meadowPlacementTile.js"
import { useEffect, useRef } from "react"
import PlacementTile from './classes/PlacementTile'
import Building from "./classes/Building"
import Enemy from "./classes/Enemy"
import Sprite from "./classes/Sprite"
import explosionsPNG from "./img/Tower03impact.png"
import { useLocation } from "react-router-dom"

export default function Game() {
  const location = useLocation()
  let userInfo = location.state.userInfo
  let hearts = userInfo.health
  let coins = userInfo.money

  useEffect(() => {
    const mouse = {
      x: undefined,
      y: undefined
    }
    const enemies = []
    const buildings = []
    let activeTile = undefined
    const explosions = []
    spawnEnemies(3)
  
    function spawnEnemies(spawnCount) {
      for (let i = 1; i < spawnCount + 1; i++) {
        const xOffset = i * 70
        enemies.push(
          new Enemy({
            position: { x: waypoints[0].x - xOffset, y: waypoints[0].y }
          })
        )
      }
    }
    
    window.addEventListener('mousemove', (event) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = event.clientX - rect.left
      mouse.y = event.clientY - rect.top

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

    canvas.addEventListener('click', (event) => {
      if (activeTile && !activeTile.isOccupied && coins - 50 >= 0) {
        coins -= 50
        document.querySelector('#coins').textContent = coins
        buildings.push(new Building({
          position: {
            x: activeTile.position.x,
            y: activeTile.position.y
          }
        }))
        activeTile.isOccupied = true

        //used to sort building to correct position so that they dont overlap
        buildings.sort((a, b) => {
          return a.position.y - b.position.y
        })
      }
    })

    //Animation looop
    function animate() {
      const animationID = requestAnimationFrame(animate)

      //map
      ctx.drawImage(image, 0, 0)

      //animate enemies
      for (let i = enemies.length - 1; i >= 0; i--) {
        const enemy = enemies[i]
        enemy.update(ctx, waypoints)

        //if enemy reaches the end of path
        if (enemy.position.y > canvas.height) {
          hearts -= 1
          enemies.splice(i, 1)
          document.querySelector('#hearts').textContent = hearts

          if (hearts === 0) {
            cancelAnimationFrame(animationID)
            document.querySelector('#gameOver').style.display = 'flex'
          }
        }
      }

      for (let i = explosions.length - 1; i >= 0; i--) {
        const explosion = explosions[i]
        explosion.draw(ctx)
        explosion.update(ctx)

        if (explosion.frames.current >= explosion.frames.max - 1) {
          explosions.splice(i , 1)
        }
      }

      //tracking total enemies
      if (enemies.length === 0) {
        spawnEnemies(5)
      }

      placementTiles.forEach(tile => {
        tile.update(mouse, ctx)
      })

      buildings.forEach(building => {
        building.update(ctx)
        building.target = null

        //only grab enemies that are near the building
        const validEnemies = enemies.filter(enemy => {
          const xDifference = enemy.center.x - building.center.x
          const yDifference = enemy.center.y - building.center.y
          const distance = Math.hypot(xDifference, yDifference)
          return distance < enemy.radius + building.radius
        })
        building.target = validEnemies[0]

        //for loop used to account for bug in forEach function
        for (let i = building.projectiles.length - 1; i >= 0; i--) {
          const projectile = building.projectiles[i]
          projectile.update(ctx)

          const xDifference = projectile.enemy.center.x - projectile.position.x
          const yDifference = projectile.enemy.center.y - projectile.position.y
          const distance = Math.hypot(xDifference, yDifference)

          //if projectile hits an enemy
          if (distance < projectile.enemy.radius + projectile.radius) {
            projectile.enemy.health -= 20
            //if enemy has 0 hp
            if (projectile.enemy.health <= 0) {
              const enemyIndex = enemies.findIndex((enemy) => {
                return projectile.enemy === enemy
              })
              //remove enemy from array and handles bug where it cant find enemy
              if (enemyIndex > -1) {
                enemies.splice(enemyIndex, 1)
                coins += 25
                document.querySelector('#coins').textContent = coins
              }
            }

            //explosions and remove projectile from array
            explosions.push(new Sprite({
              position: { x: projectile.position.x, y: projectile.position.y },
              imageSrc: explosionsPNG,
              frames: { max: 6 },
              offset: { x: -30, y: -25 }
             }))
            building.projectiles.splice(i, 1)
          }
        }
      })
    }

    animate()
    
    return () => {
      window.cancelAnimationFrame(animate)
    }
  }, [])

  return (
    <div style={{ width: "100vw", height: "90vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
    <div style={{ position: "relative", display: "inline-block" }}>
      <canvas />
      <div id="gameOver" style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        display: "none",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "72px",
        color: "white",
        WebkitTextStroke: "3px black"
      }}>GAME OVER</div>

      <div style={{ 
        position: "absolute", 
        top: 0, 
        right: 0, 
        width: "400px", 
        height: "80px", 
        background: "linear-gradient(to left bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)" }}></div>

      <div style={{
        position: "absolute",
        top: "4px",
        right: "8px",
        fontSize: "36px",
        color: "white",
        display: "flex",
        alignItems: "center"
      }}>

        {/* coins */}
        <div style={{ display: "flex", alignItem: "center", marginRight: "20px" }}>
          <svg style={{ width: "25px", color: "gold", marginRight: "5px" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
            <path d="M512 80c0 18-14.3 34.6-38.4 48c-29.1 16.1-72.5 27.5-122.3 
          30.9c-3.7-1.8-7.4-3.5-11.3-5C300.6 137.4 248.2 128 192 128c-8.3 0-16.4 
          .2-24.5 .6l-1.1-.6C142.3 114.6 128 98 128 80c0-44.2 86-80 192-80S512 
          35.8 512 80zM160.7 161.1c10.2-.7 20.7-1.1 31.3-1.1c62.2 0 117.4 12.3 152.5 
          31.4C369.3 204.9 384 221.7 384 240c0 4-.7 7.9-2.1 11.7c-4.6 13.2-17 25.3-35 
          35.5c0 0 0 0 0 0c-.1 .1-.3 .1-.4 .2l0 0 0 0c-.3 .2-.6 .3-.9 .5c-35 19.4-90.8 
          32-153.6 32c-59.6 0-112.9-11.3-148.2-29.1c-1.9-.9-3.7-1.9-5.5-2.9C14.3 274.6 
          0 258 0 240c0-34.8 53.4-64.5 128-75.4c10.5-1.5 21.4-2.7 32.7-3.5zM416 
          240c0-21.9-10.6-39.9-24.1-53.4c28.3-4.4 54.2-11.4 76.2-20.5c16.3-6.8 31.5-15.2
           43.9-25.5V176c0 19.3-16.5 37.1-43.8 50.9c-14.6 7.4-32.4 13.7-52.4 18.5c.1-1.8 
           .2-3.5 .2-5.3zm-32 96c0 18-14.3 34.6-38.4 48c-1.8 1-3.6 1.9-5.5 2.9C304.9 404.7 
           251.6 416 192 416c-62.8 0-118.6-12.6-153.6-32C14.3 370.6 0 354 0 336V300.6c12.5 
           10.3 27.6 18.7 43.9 25.5C83.4 342.6 135.8 352 192 352s108.6-9.4 148.1-25.9c7.8-3.2 
           15.3-6.9 22.4-10.9c6.1-3.4 11.8-7.2 17.2-11.2c1.5-1.1 2.9-2.3 4.3-3.4V304v5.7V336zm32
            0V304 278.1c19-4.2 36.5-9.5 52.1-16c16.3-6.8 31.5-15.2 43.9-25.5V272c0 10.5-5 21-14.9
             30.9c-16.3 16.3-45 29.7-81.3 38.4c.1-1.7 .2-3.5 .2-5.3zM192 448c56.2 0 108.6-9.4
              148.1-25.9c16.3-6.8 31.5-15.2 43.9-25.5V432c0 44.2-86 80-192 80S0 476.2 0
               432V396.6c12.5 10.3 27.6 18.7 43.9 25.5C83.4 438.6 135.8 448 192 448z"/></svg>
          <div id="coins">{coins}</div>
        </div>

        {/* hearts */}
        <div style={{ display: "flex", alignItem: "center" }}>
          <svg style={{ width: "35px", color: "red", marginRight: "5px" }}
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6">
            <path strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
          <div id="hearts">{hearts}</div>
        </div>
      </div>
    </div>
    </div>
  )
}