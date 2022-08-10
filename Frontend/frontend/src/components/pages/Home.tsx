import React, { useState, useEffect, useContext } from 'react';
import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import NavBar from '../molecules/NavBar';
import UserContext from '../../contexts/User';
import { IMeeting } from '../../types/types';

const theme = createTheme();

const meetingExample: IMeeting = {
  ownerId: 'z3417347@gmail.com',
  description: 'test description',
  startDate: new Date('August 02, 2022 10:00:00'),
  endDate: new Date('August 02, 2022 11:00:00'),
  attendees: [{ userId: 'z3417347@gmail.com', attended: false }],
  notes: [{ meetingId: '',ownerId:"z3417347@gmail.com" }],
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
