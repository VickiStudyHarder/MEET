import React, { useState } from 'react';
import SignUp from '../../organisms/SignUp/SignUp';
import {Box, Grid, Paper}  from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import StudentMentor from '../../organisms/SignUp/StudentMentor'
import Courses  from '../../organisms/SignUp/Courses'

const theme = createTheme();

const SignUpPage = () => {
   const [stage, setStage] = useState(1)

   const incrementStage = (() => {
      setStage(stage + 1);
   })

   const decrementStage = (() => {
      setStage(stage - 1);
   })

    return (
      <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
         <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
               backgroundImage: 'url(https://careersblog.enterprise.ie/wp-content/uploads/2015/10/iStock_000062258734_Medium.jpg)',
               backgroundRepeat: 'no-repeat',
               backgroundColor: (t) =>
               t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
               backgroundSize: 'cover',
               backgroundPosition: 'center',
            }}
         />
            {stage === 1 && 
               <SignUp  incrementStage={incrementStage} />
            }
            {stage === 2 && 
               <StudentMentor incrementStage={incrementStage} decrementStage={decrementStage}/>
            }
            {stage === 3 && 
               <Courses incrementStage={incrementStage} decrementStage={decrementStage} />
            }
         </Grid>
      </ThemeProvider>
      );
}

export default SignUpPage;