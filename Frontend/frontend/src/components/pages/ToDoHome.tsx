import React, { useState, useEffect } from 'react';
import NavBar from '../molecules/NavBar';
import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
  Typography,
  Divider,
  Box,
  Button,
  Dialog,
} from '@mui/material';
import MeetingImage from '../../assets/MeetingImage.png';
import { useNavigate, useParams } from 'react-router-dom';
import { getMeetingById } from '../../api/meeting';
import { IMeeting, IToDoItem } from '../../types/meetings';
import ToDoRow from '../molecules/ToDoRow';
import CreateToDoForm from '../molecules/CreateToDoForm';
import PageTitle from '../../stories/PageTiltle';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CircleLoader from 'react-spinners/CircleLoader'

const theme = createTheme();

const ToDoHome: React.FC<{}> = () => {
  const { id } = useParams();
  const [meeting, setMeeting] = useState<null | IMeeting>(null);
  const [open, setOpen] = useState(false);

  // loading
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
    }, 500)
  }, [])

  useEffect(() => {
    handleGetMeeting();
  }, []);

  const handleGetMeeting = async () => {
    const result = await getMeetingById(Number(id));
    setLoading(false)
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();

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
                  sx={{ display: 'flex', flexDirection: 'row', width: '100%', m: 2, ml: 0, justifyContent: 'space-between' }}
                >
                  <Box sx={{ marginLeft: 3 }}>
                    <PageTitle icon='6' content={`Todo's - ${meeting?.summary}`} doSomething={() => navigate(-1)} />
                  </Box>

                  <Button onClick={handleClickOpen} variant="contained" color="secondary" sx={{ backgroundColor: "#6001D3", color: "#ffffff", borderRadius: 10, width: 104, height: 45 }} startIcon={<AddCircleOutlineIcon />}>
                    New
                  </Button>

                </Box>
              </Box>
              <Divider variant='middle' sx={{ width: '100%' }} />
              <Box sx={{ width: '100%', m: 2, overflow: 'auto', height: '77vh', overflowX: 'hidden' }}>
                {meeting &&
                  meeting?.toDoItem?.map((toDoItem: IToDoItem) => {
                    return <ToDoRow toDoItem={toDoItem} handleGetMeeting={handleGetMeeting} meeting={meeting} />;
                  })}
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
                <CreateToDoForm
                  setOpen={setOpen}
                  meeting={meeting}
                  handleGetMeeting={handleGetMeeting}
                  handleClose={handleClose}
                />
              )}
            </Dialog>
          </Container>
        </Box>
      )}

    </ThemeProvider>
  );
};

export default ToDoHome;
