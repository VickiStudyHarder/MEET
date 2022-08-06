import React, { useState, useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import axios from 'axios';
import { SessionContext } from '../../contexts/Session';
import { IMeeting } from '../../types/meeting';
import {
  Container,
  createTheme,
  CssBaseline,
  Grid,
  Paper,
  Stack,
  styled,
  ThemeProvider,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import NavBar from '../molecules/NavBar';

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
  const { postMeeting, getMeeting } = useContext(SessionContext);
  const [meetings, setMeetings] = useState<IMeeting[]>([]);
  const navigate = useNavigate();

  const onClickPost = async (meeting: IMeeting) => {
    const result = await postMeeting(meeting);
    console.log(result);
  };

  const onClickGetById = async (id: string) => {
    const result = await getMeeting('test');
    setMeetings(result.data.body);
  };

  const onClickGoogle = async () => {
    navigate('/google');
  };

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  console.log({ meetings });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />
      <main>
        <Container maxWidth='lg'>
          <Stack direction='row' justifyContent='center' sx={{ m: 2 }}>
            <Button
              variant='contained'
              onClick={postMeeting(meetingExample)}
              sx={{ m: 2 }}
            >
              Post
            </Button>
            <Button
              variant='contained'
              onClick={() => onClickGetById('test')}
              sx={{ m: 2 }}
            >
              Get By Id
            </Button>
            <Button
              variant='contained'
              onClick={() => onClickGoogle()}
              sx={{ m: 2 }}
            >
              Google
            </Button>
          </Stack>
        </Container>
        <Container maxWidth='lg'>
          <Typography variant='h3' textAlign='center'>
            Your Upcoming Meetings
          </Typography>
          <Grid container spacing={1}>
            {meetings.length > 0 &&
              meetings.map((meeting: any) => {
                return (
                  <>
                    <Grid item xs={3}>
                      <Button
                        variant='contained'
                        sx={{
                          textAlign: 'center',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        View Meeting
                      </Button>
                    </Grid>
                    <Grid item xs={9} alignItems='center'>
                      <Stack direction='row'>
                        <Paper
                          sx={{
                            width: '33%',
                            textAlign: 'center',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          {new Date(meeting.meetingStart).toDateString()}
                        </Paper>
                        <Paper
                          sx={{
                            width: '33%',
                            textAlign: 'center',
                            justify: 'center',
                            alignItems: 'center',
                          }}
                        >
                          {new Date(meeting.meetingEnd).toDateString()}
                        </Paper>
                        <Paper
                          sx={{
                            width: '33%',
                            textAlign: 'center',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <Stack>
                            {meeting.participants.map((participant: string) => (
                              <div>{participant}</div>
                            ))}
                          </Stack>
                        </Paper>
                      </Stack>
                    </Grid>
                  </>
                );
              })}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
};

export default Home;
