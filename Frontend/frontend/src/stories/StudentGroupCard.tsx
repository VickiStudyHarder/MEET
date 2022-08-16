import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Avatar, Button, CardActionArea } from '@mui/material';
import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined';
import AppContext from '../contexts/AppContext';
import { joinGroup, leaveGroup } from '../api/groupChat';
import { IStudentGroupCard } from '../types/groups';
import { useNavigate } from 'react-router-dom';
import GroupImage from '../assets/GroupImage.png';

const StudentGroupCard: React.FC<IStudentGroupCard> = ({
  id,
  name,
  description,
  groupParticipant,
  userIsParticipant,
  getAllGroups,

}) => {
  const { email } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [snackBarMessage, setSnackBarMessage] = useState('');

  const handleJoinGroup = async () => {
    const { status, data } = await joinGroup(email, name);
    if (status === 200) {
      console.log(data);
      setSnackBarMessage(`Successfully left ${data.event.body.name}`);
      setOpen(true);
      getAllGroups();
    }
  };

  const handleLeaveGroup = async () => {
    const { status, data } = await leaveGroup(email, name);
    if (status === 200) {
      console.log(data);
      setSnackBarMessage(`Successfully left ${data.event.body.name}`);
      setOpen(true);
      getAllGroups();
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexGrow: 1,
        width: 380,
        maxWidth: '45%',
        height: 313,
        m: 2,
      }}
    >
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          borderRadius: 5,
          p: 4,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexGrow: 1,
            flexDirection: 'row',
            height: '50%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flex: 1,
              flexDirection: 'row',
            }}
          >
            <Box sx={{ m: 'auto' }}>
              <img src={GroupImage} alt='GroupImage' height='100' width='100' />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', flexGrow: 1 }}>
            {userIsParticipant ? (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  m: 'auto',
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'row', marginTop:2 }}>
                  <Button
                    onClick={() => {
                      navigate(`/group/${id}`);
                    }}
                  >
                    <Typography variant='body1' color='black'>
                      Revisit
                    </Typography>
                    <ArrowRightAltOutlinedIcon
                      style={{ color: 'black' }}
                      sx={{ ml: 2 }}
                    />
                  </Button>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                  <Button onClick={handleLeaveGroup}>
                    <Typography variant='body1' color='black'>
                      Leave
                    </Typography>
                    <ArrowRightAltOutlinedIcon
                      style={{ color: 'black' }}
                      sx={{ ml: 2 }}
                    />
                  </Button>
                </Box>
                <Typography
              variant='body1'
              component='h2'
              sx={{
                mx: 'auto',
                my:2,
                color: '#70798B',
                fontSize: 14,
                textAlign: 'left',
                mt: 15
              }}
            >
              {groupParticipant.length} Members
            </Typography>
              </Box>
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  m: 'auto',
                }}
              >
                <Button onClick={handleJoinGroup} sx={{marginTop:2}}>
                  <Typography variant='body1' color='black' sx={{ m: 'auto'}}>
                    Join
                  </Typography>
                  <ArrowRightAltOutlinedIcon
                    style={{ color: 'black' }}
                    sx={{ ml: 2 }}
                  />
                </Button>
                <Typography
              variant='body1'
              component='h2'
              sx={{
                mx: 'auto',
                my:2,
                color: '#70798B',
                fontSize: 14,
                textAlign: 'left',
                mt: 20
              }}
            >
              {groupParticipant.length} Members
            </Typography>
              </Box>
            )}
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '50%',
            alignaItems: 'flex-start',
            py: 2,
          }}
        >
          <Box sx={{ width: '50%', pl: 2 }}>
            <Typography
              variant='body1'
              component='h1'
              sx={{
                mx: 'auto',
                my:2,
                fontSize: '1.5rem',
                fontWeight: 600,
                textAlign: 'left',
              }}
            >
              {name}
            </Typography>
            <Typography
              variant='body1'
              component='h2'
              sx={{
                mx: 'auto',
                my:2,
                color: '#70798B',
                fontSize: 14,
                textAlign: 'left',
              }}
            >
              {description}
            </Typography>

          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default StudentGroupCard;
