import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Divider, Dialog } from '@mui/material';
import { IToDoItem, IMeeting } from '../../types/meetings';
import YourMeetingImage from '../../assets/YourMeetingImage.png';
import MeetingsArrow from '../../assets/MeetingsArrow.png';
import { deleteToDoItem } from '../../api/meeting';
import EditNoteForm from './EditToDoForm';

export interface IToDoItemRow {
  toDoItem: IToDoItem;
  handleGetMeeting: any;
  meeting: IMeeting;
}

const ToDoRow: React.FC<IToDoItemRow> = ({ toDoItem, handleGetMeeting, meeting}) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const date = new Date(toDoItem.dueDate).toLocaleString('en-AU', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const handleDelete = async () => {
    await deleteToDoItem(toDoItem.id!);
    await handleGetMeeting();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'row', m: 2 }}>
        <Box sx={{ m: 4 }}>
          <img src={YourMeetingImage} alt='YourMeetingImage' />
        </Box>
        <Box
          sx={{ display: 'flex', flexGrow: 1, flexDirection: 'column', m: 4 }}
        >
          <Typography>
            <>Due Date: {date}</>
          </Typography>
          <Typography variant='h4' sx={{ mt: 6 }}>
            {toDoItem.title}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            m: 'auto',
            width: '20%',
          }}
        >
          <Button
            sx={{ mx: 'auto', width: '100%' }}
            style={{ justifyContent: 'flex-end' }}
            onClick={() => {
              setOpen(true);
            }}
          >
            <Typography sx={{ color: 'black', mr: 2 }}>Edit</Typography>
            <img
              src={MeetingsArrow}
              alt='meeting-arrow'
              width='40'
              height='40'
            />
          </Button>
          <Button
            sx={{ mx: 'auto', width: '100%' }}
            style={{ justifyContent: 'flex-end' }}
            onClick={handleDelete}
          >
            <Typography sx={{ color: 'black', mr: 2 }}>Delete</Typography>
            <img
              src={MeetingsArrow}
              alt='meeting-arrow'
              width='40'
              height='40'
            />
          </Button>
        </Box>
      </Box>
      <Divider variant='middle' sx={{ width: '100%' }} />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        // sx={{ display: 'flex', flexGrow: 1 }}
        maxWidth='lg'
      >
        <EditNoteForm
          setOpen={setOpen}
          handleGetMeeting={handleGetMeeting}
          handleClose={handleClose}
          toDoItem={toDoItem}
          meeting={meeting}
        />
      </Dialog>
    </>
  );
};

export default ToDoRow;
