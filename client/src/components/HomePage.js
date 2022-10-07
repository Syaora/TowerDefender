import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

export default function HomePage() {
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
          </Container>
        </Box>
      </main>
    </>
  )
}