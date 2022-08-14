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
import MeetingBox from '../../stories/Meeting_Box';

const theme = createTheme();

const MeetingDasboard: React.FC<{}> = ({}) => {
  const [meeting, setMeeting] = useState<IMeeting | null>(null);
  const { id } = useParams();

  useEffect(() => {
    handleGetMeeting();
  }, []);

  const handleGetMeeting = async () => {
    const result = await getMeetingById(Number(id));
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
               <Button
                sx={{
                  minWidth: '200px',
                  minHeight: '40px',
                  maxHeight: '40px',
                  maxWidth: '100px',
                  borderRadius: 5,
                  backgroundColor: '#00b300',
                  color: '#FFFFFF',
                  fontSize: 12,
                  my: 'auto',
                }}
                variant='contained'
              >
                Complete This Meeting
              </Button>
            </Box>
          </Box>
          <Divider variant='middle' sx={{ width: '100%' }} />
          <Box sx={{ display: 'flex', flexGrow: 1, flexDirection: 'row' }}>
            <Box>
              <Box sx={{ display: 'flex', flexGrow: 1, m: 4 }}>
                {meeting?.agendas && (
                  <Grid container spacing={2}>
                    {meeting?.agendas?.map((agenda: IAgenda) => {
                      return (
                        <MeetingBox
                          boxName='Agenda Item'
                          meetingName1={agenda.title}
                          meetingName2={agenda.details}
                        />
                      );
                    })}
                  </Grid>
                )}
              </Box>
              <Box sx={{ display: 'flex', flexGrow: 1, m: 4 }}>
                {meeting?.notes && (
                  <Grid container spacing={2}>
                    {meeting?.toDoItem?.map((todo: IToDoItem) => {
                      return (
                        <MeetingBox
                          boxName='To Do'
                          meetingName1={todo.dueDate.toString()}
                          meetingName2={todo.title}
                        />
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
                        <MeetingBox
                          boxName='Meeting Note'
                          meetingName1={note.title}
                          meetingName2={note.details}
                        />
                      );
                    })}
                  </Grid>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default MeetingDasboard;
