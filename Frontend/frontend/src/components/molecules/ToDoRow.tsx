import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Divider, Dialog, Fab } from '@mui/material';
import { IToDoItem, IMeeting } from '../../types/meetings';
import YourMeetingImage from '../../assets/YourTodo.png';
import MeetingsArrow from '../../assets/MeetingsArrow.png';
import { deleteToDoItem } from '../../api/meeting';
import EditNoteForm from './EditToDoForm';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AppContext from '../../contexts/AppContext';

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
          <img src={"./todo.png"} style={{width:380, height:220, borderRadius: 20 ,boxShadow: '-15px 30px 30px rgba(8, 20, 32, 0.2)'}} alt='YourMeetingImage' />
        </Box>
        <Box
          sx={{ display: 'flex', flexGrow: 1, flexDirection: 'column', m: 4 ,mt:5}}
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
            flexDirection: 'row',
            m: 'auto',
            marginRight: 5
          }}
        >

          <Fab onClick={() => { setOpen(true); }} color="secondary" style={{ backgroundColor: '#6001D3', marginRight: 50 }} aria-label="manage recording" size="medium">
            <EditIcon style={{ fontSize: 30, margin: 10 }} />
          </Fab>


          <Fab onClick={handleDelete} style={{ backgroundColor: '#6001D3' }} aria-label="delete recording" size="medium">
            <DeleteOutlineIcon style={{ fontSize: 35, margin: 10, color: '#ffffff' }} />
          </Fab>
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
