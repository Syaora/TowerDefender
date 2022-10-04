import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from '../context/user';

export default function SignIn() {
  const { user, setUser } = useContext(UserContext)
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const navigate = useNavigate()
  const { username, password } = formData

  function handleChange(e) {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  function onSubmit(e) {
    e.preventDefault();
    const defaultUser = {
      username,
      password
    }
    fetch(`/users`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(defaultUser)
    }).then(res => {
      if (res.ok) {
        res.json().then(defaultUser => {
          setUser(defaultUser)
          navigate(`/dashboard`)
        })
      } else {
        console.log("error sign up")
      }
    })
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box component="form" onSubmit={onSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Username"
              name="username"
              value={username}
              autoComplete="username"
              onChange={handleChange}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              value={password}
              name="password"
              label="Password"
              type="password"
              onChange={handleChange}
            />
            {/* <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
            <Grid justifyContent="center" container>
              <Grid item>
                <Link href="/login" variant="body2">
                  {"Have an account? Login"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}