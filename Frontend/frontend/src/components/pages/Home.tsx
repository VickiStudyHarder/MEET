import React, { useState, useEffect, useContext } from 'react';
import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import NavBar from '../molecules/NavBar';
import RequestCard from '../../stories/RequestCard';
import MeetingScheduleToday from '../../stories/MeetingScheduleToday/MeetingScheduleToday';
import MeetingScheduleTomorrow from '../../stories/MeetingScheduleTomorrow/MeetingScheduleTomorrow';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
// import { IMeeting } from "../../types/types";
// import AppContext from "../../contexts/AppContext";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
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
      date: ['01', 'DEC', '2022'],
      meetingName: 'name 1',
      time: '12:00 - 13:00',
    },
    {
      date: ['02', 'DEC', '2022'],
      meetingName: 'name 2',
      time: '14:00 - 15:00',
    },
    {
      date: ['02', 'DEC', '2022'],
      meetingName: 'name 2',
      time: '14:00 - 15:00',
    },
    {
      date: ['02', 'DEC', '2022'],
      meetingName: 'name 2',
      time: '14:00 - 15:00',
    },
  ];
  let role = 'mentor';

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <NavBar />
      <Container maxWidth='xl' sx={{ display: 'flex' }}>
        <Box sx={{ maxWidth: '30%', display: 'flex', m: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <MeetingScheduleToday
                date={data?.[0]?.date}
                meetingName={data?.[0]?.meetingName}
                time={data?.[0]?.time}
              />
            </Grid>
          </Grid>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexGrow: 1,
            maxWidth: '65%',
            flexWrap: 'wrap',
          }}
        >
          {data.map((item) => (
            <MeetingScheduleTomorrow
              date={item?.date}
              meetingName={item?.meetingName}
              time={item?.time}
            />
          ))}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Home;
