import { ThemeProvider } from '@emotion/react';
import {
  Box,
  createTheme,
  CssBaseline,
  Typography,
  Button,
  Divider,
  Dialog,
  Grid,
  Container
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import NavBar from '../molecules/NavBar';
import StudentGroupNameCard from '../../stories/StudentGroupNameCard';
import CreateStudentGroupForm from '../../stories/CreateStudentGroupForm';
import ChatWindow from '../organisms/ChatWindow/ChatWindow';
import { getGroups } from '../../api/groupChat';
import AppContext from '../../contexts/AppContext';
import StudentGroupCard from '../../stories/StudentGroupCard';

interface IGroup {}

const theme = createTheme();

const Group: React.FC<IGroup> = () => {
  const { email } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [myGroups, setMyGroups] = useState<any>(null);
  const [availableGroups, setAvailableGroups] = useState<any>(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getAllGroups();
  }, []);

  const getAllGroups = async () => {
    const allGroups = await getGroups();
    const myGroups: any[] = [];
    const availableGroups: any[] = [];
    allGroups.map((group: any) => {
      if (
        group.groupParticipant.filter(
          (participant: any) => participant.userId === email
        ).length > 0
      ) {
        myGroups.push(group);
      } else {
        availableGroups.push(group);
      }
    });
    setMyGroups(myGroups);
    setAvailableGroups(availableGroups);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            px: 10,
            py: 2,
          }}
        >
          <Typography sx={{ display: 'flex', flexGrow: 1 }}>
            Study Hard-Study Group
          </Typography>
          <Button onClick={handleClickOpen} variant='contained'>
            +Add
          </Button>
        </Box>
      </Box>
      <Divider variant='middle' sx={{ width: '100%' }} />
      <Box sx={{ display: 'flex', flexDirection: 'row', p: 6 }}>
        <Box sx={{ height: '100%' }}>
          <StudentGroupNameCard />
        </Box>
        <Container sx={{ display: 'flex', flexDirection: 'column', width: '100%'}} >
        <Box sx={{ display: 'flex', flexGrow: 1, m: 2, width: '100%' }}>
          <Grid container spacing={2}>
            {myGroups &&
              myGroups.map((group: any) => {
                return (
                  <StudentGroupCard
                    name={group.name}
                    groupParticipant={group.groupParticipant}
                    description={group.description}
                    userIsParticipant={true}
                  />
                );
              })}
          </Grid>
        </Box>
        <Box sx={{ display: 'flex', flexGrow: 1, m: 2 , width: '100%'}}>
          <Grid container spacing={2}>
            {availableGroups &&
              availableGroups.map((group: any) => {
                return (
                  <StudentGroupCard
                    name={group.name}
                    groupParticipant={group.groupParticipant}
                    description={group.description}
                    userIsParticipant={false}
                  />
                );
              })}
          </Grid>
          {/* <ChatWindow /> */}
        </Box>
        </Container>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        sx={{ display: 'flex', flexGrow: 1 }}
        maxWidth='lg'
      >
        <CreateStudentGroupForm setOpen={setOpen} />
      </Dialog>
    </ThemeProvider>
  );
};

export default Group;
