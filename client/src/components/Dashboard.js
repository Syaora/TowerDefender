import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom"
import { UserContext } from "../context/user"
import { useContext } from "react"

export default function Dashboard(){
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()

  return (
    <>
      <ul>
        <li>{ user ? user.username : null }</li>
      </ul>
    </>
  )
}