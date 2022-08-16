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

const theme = createTheme();

const ToDoHome: React.FC<{}> = () => {
  const { id } = useParams();
  const [meeting, setMeeting] = useState<null | IMeeting>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    handleGetMeeting();
  }, []);

  const handleGetMeeting = async () => {
    const result = await getMeetingById(Number(id));
    setMeeting(result);
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
              sx={{ display: 'flex', flexDirection: 'row', width: '100%', m: 2, ml: 0, justifyContent: 'space-between' }}
            >
              <Box sx={{ marginLeft: 3 }}>
                <PageTitle icon='6' content={`Todo's - ${meeting?.summary}`} doSomething={() => navigate(`/meetings/`)} />
              </Box>

              <Button onClick={handleClickOpen} variant="outlined" sx={{ borderColor: "#6001D3", color: "#6001D3" }} startIcon={<AddCircleOutlineIcon />}>
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
    </ThemeProvider>
  );
};

export default ToDoHome;
