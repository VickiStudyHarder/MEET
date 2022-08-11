import { ThemeProvider } from '@emotion/react';
import { createTheme, CssBaseline } from '@mui/material';
import React from 'react';
import NavBar from '../molecules/NavBar';
import CalendarUserCardMini from '../../stories/CalendarUserCardMini/CalendarUserCardMini';
import {Todo} from '../../stories/Todo';


interface IToDos {}

const theme = createTheme();

const ToDos: React.FC<IToDos> = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />
      {/* <div>ToDos</div> */}
      {/* <CalendarUserCardMini /> */}
      <Todo />
    </ThemeProvider>
  );
};

export default ToDos;
