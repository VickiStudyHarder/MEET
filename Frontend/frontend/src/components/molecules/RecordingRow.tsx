import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Divider, Dialog } from '@mui/material';
import Link from '@material-ui/core/Link';
import { IToDoItem, IMeeting, IRecording } from '../../types/meetings';
import YourMeetingImage from '../../assets/YourMeetingImage.png';
import MeetingsArrow from '../../assets/MeetingsArrow.png';
import { deleteRecordingItem } from '../../api/meeting';
import EditRecordingForm from './EditRecordingForm';
import LinkIcon from '@mui/icons-material/Link';

export interface IRecordingRow {
  recording: IRecording;
  handleGetMeeting: any;
  meeting: IMeeting;
}

const RecordingRow: React.FC<IRecordingRow> = ({
  recording,
  handleGetMeeting,
  meeting,
}) => {
  const [open, setOpen] = useState(false);
  const modifiedUrl = recording.url.startsWith('https://')
    ? recording.url
    : 'https://' + recording.url;
  const navigate = useNavigate();
  const location = useLocation();

  const handleDelete = async () => {
    await deleteRecordingItem(recording.id!);
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
          sx={{
            display: 'flex',
            flexGrow: 1,
            flexDirection: 'column',
            my: 'auto',
            ml: 8,
          }}
        >
          <Typography sx={{ m: 2 }}>{recording.description}</Typography>
          <Box sx={{ m: 2 }}>
            <a target='_blank' href={modifiedUrl} rel='noreferrer'>
              <LinkIcon />
            </a>
          </Box>
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
        sx={{ display: 'flex', flexGrow: 1 }}
        maxWidth='lg'
      >
        <EditRecordingForm
          setOpen={setOpen}
          handleGetMeeting={handleGetMeeting}
          handleClose={handleClose}
          recording={recording}
          meeting={meeting}
        />
      </Dialog>
    </>
  );
};

export default RecordingRow;
