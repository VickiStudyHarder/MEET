import { ThemeProvider } from '@emotion/react';
import { createTheme, CssBaseline } from '@mui/material';
import React from 'react';
import NavBar from '../molecules/NavBar';

interface IRecording {}

const theme = createTheme();

const Recording: React.FC<IRecording> = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />
      <div>Recording</div>
    </ThemeProvider>
  );
};

export default Recording;
