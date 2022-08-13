import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Divider } from '@mui/material';
import { INotes } from '../../types/meetings';
import YourMeetingImage from '../../assets/YourMeetingImage.png';
import MeetingsArrow from '../../assets/MeetingsArrow.png';
import { deleteNote } from '../../api/meeting';

export interface INotesRow {
  note: INotes;
  handleGetMeeting: any;
}

const MeetingRow: React.FC<INotesRow> = ({ note, handleGetMeeting }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleDelete = async () => {
    await deleteNote(note.id!);
    await handleGetMeeting();
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
          <Typography>{note.title}</Typography>
          <Typography variant='h4' sx={{ mt: 6 }}>
            {note.details}
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
    </>
  );
};

export default MeetingRow;
