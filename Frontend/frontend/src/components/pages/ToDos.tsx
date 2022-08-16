import { ThemeProvider } from "@emotion/react";
import { Box, createTheme, CssBaseline, Divider } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import NavBar from "../molecules/NavBar";
import CalendarUserCardMini from "../../stories/CalendarUserCardMini/CalendarUserCardMini";
import { Todo } from "../../stories/Todo";
import AppContext from "../../contexts/AppContext";
import PageTitle from "../../stories/PageTiltle";
import CircleLoader from "react-spinners/CircleLoader";
//to do list page
interface IToDos {}

const theme = createTheme();

const ToDos: React.FC<IToDos> = () => {
  const { meetingTodos } = useContext(AppContext);
  const { selectedStudent } = useContext(AppContext);
  // loading


  useEffect(() => {}, [meetingTodos]);
  useEffect(() => {}, [selectedStudent]);

  return (
    <ThemeProvider theme={theme}>
     
        <Box>

          <Todo />
        </Box>
    
    </ThemeProvider>
  );
};

export default ToDos;
