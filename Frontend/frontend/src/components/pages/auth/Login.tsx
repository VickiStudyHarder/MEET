import React, { useState, useContext } from 'react';
import { AppContext } from '../../../contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  TextField,
  ThemeProvider,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Typography } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import './Login.scss';
import CustomInput from '../../../stories/Input';

const theme = createTheme();

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { authenticate } = useContext(AppContext);

  const onSubmit = (event: any) => {
    console.log('On Submit');
    console.log(email, password);
    event.preventDefault();

    authenticate(email, password)
      .then((data: any) => {
        console.log('Logged In!', data);
        navigate('/home');
      })
      .catch((err: any) => {
        console.error('Failed to login!', err);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <Box className='login-box'>
          {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography> */}
          <Box className='title'>
            <Box className='l'></Box>
            <Box className='r'>
              <Box className='txt-1'>MEET</Box>
              <Box className='txt-2'>is all you need</Box>
            </Box>
          </Box>
          <Box component='form' onSubmit={onSubmit} noValidate>
            <CustomInput
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
            />
            <CustomInput
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
            />
            <Button
              className='tip'
              onClick={() => {
                navigate('/signup');
              }}
            >
              {"Don't have an account? Sign Up"}
            </Button>
            {/* <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                /> */}
            <Button
              className='btn'
              type='submit'
              fullWidth
              variant='contained'
              onClick={onSubmit}
            >
              <span className='text'>Sign In</span>
              <span className='icon'>&gt;</span>
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;
