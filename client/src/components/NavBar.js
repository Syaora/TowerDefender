import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useNavigate } from "react-router-dom"
import { UserContext } from '../context/user';
import { useContext } from "react"
import Box from '@mui/material/Box';

export default function NavBar() {
  const navigate = useNavigate()
  const { user, setUser } = useContext(UserContext)

  function handleLogOut() {
    fetch(`/logout`, {
      method: "DELETE"
    })
    setUser(null)
    navigate("/login")
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography component={Link} to="/" sx={{ textDecoration: "none", boxShadow: "none" }} variant="h6" color="inherit">
            TowerDefender
          </Typography>
        </Box>
        {user ? <Button onClick={() => navigate("/dashboard")} color="inherit">Dashboard</Button> : null}
        {user ? <Button onClick={() => handleLogOut} color="inherit">Logout</Button> : null}
      </Toolbar>
    </AppBar>
  )
}