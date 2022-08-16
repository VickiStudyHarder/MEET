import { ThemeProvider } from '@emotion/react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {
  Box,
  createTheme,
  CssBaseline,
  Typography,
  Button,
  Divider,
  Dialog,
  Grid,
  Container,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import NavBar from '../molecules/NavBar';
import StudentGroupNameCard from '../../stories/StudentGroupNameCard';
import CreateStudentGroupForm from '../../stories/CreateStudentGroupForm';
import ChatWindow from '../organisms/ChatWindow/ChatWindow';
import { getGroups } from '../../api/groupChat';
import StudentGroupCard from '../../stories/StudentGroupCard';
import AppContext from '../../contexts/AppContext';
import StudyGroupIcon from '../../assets/StudyGroupIcon.png';
import PageTitle from '../../stories/PageTiltle';

interface IGroup { }

const theme = createTheme();

const Group: React.FC<IGroup> = () => {
  const { email } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [myGroups, setMyGroups] = useState<any>(null);
  const [availableGroups, setAvailableGroups] = useState<any>(null);
  const [showOwn, setShowOwn] = useState(false);
  const [switchButton, setSwitchButton] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const showOwnCard = () => {
    if (!showOwn) {
          setShowOwn(true)
          setSwitchButton(true)
    } else{
      setShowOwn(false)
      setSwitchButton(false)
    }

  }


  const getAllGroups = async () => {
    const allGroups = await getGroups();
    const myGroups: any[] = [];
    const availableGroups: any[] = [];
    console.log('all group:',allGroups);
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
    console.log('my group:',myGroups);
    console.log('available:',availableGroups);
  };

    useEffect(() => {
    getAllGroups();
  }, []);


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
            maxHeight: 140,
            justifyContent:'space-between'
          }}
        >

          <Box sx={{marginLeft:3}}>
              <PageTitle icon='2' content={'All my group'} />
            </Box>

            <Button onClick={handleClickOpen} variant="outlined" sx={{ borderColor: "#6001D3", color: "#6001D3" }} startIcon={<AddCircleOutlineIcon />}>
              New
            </Button>


        </Box>
      </Box>
      <Divider variant='middle' sx={{ width: '100%' }} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          p: 6,
          alignItems: 'flex-start',
        }}
      >
        <Box sx={{ height: '100%', m: 2 }}>
          {switchButton && <StudentGroupNameCard myGroups={myGroups} doSomething={showOwnCard} switchButton={true} />}
          {!switchButton && <StudentGroupNameCard myGroups={myGroups} doSomething={showOwnCard}  switchButton={false}/>}
        </Box>
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            flexShrink: 1,
            overflow:'auto',
            overflowX:'hidden',
            height:'75vh'
          }}
        >
          <Box sx={{ display: 'flex', flexGrow: 1, m: 2, width: '100%' }}>
            <Grid container spacing={2}>
              {myGroups &&
                myGroups.map((group: any) => {
                  return (
                    <StudentGroupCard
                      id={group.id}
                      name={group.name}
                      groupParticipant={group.groupParticipant}
                      description={group.description}
                      userIsParticipant={true}
                      getAllGroups={getAllGroups}
                    />
                  );
                })}
            </Grid>
          </Box>
          <Box sx={{ display: 'flex', flexGrow: 1, m: 2, width: '100%' }}>
            <Grid container spacing={2}>
              {availableGroups &&
                availableGroups.map((group: any) => {
                  return (
                    showOwn && 
                    <StudentGroupCard
                      id={group.id}
                      name={group.name}
                      groupParticipant={group.groupParticipant}
                      description={group.description}
                      userIsParticipant={false}
                      getAllGroups={getAllGroups}
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
        // sx={{ display: 'flex', flexGrow: 1 }}
        maxWidth='lg'
      >
        <CreateStudentGroupForm setOpen={setOpen} getAllGroups={getAllGroups} />
      </Dialog>
    </ThemeProvider>
  );
};

export default Group;
