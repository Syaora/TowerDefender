import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom"
import { UserContext } from "../context/user"
import { useContext } from "react"

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CardActions from '@mui/material/CardActions';
import { CardMedia } from "@mui/material";
import map from "./maps/meadow/meadowMap.png"

export default function Dashboard(){
  const { user } = useContext(UserContext)
  const img = map
  const navigate = useNavigate()

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
            <Button variant="contained">Start a New Game</Button>
          </Grid>
        </div>
        <Grid container spacing={4} >
          {/* {userGames.map((game) => ( */}
            <Grid item xs={12} sm={6} md={4}>
              <Card
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
                    game name
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Play</Button>
                  <Button size="small">Delete</Button>
                </CardActions>
              </Card>
            </Grid>
          {/* ))} */}
        </Grid>
      </Container>
    </>
  )
}