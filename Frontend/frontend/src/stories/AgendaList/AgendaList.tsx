import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { Avatar, CardActionArea } from '@mui/material';
import './AgendaList.scss';
import { IAgenda } from '../../types/meetings';
import MeetingsArrow from '../../assets/MeetingsArrow.png';
import { useEffect } from 'react';

export interface IAgendaList {
  agendaList: IAgenda[];
}

const AgendaList: React.FC<IAgendaList> = ({ agendaList }) => {
  const [open, setOpen] = useState(false);

  return (
    <Box className='agenda-list-wrap' sx={{ height: '100%' }}>
      <Box className='title'>Agenda list</Box>
      <Box className='box'>
        {agendaList.map((item: IAgenda, index) => (
          <Box className='item' key={index}>
            <Box className='l'>{index + 1}</Box>
            <Box className='r'>
              <Box className='tit'>{item.title}</Box>
              <Box className='desc'>{item.details} </Box>
            </Box>
            <Box>
              <Button
                sx={{ mx: 'auto', width: '100%' }}
                style={{ justifyContent: 'flex-end' }}
                onClick={() => {
                  setOpen(true);
                }}
              >
                <Typography variant='subtitle2' sx={{ color: 'black', mr: 2 }}>
                  Edit
                </Typography>
                <img
                  src={MeetingsArrow}
                  alt='meeting-arrow'
                  width='30'
                  height='30'
                />
              </Button>
              <Button
                sx={{ mx: 'auto', width: '100%' }}
                style={{ justifyContent: 'flex-end' }}
              >
                <Typography variant='subtitle2' sx={{ color: 'black', mr: 2 }}>
                  Delete
                </Typography>
                <img
                  src={MeetingsArrow}
                  alt='meeting-arrow'
                  width='30'
                  height='30'
                />
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default AgendaList;
