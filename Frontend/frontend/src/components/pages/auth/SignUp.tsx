import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import StudentMentor from '../../organisms/SignUpFlow/StudentMentor';
import Courses from '../../organisms/SignUpFlow/Courses';
import GetStarted from '../../organisms/SignUpFlow/GetStarted';
import GoogleAuth from '../../organisms/Google/Google';
import CompleteSignUp from '../../organisms/SignUpFlow/CompleteSignUp';

const theme = createTheme();

const SignUpPage = () => {
  const [stage, setStage] = useState(1);

  const incrementStage = () => {
    setStage(stage + 1);
  };

  const decrementStage = () => {
    setStage(stage - 1);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component='main' sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              'url(https://careersblog.enterprise.ie/wp-content/uploads/2015/10/iStock_000062258734_Medium.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        {stage === 1 && <GetStarted incrementStage={incrementStage} />}
        {stage === 2 && (
          <StudentMentor
            incrementStage={incrementStage}
            decrementStage={decrementStage}
          />
        )}
        {stage === 3 && (
          <GoogleAuth
            incrementStage={incrementStage}
            decrementStage={decrementStage}
          />
        )}
        {stage === 4 && (
          <CompleteSignUp />
        )}
      </Grid>
    </ThemeProvider>
  );
};

export default SignUpPage;
