import React, { useState } from 'react';
import { Box, Button, Dialog, Typography } from '@mui/material';
import { IAgenda } from '../../types/meetings';
import EditAgendaForm from './EditAgendaForm';
import '../../stories/AgendaList/AgendaList.scss';

import MeetingsArrow from '../../assets/MeetingsArrow.png';
import { deleteAgendaItem } from '../../api/meeting';

export interface IAgendaListItem {
  item: IAgenda;
  index: number;
  handleGetMeeting: any;
}

const AgendaListItem: React.FC<IAgendaListItem> = ({
  item,
  index,
  handleGetMeeting,
}) => {
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    await deleteAgendaItem(item.id!);
    handleGetMeeting();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
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
          <img src={MeetingsArrow} alt='meeting-arrow' width='30' height='30' />
        </Button>
        <Button
          sx={{ mx: 'auto', width: '100%' }}
          style={{ justifyContent: 'flex-end' }}
          onClick={handleDelete}
        >
          <Typography variant='subtitle2' sx={{ color: 'black', mr: 2 }}>
            Delete
          </Typography>
          <img src={MeetingsArrow} alt='meeting-arrow' width='30' height='30' />
        </Button>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        sx={{ display: 'flex', flexGrow: 1 }}
        maxWidth='lg'
      >
        <EditAgendaForm
          setOpen={setOpen}
          handleGetMeeting={handleGetMeeting}
          handleClose={handleClose}
          agenda={item}
        />
      </Dialog>
    </Box>
  );
};

export default AgendaListItem;
