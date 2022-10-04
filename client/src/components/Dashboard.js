import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom"
import { UserContext } from "../context/user"
import { useContext, useEffect, useState } from "react"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CardActions from '@mui/material/CardActions';
import { CardMedia } from "@mui/material";
import map from "./maps/meadow/meadowMap.png"
import NewGameModal from './NewGameModal';

export default function Dashboard() {
  const { user } = useContext(UserContext)
  const [userGames, setUserGames] = useState([])
  const [ notFound, setNotFound ] = useState(false)
  const [open, setOpen] = useState(false)
  const img = map
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      fetch("/usergames")
        .then(res => {
          if (res.ok) {
            res.json().then((games) => {
              setUserGames(games)
            })
          } else {
            setNotFound(true)
          }
        })
    } else {
      navigate("/")
    }
  }, [])

  function onClose() {
    setOpen(false)
  }

  function handleNewGame(name) {
    console.log(name)
    console.log(user.id)
    fetch("/user_games", {
      method: "POST",
      header: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: user.id,
        game_id: 1,
        name: name
      })
    }).then(res => {
      if (res.ok) {
        res.json().then(game => console.log(game))
      } else {
        console.log(res)
      }
    })
  }

  return (
    <>
      <Container sx={{ py: 8 }} maxWidth="md">
        <div style={{ padding: 20 }}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Button onClick={() => setOpen(true)} variant="contained">Start a New Game</Button>
          </Grid>
        </div>
        { notFound ? <div>No Games Found</div> : null }
        <Grid container spacing={4} >
          {userGames.map((game) => (
            <Grid item xs={12} sm={6} md={4}>
              <Card
                key={game.id}
                sx={{ height: '65%', display: 'flex', flexDirection: 'column' }}
              >
                <CardMedia
                  component="img"
                  height="300"
                  sx={{
                    objectFit: "contain"
                  }}
                  image={img}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {game.name}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Play</Button>
                  <Button size="small">Delete</Button>
                </CardActions>
              </Card>
              <NewGameModal open={open} onClose={onClose} handleNewGame={handleNewGame} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  )
}