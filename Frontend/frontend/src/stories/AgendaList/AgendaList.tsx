import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { Avatar, CardActionArea } from '@mui/material';
import './AgendaList.scss';
import Star from '../assets/Calender/star.png';
import { IAgenda } from '../../types/meetings';
import { useEffect } from 'react';

export interface IAgendaList {
  agendaList: IAgenda[];
}

const AgendaList: React.FC<IAgendaList> = ({ agendaList }) => {
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
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default AgendaList;
