import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavBar from "../molecules/NavBar";
import RequestCard from "../../stories/RequestCard";
import MeetingScheduleToday from "../../stories/MeetingScheduleToday/MeetingScheduleToday";
import MeetingScheduleTomorrow from "../../stories/MeetingScheduleTomorrow/MeetingScheduleTomorrow";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
// import { IMeeting } from "../../types/types";
// import AppContext from "../../contexts/AppContext";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const theme = createTheme();

// const meetingExample: IMeeting = {
//   ownerId: 'z3417347@gmail.com',
//   summary: 'test summary',
//   description: 'test description',
//   location: 'test location',
//   meetingStart: new Date('August 02, 2022 10:00:00'),
//   meetingEnd: new Date('August 02, 2022 11:00:00'),
//   attendees: [{ userId: 'z3417347@gmail.com', attended: false }],
//   notes: [{items: [{title: 'this was a good meeting', content: 'meeting details'}] }],
//   toDoItems: [
//     {
//       title: 'update the database',
//       dueDate: new Date('July 28, 2022 04:00:00'),
//       assigneeId: 'z3417347@gmail.com',
//     },
//   ],
//   meetingId: '',
// };

const Home = () => {
  // const { userMeetings } = useContext(AppContext);

  // useEffect(() => {}, [userMeetings]);

  const data = [
    {
      date: ["01", "DEC", "2022"],
      meetingName: "name 1",
      time: "12:00 - 13:00",
    },
    {
      date: ["02", "DEC", "2022"],
      meetingName: "name 2",
      time: "14:00 - 15:00",
    },
    {
      date: ["02", "DEC", "2022"],
      meetingName: "name 2",
      time: "14:00 - 15:00",
    },
    {
      date: ["02", "DEC", "2022"],
      meetingName: "name 2",
      time: "14:00 - 15:00",
    },
  ];
  const requestCards = [
    { userName: "Jack", MeetingName: "meet1", MeetingTime: "12:00 - 13:00", Rating: 4},
    { userName: "Jack2", MeetingName: "meet2", MeetingTime: "14:00 - 15:00", Rating: 3},
    { userName: "Jack3", MeetingName: "meet3", MeetingTime: "14:00 - 15:00", Rating: 3},
    { userName: "Jack4", MeetingName: "meet4", MeetingTime: "14:00 - 15:00", Rating: 3},
    { userName: "Jack5", MeetingName: "meet5", MeetingTime: "14:00 - 15:00", Rating: 3},
  ];
  let role = "mentor";

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />
      {role === "student"? (
        <Container maxWidth="xl" sx={{display:'flex'}}>
          <Box sx={{ width:450, display:'flex'}}>
          <Grid container spacing={3}>
          <Grid item xs={3.5}>
          <MeetingScheduleToday
          date={data?.[0]?.date}
          meetingName={data?.[0]?.meetingName}
          time={data?.[0]?.time}
          />
          </Grid>
          </Grid>
          </Box>
          <Box sx={{ width:1200, display:'flex'}}>
          {data.map((item) => (
              <Grid container spacing={1}>
                <Grid>
                <MeetingScheduleTomorrow date={item?.date}
                  meetingName={item?.meetingName}
                  time={item?.time}/>
                </Grid>
              </Grid>  
            ))}
          </Box>
          
        {/* <Grid container spacing={3}>
        <Grid item xs={3.5}>
        <MeetingScheduleToday
          date={data?.[0]?.date}
          meetingName={data?.[0]?.meetingName}
          time={data?.[0]?.time}
        />
        </Grid>
        {data.map((item) => (
              <Grid item xs={3.5}>
                <MeetingScheduleTomorrow date={item?.date}
                  meetingName={item?.meetingName}
                  time={item?.time}/>
              </Grid>
            ))}
        </Grid>   */}
        
        </Container>
      ):(
        <Container maxWidth="xl" sx={{display:'flex'}}>
          <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
          <Grid item xs={3.5}>
              <MeetingScheduleToday
                date={data?.[0]?.date}
                meetingName={data?.[0]?.meetingName}
                time={data?.[0]?.time}
              />
            </Grid>
            {requestCards.map((item) => (
              <Grid item xs={2.5}>
                <RequestCard userName={item?.userName}
                MeetingName={item?.MeetingName}
                MeetingTime={item?.MeetingTime}
                Rating={item?.Rating}/>
              </Grid>
            ))}
          </Grid>
        </Box>
        </Container>
      )}
    </ThemeProvider>
  );
};

export default Home;