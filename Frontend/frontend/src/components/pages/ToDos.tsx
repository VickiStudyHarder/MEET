import { ThemeProvider } from '@emotion/react';
import { createTheme, CssBaseline } from '@mui/material';
import React from 'react';
import NavBar from '../molecules/NavBar';

interface IToDos {}

const theme = createTheme();

const ToDos: React.FC<IToDos> = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />
      <div>ToDos</div>
    </ThemeProvider>
  );
};

export default ToDos;
