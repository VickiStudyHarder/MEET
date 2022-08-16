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
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {}, [meetingTodos]);
  useEffect(() => {}, [selectedStudent]);

  return (
    <ThemeProvider theme={theme}>
      {loading ? (
        <Box
          sx={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100vh",
          }}
        >
          <CircleLoader size={100} color={"#6001D3"} loading={loading} />
        </Box>
      ) : (
        <Box>
          <CssBaseline />
          <NavBar />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              py: 2,
              maxHeight: 140,
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ marginLeft: 3 }}>
              <PageTitle icon="4" content="All To Dos" />
            </Box>
          </Box>

          <Divider variant="middle" sx={{ width: "100%" }} />
          <Todo />
        </Box>
      )}
    </ThemeProvider>
  );
};

export default ToDos;
