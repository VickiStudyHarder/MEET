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
  Dialog,
  DialogContent,
  Rating,
} from '@mui/material';
import NavBar from '../molecules/NavBar';
import Box from '@mui/material/Box';
import MeetingImage from '../../assets/MeetingImage.png';
import { getMeetingById, updateMeeting } from '../../api/meeting';
import { useNavigate, useParams } from 'react-router-dom';
import {
  IMeeting,
  INotes,
  IAgenda,
  IToDoItem,
  IMeetingAttendee,
} from '../../types/meetings';
import AgendaList from '../../stories/AgendaList/AgendaList';
import MeetingBox from '../../stories/Meeting_Box';
import EmptyMeetingBox from '../../stories/EmptyMeetingBox';
import AppContext from '../../contexts/AppContext';
import MentorMeetingRow from '../molecules/MentorRatingRow';
import CircleLoader from 'react-spinners/CircleLoader'
import PageTitle from '../../stories/PageTiltle';

const theme = createTheme();

const MeetingDasboard: React.FC<{}> = ({ }) => {
  const [meeting, setMeeting] = useState<IMeeting | null>(null);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const { email } = useContext(AppContext);
  const { id } = useParams();
  // loading
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [])

  useEffect(() => {
    handleGetMeeting();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleGetMeeting = async () => {
    const result = await getMeetingById(Number(id));
    console.log(result);
    setMeeting(result);
    const currentUser = await result.meetingAttendee.filter(
      (attendee: IMeetingAttendee) => attendee?.user?.id === email
    );
    console.log(currentUser);
    setUser(currentUser[0]);
    console.log({ currentUser });
    console.log({ user });
  };

  const handleMarkAsAttended = async () => {
    setOpen(true);
  };

  const handleCompleteMeeting = async () => {
    if (!user) {
      const currentUser = meeting?.meetingAttendee?.filter(
        (attendee: IMeetingAttendee) => attendee?.user?.id === email
      );
      setUser(currentUser);
    }
    const meetingAttendeeList: IMeetingAttendee[] = [];
    meetingAttendeeList.push({
      id: user.id,
      userId: email,
      attended: true,
      googleCalendarId: '',
    });

    const meetingUpdate = {
      meetingAttendee: meetingAttendeeList,
    };

    await updateMeeting(meetingUpdate, Number(id));
    await handleGetMeeting();
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
          <NavBar inMeeting={true} />
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
                    justifyContent:'space-between'
                  }}
                >
                  <Box sx={{marginLeft:5}}>
                     <PageTitle icon='6' content={`Meeting - ${meeting?.summary}`} doSomething={() => navigate(-1)} />
                  </Box>
                 
                  <Box>
                    {user && user.attended ? (
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
                      Attended
                    </Button>
                  ) : (
                    <Button
                      sx={{
                        minWidth: '200px',
                        minHeight: '40px',
                        maxHeight: '40px',
                        maxWidth: '100px',
                        borderRadius: 5,
                        backgroundColor: '#6001D3',
                        color: '#FFFFFF',
                        fontSize: 12,
                        fontWeight: 'bold',
                        my: 'auto',
                      }}
                      variant='contained'
                      onClick={handleMarkAsAttended}
                    >
                      Mark As Attended
                    </Button>
                  )}
                  </Box>
                  
                </Box>
              </Box>
              <Divider variant='middle' sx={{ width: '100%' }} />
              <Box sx={{ display: 'flex', flexGrow: 1, flexDirection: 'row' }}>
                <Box>
                  <Box sx={{ display: 'flex', flexGrow: 1, m: 4 }}>
                    {meeting?.agendas && (
                      <Grid container spacing={1}>
                        {meeting?.agendas?.map((agenda: IAgenda) => {
                          return (
                            <MeetingBox
                              id={meeting.id}
                              type={'agenda'}
                              boxName='Agenda Item'
                              meetingName1={agenda.title}
                              meetingName2={agenda.details}
                            />
                          );
                        })}
                        <EmptyMeetingBox id={meeting.id} type={'agenda'} />
                      </Grid>
                    )}
                  </Box>
                  <Box sx={{ display: 'flex', flexGrow: 1, m: 4 }}>
                    {meeting?.notes && (
                      <Grid container spacing={1}>
                        {meeting?.toDoItem?.map((todo: IToDoItem) => {
                          return (
                            <MeetingBox
                              id={meeting.id}
                              type={'todo'}
                              boxName='To Do'
                              meetingName1={todo.dueDate.toString()}
                              meetingName2={todo.title}
                            />
                          );
                        })}
                        <EmptyMeetingBox id={meeting.id} type={'todo'} />
                      </Grid>
                    )}
                  </Box>
                  <Box sx={{ display: 'flex', flexGrow: 1, m: 4 }}>
                    {meeting?.notes && (
                      <Grid container spacing={1}>
                        {meeting?.notes?.map((note: INotes) => {
                          return (
                            <MeetingBox
                              id={meeting.id}
                              type={'notes'}
                              boxName='Meeting Note'
                              meetingName1={note.title}
                              meetingName2={note.details}
                            />
                          );
                        })}
                        <EmptyMeetingBox id={meeting.id} type={'notes'} />
                      </Grid>
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
            <Dialog open={open} onClose={handleClose} maxWidth='lg'>
              <DialogContent
                sx={{
                  width: 800,
                  height: 600,
                  display: 'flex',
                  flexGrow: 1,
                  flexDirection: 'column',
                }}
              >
                <Typography variant='h3' align='center' sx={{ m: 4 }}>
                  Rate Your Mentors
                </Typography>
                <Divider variant='middle' />
                {meeting &&
                  meeting?.meetingAttendee?.map((attendee: IMeetingAttendee) => {
                    if (attendee?.user?.role === 'mentor') {
                      return <MentorMeetingRow attendee={attendee} />;
                    }
                  })}

                <Box sx={{ m: 'auto', display: 'flex', flexDirection: 'column' }}>
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
                      m: 'auto',
                    }}
                    variant='contained'
                    onClick={handleCompleteMeeting}
                  >
                    Complete Review
                  </Button>
                  <Typography sx={{ m: 2 }}>
                    Review Can Only Be Completed Once
                  </Typography>
                </Box>
              </DialogContent>
            </Dialog>
          </Container>
        </Box>
      )}

    </ThemeProvider>
  );
};

export default MeetingDasboard;
