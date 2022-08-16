import React, { useContext, useState } from 'react';
import { TextField, Button, Grid, Box, Paper, Avatar } from '@mui/material';
import Typography from '@mui/material/Typography';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../../contexts/AppContext';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
interface IGetStarted {
  incrementStage: () => void;
}

const GetStarted: React.FC<IGetStarted> = ({ incrementStage }) => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    dateOfBirth,
    setDateOfBirth,
  } = useContext(AppContext);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      console.log(email);
      setError('Email address is not valid');
      setOpen(true);
      return;
    } else if (password === '') {
      setError('Password is required');
      setOpen(true);
      return;
    } else if (password.length < 8) {
      setError('Password must be at least 8 characters');
      setOpen(true);
      return;
    } else if (password === password.toLowerCase()) {
      setError('Password must contain at least one uppercase letter');
      setOpen(true);
      return;
    } else if (!format.test(password)) {
      console.log(password);
      setError('Password must contain a special character [! . , $ *]');
      setOpen(true);
      return;
    } else if (firstName === '') {
      setError('First Name is required');
      setOpen(true);
      return;
    } else if (lastName === '') {
      setError('Last Name is required');
      setOpen(true);
      return;
    } else if (dateOfBirth === null) {
      setError('Date Of Birth Is Required');
      setOpen(true);
      return;
    }
    incrementStage();
  };

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setError(null);
    setOpen(false);
  };

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
          Sign Up
        </Typography>
        <Box component='form' noValidate onSubmit={onSubmit} sx={{ mt: 1 }}>
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
          <TextField
            margin='normal'
            required
            fullWidth
            name='firstName'
            label='First Name'
            id='firstName'
            value={firstName}
            onChange={(e: any) => setFirstName(e.target.value)}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='lastName'
            label='Last Name'
            type='lastName'
            id='lastName'
            value={lastName}
            onChange={(e: any) => setLastName(e.target.value)}
          />
          <Box sx={{ py: 4 }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label='Date Of Birth'
                inputFormat='MM/dd/yyyy'
                value={dateOfBirth}
                onChange={(value: Date | null) => setDateOfBirth(value)}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Box>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
          >
            <DialogTitle id='alert-dialog-title'>
              {'An error occured'}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id='alert-dialog-description'>
                {error}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Close</Button>
            </DialogActions>
          </Dialog>
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
