import React, { useContext } from 'react';
import { TextField, Button, Grid, Box, Paper, Avatar } from '@mui/material';
import Typography from '@mui/material/Typography';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/Auth';

interface IGetStarted {
  incrementStage: () => void;
}

const GetStarted: React.FC<IGetStarted> = ({ incrementStage }) => {
  const { email, setEmail, password, setPassword } = useContext(AuthContext);

  const navigate = useNavigate();

  return (
    <Grid
      item
      xs={12}
      sm={8}
      md={5}
      component={Paper}
      elevation={6}
      square
      alignItems='flex-end'
    >
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
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <Box
          component='form'
          noValidate
          onSubmit={incrementStage}
          sx={{ mt: 1 }}
        >
          <TextField
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
          <TextField
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
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Get Started
          </Button>
          <Grid container justifyContent='center'>
            <Grid justifyContent='center'>
              <Button
                onClick={() => {
                  navigate('/login');
                }}
              >
                {'Already have an account? Sign In'}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Grid>
  );
};

export default GetStarted;
