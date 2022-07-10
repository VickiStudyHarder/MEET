import React, { useState, useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import axios from 'axios';
import { MeetingContext } from '../../contexts/Meeting';
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

const theme = createTheme();

const meetingExample: IMeeting = {
  userId: 'test',
  meetingStart: new Date('July 22, 2022 03:00:00'),
  meetingEnd: new Date('July 22, 2022 04:00:00'),
  participants: ['user3', 'user2'],
  notes: ['this was a good meeting'],
  ratings: [{ value: 4, comments: 'Meeting could be improved' }],
  actionItems: [
    {
      title: 'update the database',
      description: 'we need to update the database for some reasons',
      dueDate: new Date('July 28, 2022 04:00:00'),
    },
  ],
};

const Home = () => {
  const { postMeeting, getMeetingById, getUpcomingMeetings } =
    useContext(MeetingContext);
  const [meetings, setMeetings] = useState<IMeeting[]>([]);

  const onClickPost = async (meeting: IMeeting) => {
    await postMeeting(meeting);
  };

  const onClickGetById = async (id: string) => {
    const result = await getMeetingById('test');
    setMeetings(result.data.body);
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
          </Stack>
        </Container>
        <Container maxWidth='lg'>
          <Typography variant='h3' textAlign= 'center'>
            Your Upcoming Meetings
          </Typography>
          <Grid container spacing={1}>
            {meetings.length > 0 &&
              meetings.map((meeting: any) => {
                return (
                  <>
                    <Grid item xs={3}>
                      <Button variant='contained' sx={{textAlign: 'center', justifyContent: 'center', alignItems: 'center'}}>View Meeting</Button>
                    </Grid>
                    <Grid item xs={9}  alignItems="center">
                      <Stack direction='row'>
                        <Paper sx={{width: '33%', textAlign: 'center', justifyContent: 'center', alignItems: 'center'}} >{new Date(meeting.meetingStart).toDateString()}</Paper>
                        <Paper sx={{width: '33%', textAlign: 'center', justify: 'center', alignItems: 'center'}}>{new Date(meeting.meetingEnd).toDateString()}</Paper>
                        <Paper sx={{width: '33%', textAlign: 'center', justifyContent: 'center', alignItems: 'center'}}>
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
