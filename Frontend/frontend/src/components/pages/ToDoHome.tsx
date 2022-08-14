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
import { useParams } from 'react-router-dom';
import { getMeetingById } from '../../api/meeting';
import { IMeeting, IToDoItem } from '../../types/meetings';
import ToDoRow from '../molecules/ToDoRow';
import CreateToDoForm from '../molecules/CreateToDoForm';

const theme = createTheme();

const ToDoHome: React.FC<{}> = () => {
  const { id } = useParams();
  const [meeting, setMeeting] = useState<null | IMeeting>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    handleGetMeeting();
  }, []);

  const handleGetMeeting = async () => {
    const result = await getMeetingById(id || '');
    setMeeting(result);
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
              <Typography
                variant='h3'
                sx={{ display: 'flex', flexGrow: 1, my: 'auto' }}
              >
                To Do's - {meeting?.summary}
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
          </Box>
          <Divider variant='middle' sx={{ width: '100%' }} />
          <Box sx={{ width: '100%', m: 2 }}>
            {meeting &&
              meeting?.toDoItem?.map((toDoItem: IToDoItem) => {
                return <ToDoRow toDoItem={toDoItem} handleGetMeeting={handleGetMeeting} meeting={meeting}/>;
              })}
          </Box>
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