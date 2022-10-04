import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useNavigate } from "react-router-dom"

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <>
      <main>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Tower Defender
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Get ready to play a 2D tower defense game designed to give you
              hours and hours of gameplay.  Build awesome towers and defend from
              every invading enemies!
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button onClick={() => navigate("/login")} variant="contained">Log In</Button>
              <Button onClick={() => navigate("/register")} variant="outlined">Sign Up</Button>
            </Stack>
          </Container>
        </Box>
      </main>
    </>
  )
}