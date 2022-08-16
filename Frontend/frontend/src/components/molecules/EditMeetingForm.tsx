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
import {
  IToDoItem,
  INotes,
  IMeeting,
  IMeetingAttendee,
} from '../../types/meetings';
import { AppContext } from '../../contexts/AppContext';
import { updateMeeting } from '../../api/meeting';
import { useParams } from 'react-router-dom';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export interface IEditMeetingForm {
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  handleGetMeeting: any;
  handleClose: any;
  meeting: IMeeting;
}

const EditMeetingForm: React.FC<IEditMeetingForm> = ({
  setOpen,
  handleGetMeeting,
  handleClose,
  meeting,
}) => {
  const { id } = useParams();
  const { email } = useContext(AppContext);
  const [meetingStart, setMeetingStart] = useState<Date | null>(
    new Date(meeting.meetingStart)
  );
  const [meetingEnd, setMeetingEnd] = useState<Date | null>(
    new Date(meeting.meetingEnd)
  );
  const [summary, setSummary] = useState(meeting.summary || '');
  const [location, setLocation] = useState(meeting.location || '');
  const [description, setDescription] = useState(meeting.description || '');

  const handleCreate = async (e: any) => {
    e.preventDefault();

    const attendees = meeting?.meetingAttendee?.map((attendee) => {
      delete attendee.user 
      delete attendee.meetingId 
      return attendee
    })

    const data: IMeeting = {
      summary: summary,
      location: location,
      meetingStart: meetingStart?.toISOString()!,
      meetingEnd: meetingEnd?.toISOString()!,
      description: description,
      meetingAttendee: attendees
    };

    await updateMeeting(data, meeting.id!);
    handleGetMeeting();
    handleClose();
  };

  const handleSetSummary = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSummary(event.target.value);
  };

  const handleSetDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleSetLocation = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
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
            }}
          >
            <Grid
              container
              direction='row'
              sx={{ display: 'flex', flexGrow: 1 }}
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
                  Edit Meeting
                </Typography>
              </Grid>
            </Grid>
            <Grid
              item
              sx={{
                m: 1,
              }}
            >
              <TextField
                id='summary'
                fullWidth
                label='summary'
                variant='filled'
                value={summary}
                onChange={handleSetSummary}
              />
            </Grid>
            <Grid
              item
              sx={{m:1
              }}
            >
              <TextField
                id='location'
                fullWidth
                label='location'
                variant='filled'
                value={location}
                onChange={handleSetLocation}
              />
            </Grid>
            <Grid
              item
              sx={{
                m: 1,
              }}
            >
              <TextField
                id='description'
                fullWidth
                label='description'
                variant='filled'
                value={description}
                onChange={handleSetDescription}
              />
            </Grid>
            <Grid
              item
              sx={{
                m: 1,
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  label='Meeting Start'
                  value={meetingStart}
                  onChange={(value: Date | null) => setMeetingStart(value)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid
              item
              sx={{
                m: 1,
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  label='Meeting End'
                  value={meetingEnd}
                  onChange={(value: Date | null) => setMeetingEnd(value)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid
              item
              sx={{
                m: 2,
              }}
            ></Grid>

            <Grid
              item
              container
              direction='row'
              sx={{
                display: 'flex',
                alignItem: 'center',
                justifyContent: 'flex-end',
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

export default EditMeetingForm;
