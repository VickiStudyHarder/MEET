import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Divider } from '@mui/material';
import { IMeeting } from '../../types/meetings';
import YourMeetingImage from '../../assets/YourMeetingImage.png';
import MeetingsArrow from '../../assets/MeetingsArrow.png';

export interface IMeetingRow {
  meeting: IMeeting;
}

const MeetingRow: React.FC<IMeetingRow> = ({ meeting }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'row', m: 2 }}>
        <Box sx={{ m: 4 }}>
          <img src={YourMeetingImage} alt='YourMeetingImage' />
        </Box>
        <Box
          sx={{ display: 'flex', flexGrow: 1, flexDirection: 'column', m: 4 }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2 }}>
            <Typography sx={{ color: '#6001D3', mr: 4 }}>
              {meeting?.notes?.length ? meeting.notes.length : '0'} Notes
            </Typography>
            <Typography>Hosted By</Typography>
          </Box>
          <Typography variant='h4' sx={{ mt: 6 }}>
            {meeting.summary}
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
              navigate(`/agenda/${meeting.id}`);
            }}
          >
            <Typography sx={{ color: 'black', mr: 2 }}>Agenda</Typography>
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
            onClick={() => {
              navigate(`/notes/${meeting.id}`);
            }}
          >
            <Typography sx={{ color: 'black', mr: 2 }}>Notes</Typography>
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
            onClick={() => {
              navigate(`/todos/${meeting.id}`);
            }}
          >
            <Typography sx={{ color: 'black', mr: 2 }}>To Dos</Typography>
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
            onClick={() => {
              navigate(`/recording/${meeting.id}`);
            }}
          >
            <Typography sx={{ color: 'black', mr: 2 }}>Recording</Typography>
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
