import { ThemeProvider } from '@emotion/react';
import { createTheme, CssBaseline } from '@mui/material';
import React, { useState, useEffect, useContext } from "react";
import NavBar from '../molecules/NavBar';
import CalendarUserCardMini from '../../stories/CalendarUserCardMini/CalendarUserCardMini';
import {Todo} from '../../stories/Todo';
import AppContext from "../../contexts/AppContext";


interface IToDos {}

const theme = createTheme();

const ToDos: React.FC<IToDos> = () => {
  const { meetingTodos } = useContext(AppContext);
  const { selectedStudent } = useContext(AppContext);
  useEffect(() => {}, [meetingTodos]);
  useEffect(() => {}, [selectedStudent]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />
      {/* {selectedStudent.map((data:any) => (
        <CalendarUserCardMini 
        avator={'https://cdn.britannica.com/41/9641-004-A8DD825D/Yorkshire-boar.jpg'}
        name={data?.name}
        />
      ))} */}
  
      {/* <CalendarUserCardMini 
            avator={'https://cdn.britannica.com/41/9641-004-A8DD825D/Yorkshire-boar.jpg'}
            name={'Vicki Chen'}
            /> */}

      {/* <div>ToDos</div> */}
      {/* <CalendarUserCardMini /> */}
      <Todo />
    </ThemeProvider>
  );
};

export default ToDos;
