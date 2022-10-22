import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom"
import { UserContext } from "../context/user"
import { useContext, useState, useEffect } from "react"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CardActions from '@mui/material/CardActions';
import { CardMedia } from "@mui/material";
import map from "./maps/meadowMap.png"
import NewGameModal from './NewGameModal';
import ErrorMessage from './ErrorMessage';

export default function Dashboard() {
  const { user } = useContext(UserContext)

  const [userGames, setUserGames] = useState([])
  const [open, setOpen] = useState(false)
  const [errors, setErrors] = useState([])

  const img = map
  const navigate = useNavigate()

  useEffect(() => {
    fetch("/usergames")
      .then(res => {
        if (res.ok) {
          res.json().then((games) => {
            setUserGames(games)
          })
        }
      })
  }, [])

  function onClose() {
    setOpen(false)
  }

  function handleNewGame(name) {
    fetch(`/user_games`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: user.id,
        name: name
      })
    }).then(res => {
      if (res.ok) {
        res.json().then(game => {
          //Pass usergame.id to game
          navigate("/game", { state: { userInfo: game } })
        })
      } else {
        res.json().then(json => setErrors(Object.entries(json.errors)))
      }
    })
  }

  function onDeleteGame(id) {
    fetch(`/user_games/${id}`, {
      method: "DELETE"
    }).then(res => {
      let newGames = userGames.filter((currentGames) => currentGames.id !== id)
      setUserGames(newGames)
    })
  }

  return (
    <>
      <Container sx={{ py: 8 }} maxWidth="md">
        {errors.length > 0 ? <ErrorMessage errors={errors} /> : null}
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
        <Grid container spacing={4} >
          {userGames.map((game) => (
            <Grid item xs={12} sm={6} md={4} key={game.id}>
              <Card
                sx={{ height: "280px", display: 'flex', flexDirection: 'column' }}
              >
                <CardMedia
                  component="img"
                  height="160"
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
                  <Button onClick={() => navigate("/game", { state: { userInfo: game } })} size="small">Play</Button>
                  <Button onClick={() => onDeleteGame(game.id)} size="small">Delete</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
          <NewGameModal open={open} onClose={onClose} handleNewGame={handleNewGame} />
        </Grid>
      </Container>
    </>
  )
}
