import React, { useEffect, useState } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  Container,
  Box,
  Typography,
  Paper,
  Divider,
  Button,
  Dialog,
} from '@mui/material';
import AlarmIcon from '@mui/icons-material/Alarm';
import GroupsIcon from '@mui/icons-material/Groups';
import { useNavigate, useParams } from 'react-router-dom';
import NavBar from '../molecules/NavBar';
import { getMeetingById } from '../../api/meeting';
import { IMeeting } from '../../types/meetings';
import AgendaList from '../../stories/AgendaList/AgendaList';
import CreateAgendaItemForm from '../molecules/CreateAgendaItemForm';
import PageTitle from '../../stories/PageTiltle';

interface IAgenda { }

const theme = createTheme();

const Agenda: React.FC<IAgenda> = () => {
  const { id } = useParams();
  const [meeting, setMeeting] = useState<null | IMeeting>(null);
  const [start, setStart] = useState<any>(null);
  const [end, setEnd] = useState<any>(null);
  const [diff, setDiff] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    handleGetMeeting();
  }, [start, end, diff]);

  const handleGetMeeting = async () => {
    const result = await getMeetingById(Number(id));
    setMeeting(result);
    if (meeting) {
      const start = new Date(meeting.meetingStart).toLocaleString('en-AU', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setStart(start);
      const end = new Date(meeting.meetingEnd).toLocaleString('en-AU', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setEnd(end);
      const x = new Date(meeting.meetingEnd);
      const y = new Date(meeting.meetingStart);
      const diff = x.valueOf() - y.valueOf();
      const diffInHours = diff / 1000 / 60 / 60;
      if (diffInHours < 1) {
        setDiff(`${diffInHours.toFixed(2)} hours`);
      } else if (diffInHours < 24) {
        setDiff(`${diffInHours.toFixed(0)} hours`);
      } else {
        setDiff(`${(diffInHours / 24).toFixed(0)} days`);
      }
    }
  };

  const navigate = useNavigate();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />
      {meeting && (
        <Container
        maxWidth='xl' sx={{ display: 'flex', flexGrow: 1 }}
        >
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
            sx={{ display: 'flex', flexDirection: 'row', width: '100%', m: 2, justifyContent: 'space-between' }}
          >
            <Box sx={{ marginLeft: 3 }}>
              <PageTitle icon='6' content={`Agenda - ${meeting?.summary}`} doSomething={() => navigate(`/meetings/`)} />
            </Box>

            <Button onClick={handleClickOpen} variant="outlined" sx={{ borderColor: "#6001D3", color: "#6001D3" }} startIcon={<AddCircleOutlineIcon />}>
              New
            </Button>

          </Box>
          </Box>
          <Divider variant='middle' sx={{ width: '100%' }} />
          <Box
            sx={{
              m: 2,
              width: '100%',
              display: 'flex',
              flexGrow: 1,
              flexDirection: 'row',
            }}
          >
            <Box sx={{ display: 'flex', flexGrow: 1, height: '100%' }}>
              <Box
                sx={{
                  boxShadow: '5px 5px 5px 5px lightGray',
                  width: 800,
                  height: 350,
                  mt: 30,
                  borderRadius: 10,
                  display: 'flex',
                  flexDirection: 'row',
                  p: 4,
                  background: '#F3F4F6',
                  // border:,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 1,
                    maxWidth: '40%',
                  }}
                >
                  <GroupsIcon
                  sx={{color:'#6001D3',fontSize:60}}
                  >
                  </GroupsIcon>
                  <Typography
                    
                    align='center'
                    // color='#6001D3'
                    sx={{fontSize:50, mx: 'auto',}}
                  >
                    {meeting.summary}
                  </Typography>
                  <Typography
                    variant='subtitle1'
                    align='center'
                    
                    sx={{ mx: 'auto', my: 2 }}
                  >
                    {start}
                  </Typography>
                  <Typography
                    variant='subtitle1'
                    align='center'
                    // color='white'
                    sx={{ mx: 'auto', mb: 2 }}
                  >
                    {end}
                  </Typography>
                </Box>
                <Divider
                  variant='middle'
                  orientation='vertical'
                  
                  sx={{ width: '10%', display: 'flex', mx: 4 }}
                />
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 1,
                    maxWidth: '40%',
                  }}
                >
                  <AlarmIcon
                  sx={{color:'#6001D3',fontSize:60}}
                  >
                  </AlarmIcon>
                  <Typography 
                    // variant='h2' 
                    // color='#6001D3'
                    sx={{ mx:'auto',fontWeight: 500, fontSize:70, my:4 }}>
                    {diff}
                  </Typography>
                </Box>
              </Box>
            </Box>
            {meeting.agendas && (
              <AgendaList
                agendaList={meeting.agendas}
                handleGetMeeting={handleGetMeeting}
              />
            )}
          </Box>
          </Box>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
            // sx={{ display: 'flex', flexGrow: 1 }}
            maxWidth='lg'
          >
            {meeting && (
              <CreateAgendaItemForm
                setOpen={setOpen}
                meeting={meeting}
                handleGetMeeting={handleGetMeeting}
                handleClose={handleClose}
              />
            )}
          </Dialog>
        </Container>
      )}
    </ThemeProvider>
  );
};

export default Agenda;
