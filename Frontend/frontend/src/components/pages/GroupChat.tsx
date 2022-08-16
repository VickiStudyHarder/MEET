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
import { useNavigate, useParams } from 'react-router-dom';
import StudyGroupIcon from '../../assets/StudyGroupIcon.png';
import PageTitle from '../../stories/PageTiltle';
import CircleLoader from 'react-spinners/CircleLoader'

interface IGroupChat { }

const theme = createTheme();

const GroupChat: React.FC<IGroupChat> = () => {
  const { email } = useContext(AppContext);
  const { id } = useParams();
  const [messages, setMessages] = useState<any>(null);
  const [GroupName, setGroupName] = useState('');
  const navigate = useNavigate();
  // loading
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [])



  useEffect(() => {
    const timer = setInterval(getMessages, 3000);
    return () => clearInterval(timer);
  }, []);

  const getMessages = async () => {
    const messages = await getGroupById(Number(id));
    setGroupName(messages.name)
    setMessages(messages.messageHistory);
    console.log(messages);
  };

  return (
    <ThemeProvider theme={theme}>
      {loading ? (
        <Box sx={{
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100vh'
        }}>
          <CircleLoader size={100} color={'#6001D3'} loading={loading} />
        </Box>

      ) : (
        <Box>
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
          }}
        >
          <Box sx={{ marginLeft: 3 }}>
            <PageTitle icon='6' content='All my group' doSomething={() => navigate(-1)} />
          </Box>
        </Box>
      </Box>
      <Divider variant='middle' sx={{ width: '100%' }} />
      <Box sx={{ display: 'flex', flexDirection: 'row', p: 6 }}>
        <Box sx={{ height: '100%', m: 2 }}>
          <StudentGroupNameCard inChat={true} groupName={GroupName} />
        </Box>
        <Container
          sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}
        >
          <ChatWindow
            groupId={Number(id)}
            messages={messages}
            getMessages={getMessages}
          />
        </Container>
      </Box>
        </Box>
      )}
      
    </ThemeProvider>
  );
};

export default GroupChat;
