import React, {useState} from 'react';
import { withStyles } from "@material-ui/core/styles";
import {TextField, Button, Stack, Alert, AlertTitle, Grid, Box, Paper, Avatar, Checkbox, FormControlLabel, Link} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Typography from '@mui/material/Typography';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import UserPool from '../../../utils/auth/UserPool';
import { useNavigate } from 'react-router-dom';

interface ISignUpForm {
    emailValue?: string;
    passwordValue?: string;
    incrementStage: () => void;
}

const SignUpForm : React.FC<ISignUpForm> = ({emailValue="", passwordValue="", incrementStage}) => {
    const [email, setEmail] = useState(emailValue)
    const [password, setPassword] = useState(passwordValue)
    const [error, setError] = useState("")
    const navigate = useNavigate()
    
    const onSubmit = (event:any) => {
        event.preventDefault();

        UserPool.signUp(email, password, [], [], (err:any, data:any) => {
          if (err) {
            setError(err.message)
            return;
          }
          setError("")
          navigate('/login')
        });
    };

    return (
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
            sx={{
              my: 8,
              mx: 4,
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
            <Box component="form" noValidate onSubmit={incrementStage} sx={{ mt: 1 }}>
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
              <Button
                type="submit"
                fullWidth
                variant="contained" 
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="center">
                <Grid justifyContent="center">
                  <Link href="#" variant="body2" >
                    {"Already have an account? Sign In"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
    )
}

export default SignUpForm;
