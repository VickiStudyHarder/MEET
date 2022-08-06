import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';
import NavBar from '../molecules/NavBar';

interface ICalendar {}

const theme = createTheme();

const Calendar: React.FC<ICalendar> = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />
      <div>Calendar</div>
    </ThemeProvider>
  );
};

export default Calendar;
