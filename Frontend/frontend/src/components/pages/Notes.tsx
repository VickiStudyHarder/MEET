import { ThemeProvider } from '@emotion/react';
import { createTheme, CssBaseline } from '@mui/material';
import React from 'react';
import NavBar from '../molecules/NavBar';

interface INotes {}

const theme = createTheme();

const Notes: React.FC<INotes> = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />
      <div>Notes</div>
    </ThemeProvider>
  );
};

export default Notes;
