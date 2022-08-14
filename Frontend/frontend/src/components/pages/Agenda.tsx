import React, { useEffect, useState } from 'react';
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
import { useParams } from 'react-router-dom';
import NavBar from '../molecules/NavBar';
import { getMeetingById } from '../../api/meeting';
import { IMeeting } from '../../types/meetings';
import AgendaList from '../../stories/AgendaList/AgendaList';
import CreateAgendaItemForm from '../molecules/CreateAgendaItemForm';

interface IAgenda {}

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
    const result = await getMeetingById(id || '');
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
          sx={{ display: 'flex', flexGrow: 1, flexDirection: 'column' }}
        >
          <Box
            sx={{ display: 'flex', flexDirection: 'row', width: '100%', m: 2 }}
          >
            <Typography
              sx={{ display: 'flex', flexGrow: 1 }}
              variant='h4'
              align='center'
            >
              Agenda - {meeting.summary}
            </Typography>
            <Button
              onClick={handleClickOpen}
              sx={{
                minWidth: '100px',
                minHeight: '40px',
                maxHeight: '40px',
                maxWidth: '100px',
                borderRadius: 5,
                backgroundColor: '#6001D3',
                color: '#FFFFFF',
                fontSize: 12,
                my: 'auto',
              }}
              variant='contained'
            >
              +Add
            </Button>
          </Box>
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
                  boxShadow: '2px 2px 2px 2px lightGray',
                  width: 800,
                  height: 350,
                  mt: 6,
                  borderRadius: 1,
                  display: 'flex',
                  flexDirection: 'row',
                  p: 4,
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
                  <Typography
                    variant='h3'
                    align='center'
                    sx={{ mx: 'auto', my: 2 }}
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
                  <Typography variant='h2' sx={{ m: 'auto', fontWeight: 500 }}>
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
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
            sx={{ display: 'flex', flexGrow: 1 }}
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
