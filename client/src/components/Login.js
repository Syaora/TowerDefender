import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from '../context/user';
import ErrorMessage from './ErrorMessage';

export default function Login() {
  const { user, setUser } = useContext(UserContext)

  const [errors, setErrors] = useState([])
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })

  const navigate = useNavigate()
  const { username, password } = formData

  function onSubmit(event) {
    event.preventDefault();
    const loginUser = {
      username,
      password
    }

    fetch(`/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(loginUser)
    }).then(res => {
      if (res.ok) {
        res.json().then(loginUser => {
          setUser(loginUser)
          localStorage.setItem("user", JSON.stringify(loginUser))
          navigate(`/dashboard`)
        })
      } else {
        res.json().then(json => setErrors(Object.entries(json.errors)))
      }
    })
  }

  useEffect(() => {
    if (user) navigate("/dashboard")
  }, [])


  function handleChange(e) {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  return (
    <>
      <Container component="main" maxWidth="xs">
        {errors.length > 0 ? <ErrorMessage errors={errors} /> : null}
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
            Login
          </Typography>
          <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
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
              name="password"
              label="Password"
              type="password"
              value={password}
              onChange={handleChange}
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
            <Grid justifyContent="center" container>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}