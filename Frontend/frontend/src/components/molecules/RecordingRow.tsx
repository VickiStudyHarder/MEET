import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Divider, Dialog, Fab } from '@mui/material';
import Link from '@material-ui/core/Link';
import { IToDoItem, IMeeting, IRecording } from '../../types/meetings';
import YourMeetingImage from '../../assets/recording.png';
import MeetingsArrow from '../../assets/MeetingsArrow.png';
import { deleteRecordingItem } from '../../api/meeting';
import EditRecordingForm from './EditRecordingForm';
import LinkIcon from '@mui/icons-material/Link';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AppContext from '../../contexts/AppContext';

export interface IRecordingRow {
  recording: IRecording;
  handleGetMeeting: any;
  meeting: IMeeting;
  role: string;
  title: string;
}

const RecordingRow: React.FC<IRecordingRow> = ({
  recording,
  handleGetMeeting,
  meeting,
  title,
  role,
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
          <img src={YourMeetingImage} style={{ width:380, height:220,borderRadius: 20 ,boxShadow: '-15px 30px 30px rgba(8, 20, 32, 0.2)'}} alt='YourMeetingImage' />
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

          <Typography component="div" variant="h3" marginTop={0} style={{ fontFamily: "Quicksand" }}>
            {title}
          </Typography>
          <Typography variant="h6" color="text.secondary" component="div" marginTop={2} marginBottom={5} style={{ fontFamily: "Quicksand" }}>
            {recording.description}
          </Typography>

        </Box>
        {  role === 'mentor' ?  (<Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            m: 'auto',
            marginRight: 5
          }}
        >

          <a target='_blank' href={modifiedUrl} rel='noreferrer'>
            <Fab style={{ backgroundColor: '#6001D3', marginRight: 30 }} aria-label="delete recording" size="medium" >
              <PlayArrowIcon style={{ fontSize: 35, margin: 10, color: '#ffffff' }} />
            </Fab>
          </a>
          <Fab onClick={() => { setOpen(true); }} color="secondary" style={{ backgroundColor: '#6001D3', marginRight: 30 }} aria-label="manage recording" size="medium">
            <EditIcon style={{ fontSize: 30, margin: 10 }} />
          </Fab>


          <Fab onClick={handleDelete} style={{ backgroundColor: '#6001D3' }} aria-label="delete recording" size="medium">
            <DeleteOutlineIcon style={{ fontSize: 35, margin: 10, color: '#ffffff' }} />
          </Fab>
        </Box>) : (
          <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            m: 'auto',
            marginRight: 5
          }}
        >

          <a target='_blank' href={modifiedUrl} rel='noreferrer' style={{ fontFamily: "Quicksand" }}>
            <Fab style={{ backgroundColor: '#6001D3', marginRight: 30 }} aria-label="delete recording" size="medium" >
              <PlayArrowIcon style={{ fontSize: 35, margin: 10, color: '#ffffff' }} />
            </Fab>
          </a>
        </Box>
        )}

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
