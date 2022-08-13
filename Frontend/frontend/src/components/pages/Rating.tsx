import { ThemeProvider } from '@emotion/react';
import { createTheme, CssBaseline } from '@mui/material';
import React from 'react';
import NavBar from '../molecules/NavBar';

interface IRating {}

const theme = createTheme();

const Rating: React.FC<IRating> = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />
      <div>Rating</div>
    </ThemeProvider>
  );
};

export default Rating;
