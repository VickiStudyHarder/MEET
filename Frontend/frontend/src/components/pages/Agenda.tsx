import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import React from 'react';
import NavBar from '../molecules/NavBar';

interface IAgenda {}

const theme = createTheme();

const Agenda: React.FC<IAgenda> = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />
      <div>Agenda</div>
    </ThemeProvider>
  );
};

export default Agenda;
