import React, { useState, useEffect, useContext } from 'react';
import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
  Typography,
  Divider,
  Button,
  Grid,
} from '@mui/material';
import NavBar from '../molecules/NavBar';
import Box from '@mui/material/Box';
import MeetingImage from '../../assets/MeetingImage.png';
import { getMeetingById } from '../../api/meeting';
import { useParams } from 'react-router-dom';
import { IMeeting, INotes, IAgenda, IToDoItem } from '../../types/meetings';
import AgendaList from '../../stories/AgendaList/AgendaList';

const theme = createTheme();

const MeetingDasboard: React.FC<{}> = ({}) => {
  const [meeting, setMeeting] = useState<IMeeting | null>(null);
  const { id } = useParams();

  useEffect(() => {
    handleGetMeeting();
  }, []);

  const handleGetMeeting = async () => {
    const result = await getMeetingById(id!);
    setMeeting(result);
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
              {meeting && (
                <Typography
                  variant='h3'
                  sx={{ display: 'flex', flexGrow: 1, my: 'auto' }}
                >
                  {meeting.summary}
                </Typography>
              )}
            </Box>
          </Box>
          <Divider variant='middle' sx={{ width: '100%' }} />
          <Box sx={{ display: 'flex', flexGrow: 1, flexDirection: 'row' }}>
            <Box>
              <Box sx={{ display: 'flex', flexGrow: 1, m: 4 }}>
                {meeting?.notes && (
                  <Grid container spacing={2}>
                    {meeting?.toDoItem?.map((todo: IToDoItem) => {
                      return (
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            minWidth: 200,
                            width: 200,
                            minHeight: 200,
                            height: 200,
                            border: 1,
                            borderRadius: 2,
                            m: 2,
                          }}
                        >
                          <Box sx={{ m: 'auto' }}>
                            <Typography variant='h5' align='center'>
                              Agenda Item
                            </Typography>
                            <Typography variant='subtitle2' align='center'>
                              {JSON.stringify(todo.dueDate)}
                            </Typography>
                            <Typography variant='subtitle2' align='center'>
                              {todo.title}
                            </Typography>
                          </Box>
                        </Box>
                      );
                    })}
                  </Grid>
                )}
              </Box>
              <Box sx={{ display: 'flex', flexGrow: 1, m: 4 }}>
                {meeting?.notes && (
                  <Grid container spacing={2}>
                    {meeting?.notes?.map((note: INotes) => {
                      return (
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            minWidth: 200,
                            width: 200,
                            minHeight: 200,
                            height: 200,
                            border: 1,
                            borderRadius: 2,
                            m: 2,
                          }}
                        >
                          <Box sx={{ m: 'auto' }}>
                            <Typography variant='h5' align='center'>
                              Meeting Note
                            </Typography>
                            <Typography variant='subtitle2' align='center'>
                              {note.title}
                            </Typography>
                            <Typography variant='subtitle2' align='center'>
                              {note.details}
                            </Typography>
                          </Box>
                        </Box>
                      );
                    })}
                  </Grid>
                )}
              </Box>
            </Box>
            <Box sx={{ display: 'flex' }}>
              {meeting && meeting.agendas && (
                <AgendaList
                  agendaList={meeting.agendas}
                  handleGetMeeting={handleGetMeeting}
                />
              )}
            </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default MeetingDasboard;
