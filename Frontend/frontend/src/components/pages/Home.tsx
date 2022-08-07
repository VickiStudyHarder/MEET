import React, { useState, useEffect, useContext } from 'react';
import { IMeeting } from '../../types/meeting';
import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import NavBar from '../molecules/NavBar';
import UserContext from '../../contexts/User';

const theme = createTheme();

const meetingExample: IMeeting = {
  userId: 'z3417347@gmail.com',
  summary: 'test summary',
  description: 'test description',
  location: 'test location',
  meetingStart: new Date('August 02, 2022 10:00:00'),
  meetingEnd: new Date('August 02, 2022 11:00:00'),
  attendees: [{ userId: 'z3417347@gmail.com', attended: false }],
  notes: [{ title: 'this was a good meeting', details: 'meeting details' }],
  toDoItems: [
    {
      title: 'update the database',
      dueDate: new Date('July 28, 2022 04:00:00'),
      assigneeId: 'z3417347@gmail.com',
    },
  ],
  meetingId: '',
};

const Home = () => {
  const { userMeetings } = useContext(UserContext);

  useEffect(() => {}, [userMeetings]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />
      <main>
        <Container maxWidth='lg'>
          {userMeetings && <div>{JSON.stringify(userMeetings.data.body)}</div>}
        </Container>
      </main>
    </ThemeProvider>
  );
};

export default Home;
