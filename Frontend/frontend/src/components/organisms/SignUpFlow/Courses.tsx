import React, { useState, useEffect, useContext } from 'react';
import {
  Button,
  Grid,
  Box,
  Paper,
  TextField,
  IconButton,
  InputAdornment,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { AuthContext } from '../../../contexts/Auth';
import UserPool from '../../../utils/auth/UserPool';
import { useNavigate } from 'react-router-dom';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { createUser } from '../../../api/users';

interface ICourses {
  decrementStage: () => void;
  incrementStage: () => void;
}

const Courses: React.FC<ICourses> = ({ decrementStage, incrementStage }) => {
  const navigate = useNavigate();
  const [input, setInput] = useState('');

  const {
    email,
    password,
    courses,
    setCourses,
    error,
    setError,
    confirmationCode,
    setConfirmationCode,
    isCodeSent,
    setIsCodeSent,
    username,
  } = useContext(AuthContext);

  const addCourse = () => {
    const updatedCourses = [input, ...courses];
    setCourses(updatedCourses);
    setInput('');
  };

  const onSignUp = (event: any) => {
    event.preventDefault();

    console.log(email, password);
    UserPool.signUp(email, password, [], [], (err: any, data: any) => {
      if (err) {
        setError(err.message);
        console.log(error);
        return;
      }
      setIsCodeSent(true);
    });
  };

  const onConfirm = async () => {
    const confirmParams = {
      Pool: UserPool,
      Username: email,
    };

    const cognitoUser = new CognitoUser(confirmParams);
    const x = await cognitoUser.confirmRegistration(
      confirmationCode,
      true,
      async (err: any, data: any) => {
        if (err) {
          console.log(err);
        }
      }
    );
    console.log(x);
    const username = cognitoUser.getUsername();
    console.log(username);
    const user = {
      id: username,
      firstName: 'test',
      lastName: 'test',
      dateOfBirth: new Date(),
      role: 'student',
      rating: 0,
      totalMeetings: 0,
    };
    await createUser(user);
    incrementStage();
  };

  useEffect(() => {}, [courses, isCodeSent]);

  return (
    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justify: 'center',
        }}
      >
        <Typography component='h1' variant='h5' sx={{ p: 4 }}>
          Which courses are you taking?
        </Typography>
        {courses.length > 0 && (
          <Typography component='h1' variant='h5' sx={{ p: 4 }}>
            Selected Courses:
          </Typography>
        )}
        {courses.length > 0 &&
          courses.map((course: string) => {
            return (
              <Typography component='h1' variant='h5'>
                {course}
              </Typography>
            );
          })}
        <Box component='form' noValidate sx={{ m: 4 }}>
          <TextField
            id='outlined-multiline-flexible'
            label='Courses'
            multiline
            maxRows={4}
            value={input}
            onChange={(e: any) => setInput(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton onClick={addCourse}>
                    <AddCircleOutlineIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {isCodeSent && (
            <TextField
              sx={{ m: 4 }}
              id='outlined-multiline-flexible'
              label='ConfirmationCode'
              multiline
              maxRows={4}
              value={confirmationCode}
              onChange={(e: any) => setConfirmationCode(e.target.value)}
            />
          )}
        </Box>
        <Box sx={{ x: 40 }}>
          <Button
            onClick={decrementStage}
            sx={{ p: 4 }}
            startIcon={<ArrowBackIosIcon />}
          >
            Previous
          </Button>
          {isCodeSent ? (
            <Button onClick={onConfirm} sx={{ p: 4 }}>
              Confirm Code
            </Button>
          ) : (
            <Button onClick={onSignUp} sx={{ p: 4 }}>
              Sign Up
            </Button>
          )}
        </Box>
      </Box>
    </Grid>
  );
};

export default Courses;
