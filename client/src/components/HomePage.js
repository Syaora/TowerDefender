import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Stack from '@mui/material/Stack';
import { Link } from "react-router-dom"

export default function HomePage() {
  return (
    <Stack
    sx={{ pt: 4 }}
    direction="row"
    spacing={2}
    justifyContent="center"
  >
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea component={Link} to="/login">
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Login
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea component={Link} to="/signup">
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Sign Up
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  </Stack>
  )
}