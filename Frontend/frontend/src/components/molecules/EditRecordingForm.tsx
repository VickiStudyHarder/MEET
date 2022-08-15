import React, { Dispatch, useContext, useState } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import GroupsTwoToneIcon from '@mui/icons-material/GroupsTwoTone';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { IToDoItem, INotes, IMeeting, IMeetingAttendee, IRecording } from '../../types/meetings';
import { AppContext } from '../../contexts/AppContext';
import { updateMeeting } from '../../api/meeting';
import { useParams } from 'react-router-dom';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

export interface IEditToDoForm {
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  handleGetMeeting: any;
  handleClose: any;
  recording: IRecording;
  meeting: IMeeting;
}

const EditRecordingForm: React.FC<IEditToDoForm> = ({
  setOpen,
  handleGetMeeting,
  handleClose,
  recording,
  meeting
}) => {
  const { id } = useParams();
  const { email } = useContext(AppContext);
  const [url, setUrl] = useState(recording.url);
  const [description, setDescription] = useState<string>(recording.description);

  const handleCreate = async (e: any) => {
    e.preventDefault();
    console.log(description);

    const recordingList: IRecording[] = [];
    recordingList.push({
      id: recording.id,
      description: description,
      url: url
    });

    const meetingUpdate = {
      recordings: recordingList,
    };
    console.log({ meetingUpdate });
    await updateMeeting(meetingUpdate, Number(id));
    await handleGetMeeting();
    handleClose();
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event);
    setDescription(event.target.value);
  };
  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event);
    setUrl(event.target.value);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexGrow: 1,
        justify: 'center',
      }}
    >
      <Card sx={{ display: 'flex', flexGrow: 1, p: 4 }}>
        <CardContent sx={{ marginRight: 3 }}>
          <Grid
            container
            direction='column'
            sx={{
              display: 'flex',
              flexGrow: 1,
              // marginLeft: 1,
              marginTop: 2,
            }}
          >
            <Grid
              container
              direction='row'
              sx={{ m: 2, display: 'flex', flexGrow: 1 }}
            >
              <Grid item sx={{ m: 'auto' }}>
                <GroupsTwoToneIcon
                  sx={{
                    fontSize: 40,
                    color: '#0CD68A',
                    m: 'auto',
                  }}
                ></GroupsTwoToneIcon>
              </Grid>

              <Grid item>
                <Typography
                  variant='body1'
                  sx={{ fontSize: 40, mx: 2, my: 'auto' }}
                >
                  Edit Recording
                </Typography>
              </Grid>
            </Grid>
            <Grid
              item
              sx={{
                m: 2,
              }}
            >
              <TextField
                id='description'
                fullWidth
                label='description'
                variant='filled'
                value={description}
                onChange={handleDescriptionChange}
              />
            </Grid>
            <Grid
              item
              sx={{
                m: 2,
              }}
            >
              <TextField
                id='url'
                fullWidth
                label='url'
                variant='filled'
                value={url}
                onChange={handleUrlChange}
              />
            </Grid>
            <Grid
              item
              container
              direction='row'
              sx={{
                display: 'flex',
                alignItem: 'center',
                justifyContent: 'flex-end',
                marginTop: 5,
              }}
            >
              <Button
                sx={{
                  display: 'flex',
                  flexGrow: 1,
                  marginRight: 5,
                  borderRadius: 8,
                  backgroundColor: '#6001D3',
                  color: '#FFFFFF',
                  fontSize: 12,
                }}
                variant='contained'
                onClick={handleCreate}
              >
                Edit
              </Button>
              <Button
                sx={{
                  minWidth: '100px',
                  minHeight: '50px',
                  maxHeight: '50px',
                  maxWidth: '100px',
                  borderRadius: 8,
                  backgroundColor: '#FCDC00',
                  color: '#000000',
                  fontSize: 12,
                }}
                variant='contained'
                onClick={() => {
                  handleClose();
                }}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EditRecordingForm;
