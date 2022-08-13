import React, { useState, useEffect, useContext } from 'react';
import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
  Typography,
  Divider,
} from '@mui/material';
import NavBar from '../molecules/NavBar';
import Box from '@mui/material/Box';
import MeetingImage from '../../assets/MeetingImage.png';
import AppContext from '../../contexts/AppContext';
import { getMeetingsByUserId } from '../../api/meeting';
import MeetingRow from '../molecules/MeetingRow';
import { IMeetingResponse } from '../../types/meetings';

const theme = createTheme();

const Meetings = () => {
  const [meetings, setMeetings] = useState<null | IMeetingResponse[]>(null);
  const { email } = useContext(AppContext);

  useEffect(() => {
    getAllMeetings();
  }, []);

  const getAllMeetings = async () => {
    const data = await getMeetingsByUserId(email);
    setMeetings(data);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />
      <Container maxWidth='xl' sx={{ display: 'flex', flexGrow: 1 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            width: '100%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                px: 10,
                py: 2,
                maxHeight: 140,
              }}
            >
              <Box sx={{ my: 'auto', mr: 2 }}>
                <img
                  src={MeetingImage}
                  height='120'
                  width='120'
                  alt='study-group-icon'
                />
              </Box>
              <Typography
                variant='h3'
                sx={{ display: 'flex', flexGrow: 1, my: 'auto' }}
              >
                Your Meetings
              </Typography>
            </Box>
          </Box>
          <Divider variant='middle' sx={{ width: '100%' }} />
          <Box sx={{ width: '100%', m:2 }}>
            {meetings &&
              meetings.map((meeting: IMeetingResponse) => {
                return <MeetingRow meeting={meeting.meeting} />;
              })}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Meetings;
