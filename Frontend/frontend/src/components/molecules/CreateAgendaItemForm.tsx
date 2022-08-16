import React, { Dispatch, useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import GroupsTwoToneIcon from '@mui/icons-material/GroupsTwoTone';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { IMeeting, IAgenda } from '../../types/meetings';
import { AppContext } from '../../contexts/AppContext';
import { updateMeeting } from '../../api/meeting';
import { useParams } from 'react-router-dom';
import PageTitle from '../../stories/PageTiltle';
import CustomInput from '../../stories/Input';

interface ICreateAgendaItemForm {
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  meeting: IMeeting;
  handleGetMeeting: any;
  handleClose: any;
}

const CreateAgendaItemForm: React.FC<ICreateAgendaItemForm> = ({
  setOpen,
  meeting,
  handleGetMeeting,
  handleClose,
}) => {
  const { id } = useParams();
  const { email } = useContext(AppContext);
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');

  const handleCreate = async (e: any) => {
    e.preventDefault();
    const agenda: IAgenda[] = [];
    agenda.push({
      title: title,
      details: details,
    });

    const meetingUpdate = {
      agendas: agenda,
    };
    await updateMeeting(meetingUpdate, Number(id));
    handleGetMeeting();
    handleClose();
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event);
    setTitle(event.target.value);
  };

  const handleDetailsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDetails(event.target.value);
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
        <CardContent sx={{ marginRight: 1 }}>
          <Grid
            container
            direction='column'
            sx={{
              display: 'flex',
              flexGrow: 1,
              marginTop: 2,
            }}
          >
            <Grid
              container
              direction='row'
              sx={{ m: 2, display: 'flex', flexGrow: 1 }}
            >
              <Grid item sx={{ m: 'auto' }}>
              <PageTitle icon='3' content={'Create Agenda Item'} />
              </Grid>
              {/* <Grid item sx={{ m: 'auto' }}>
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
                  Create Agenda Item
                </Typography>
              </Grid> */}
            </Grid>

            {/* <Grid item>
              <TextField
                id='title'
                fullWidth
                label='title'
                variant='filled'
                sx={{
                  marginTop: 5,
                }}
                value={title}
                onChange={handleTitleChange}
              />
            </Grid> */}
            <CustomInput
              margin='normal'
              fullWidth
              id='title'
              label='title'
              autoFocus
              value={title}
              onChange={handleTitleChange}
            />
            {/* <Grid item>
              <TextField
                id='details'
                fullWidth
                label='details'
                variant='filled'
                sx={{
                  marginTop: 6,
                }}
                value={details}
                onChange={handleDetailsChange}
              />
            </Grid> */}
            <CustomInput
              margin='normal'
              fullWidth
              id='details'
              label='details'
              autoFocus
              value={details}
              onChange={handleDetailsChange}
            />
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
                  minWidth: '150px',
                  minHeight: '50px',
                  maxHeight: '50px',
                  maxWidth: '100px',
                  marginRight: 6,
                  marginLeft: 0,
                  borderRadius: 8,
                  backgroundColor: '#6001D3',
                  color: '#FFFFFF',
                  fontSize: 12,
                }}
                variant='contained'
                onClick={handleCreate}
              >
                Create
              </Button>
              <Button
                sx={{
                  minWidth: '150px',
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

export default CreateAgendaItemForm;
