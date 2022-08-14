import React, { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { Avatar, CardActionArea, Box, Typography } from '@mui/material';
import './MeetingScheduleTomorrow.scss';
import { IMeeting } from '../../types/meetings';

export interface IUpcomingMeeingCard {
  meeting: IMeeting;
}

const UpcomingMeetingCard: React.FC<IUpcomingMeeingCard> = ({ meeting }) => {
  const theme = useTheme();
  const start = new Date(meeting.meetingStart).toLocaleString('en-AU', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  const end = new Date(meeting.meetingEnd).toLocaleString('en-AU', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  const month = new Date(meeting.meetingStart).toLocaleString('default', {
    month: 'short',
  });

  return (
    <Box className='meeting-schdule-small-wrap' sx={{ m: 2 }}>
      <Box className='l'>
        <Box className='name'>{meeting.summary}</Box>
        <Box className='line'></Box>
        <Box sx={{ display: 'flex', flexDirection: 'column' }} className='time'>
          <Typography variant="subtitle2">
            <b>Start: </b> {start}
          </Typography>
          <Typography variant="subtitle2">
            <b>End: </b>
            {end}
          </Typography>
        </Box>
        {/* <Box className='txt'>
          <span>Agenda</span>
          <span>→</span>
        </Box> */}
      </Box>
      <Box className='r'>
        <span className='d-1'>{new Date(meeting.meetingStart).getDay()}</span>
        <span className='d-2'>{month}</span>
        <span className='d-3'>{new Date(meeting.meetingStart).getFullYear()}</span>
      </Box>
    </Box>
  );
};

export default UpcomingMeetingCard;
