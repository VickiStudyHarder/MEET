import { ThemeProvider } from '@emotion/react';
import { Box, createTheme, CssBaseline, Divider } from '@mui/material';
import React, { useState, useEffect, useContext } from "react";
import NavBar from '../molecules/NavBar';
import CalendarUserCardMini from '../../stories/CalendarUserCardMini/CalendarUserCardMini';
import {Todo} from '../../stories/Todo';
import AppContext from "../../contexts/AppContext";
import PageTitle from '../../stories/PageTiltle';

//to do list page
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
      <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                py: 2,
                maxHeight: 140,
                justifyContent:'space-between'
              }}
            >
            <Box sx={{marginLeft:3}}>
              <PageTitle icon='4' content='Your Rating' />
            </Box>

            </Box>

          <Divider variant='middle' sx={{ width: '100%' }} />
      <Todo />
    </ThemeProvider>
  );
};

export default ToDos;
