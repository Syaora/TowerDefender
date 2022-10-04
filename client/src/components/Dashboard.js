import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom"
import { UserContext } from "../context/user"
import { useContext } from "react"

export default function Dashboard(){
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()

  function handleLogOut() {
    fetch(`/logout`, {
      method: "DELETE"
    })
    setUser(null)
    navigate("/login")
  }

  return (
    <>
      <ul>
        <li>{user.username}</li>
        { user ? <li><Button onClick={handleLogOut}>Logout</Button></li> : null }
        <li><Button onClick={() => navigate("/login")}></Button></li>
      </ul>
    </>
  )
}