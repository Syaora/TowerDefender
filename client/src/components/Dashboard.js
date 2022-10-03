import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom"

export default function Dashboard({ currentUser, updateUser }){
  const navigate = useNavigate()

  function handleLogOut() {
    fetch(`/logout`, {
      method: "DELETE"
    })

    updateUser("")
  }

  return (
    <>
      <ul>
        <li>{currentUser.username}</li>
        { currentUser ? <li><Button onClick={handleLogOut}>Logout</Button></li> : null }
        <li><Button onClick={() => navigate("/login")}></Button></li>
      </ul>
    </>
  )
}