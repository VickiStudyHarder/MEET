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
  Container,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import NavBar from '../molecules/NavBar';
import StudentGroupNameCard from '../../stories/StudentGroupNameCard';
import CreateStudentGroupForm from '../../stories/CreateStudentGroupForm';
import ChatWindow from '../organisms/ChatWindow/ChatWindow';
import { getGroupById, getGroups } from '../../api/groupChat';
import AppContext from '../../contexts/AppContext';
import StudentGroupCard from '../../stories/StudentGroupCard';
import { useParams } from 'react-router-dom';

interface IGroupChat {}

const theme = createTheme();

const GroupChat: React.FC<IGroupChat> = () => {
  const { email } = useContext(AppContext);
  const { id } = useParams();
  const [messages, setMessages] = useState<any>(null);

  useEffect(() => {
    const timer = setInterval(getMessages, 15000);
    return () => clearInterval(timer);
  }, []);

  const getMessages = async () => {
    const messages = await getGroupById(Number(id));
    setMessages(messages.messageHistory);
    console.log(messages);
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
            All Study Groups
          </Typography>
        </Box>
      </Box>
      <Divider variant='middle' sx={{ width: '100%' }} />
      <Box sx={{ display: 'flex', flexDirection: 'row', p: 6 }}>
        <Box sx={{ height: '100%', m: 2 }}>
          <StudentGroupNameCard />
        </Box>
        <Container
          sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}
        >
          <ChatWindow groupId={Number(id)} messages={messages} getMessages={getMessages}/>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default GroupChat;
