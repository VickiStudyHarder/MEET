import { ThemeProvider } from '@emotion/react';
import { createTheme, CssBaseline } from '@mui/material';
import React from 'react';
import NavBar from '../molecules/NavBar';

interface IGroup {}

const theme = createTheme();

const Group: React.FC<IGroup> = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />
      <div>Group</div>
    </ThemeProvider>
  );
};

export default Group;
