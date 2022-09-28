import './style/Game.css'
import meadowMap from './img/meadowMap.png'
import meadowWaypoints from './waypoints/meadowWaypoints'
import { useEffect, useRef } from "react"

export default function Game(){
  // const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = document.querySelector('canvas')
    const ctx = canvas.getContext('2d')

    canvas.width = 1280
    canvas.height = 768

    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const image = new Image()
    image.onload = () => {
      ctx.drawImage(image, 0, 0)
    }
    image.src = meadowMap
  }, [])

  return (
    <>
      <canvas />
    </>
  )
}