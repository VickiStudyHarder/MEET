import React, {useState, useContext} from 'react';
import { AccountContext } from '../../../contexts/Account'
import { useNavigate } from 'react-router-dom';
import { Avatar, Box, Button, Checkbox, Container, CssBaseline, FormControlLabel, Grid, TextField, ThemeProvider } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Typography } from '@material-ui/core';
import { createTheme } from '@mui/material/styles'

const theme = createTheme();

const SignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const { authenticate } = useContext(AccountContext)

    const onSubmit = (event:any) => {
        console.log("On Submit")
        console.log(email, password)
        event.preventDefault();

          authenticate(email, password)
          .then((data:any) => {
            console.log("Logged In!", data);
            navigate('/Home')
          })
          .catch((err:any) => {
            console.error('Failed to login!', err)
          })
    };

    return (
        <ThemeProvider theme={theme}>
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
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e: any) => setEmail(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e: any) => setPassword(e.target.value)}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  onClick={onSubmit}
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container justifyContent="center">
                  <Grid justifyContent="center">
                    <Button onClick={() => {navigate('/signup')}}>
                      {"Don't have an account? Sign Up"}
                    </Button>
                </Grid>
              </Grid>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      );
}

export default SignUp;