import React, { useState, useEffect, useContext } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
  Typography,
  Divider,
  Button,
} from '@mui/material';
import NavBar from '../molecules/NavBar';
import Box from '@mui/material/Box';
import MeetingImage from '../../assets/MeetingImage.png';
import AppContext from '../../contexts/AppContext';
import { getMeetingsByUserId } from '../../api/meeting';
import MeetingRow from '../molecules/MeetingRow';
import { IMeetingResponse } from '../../types/meetings';
import PageTitle from '../../stories/PageTiltle';
import CircleLoader from 'react-spinners/CircleLoader'

const theme = createTheme();

const Meetings = () => {
  const [meetings, setMeetings] = useState<null | IMeetingResponse[]>(null);
  const { email } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  // loading
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
    }, 500)
  }, [])
  
  
  useEffect(() => {
    getAllMeetings();
  }, []);
  
  const getAllMeetings = async () => {
    const data = await getMeetingsByUserId(email);
    setLoading(false)
    setMeetings(data);
  };


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      {loading ? (
        <Box sx={{
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100vh'
        }}>
          <CircleLoader size={100} color={'#6001D3'} loading={loading} />
        </Box>

      ) : (
        <Box>
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
                    py: 2,
                    maxHeight: 140,
                    justifyContent: 'space-between'
                  }}
                >
                  <Box sx={{ marginLeft: 3 }}>
                    <PageTitle icon='5' content='Your meetings' />
                  </Box>

                </Box>
              </Box>
              <Divider variant='middle' sx={{ width: '100%' }} />
              <Box sx={{ width: '100%', m: 2, overflow: 'auto', height: '77vh', overflowX: 'hidden' }}>
                {meetings &&
                  meetings.map((meeting: IMeetingResponse) => {
                    return <MeetingRow meeting={meeting.meeting} getAllMeetings={getAllMeetings} />;
                  })}
              </Box>
            </Box>
          </Container>
        </Box>
      )}

    </ThemeProvider>
  );
};

export default Meetings;
