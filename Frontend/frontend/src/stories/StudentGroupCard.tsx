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
      <Card sx={{ display: 'flex', flexGrow: 1, borderRadius: 5 }}>
        <CardActionArea>
          <CardContent
            sx={{ display: 'flex', flexDirection: 'row', flexGrow: 1, p: 8 }}
          >
            <Box
              sx={{
                display: 'flex',
                flex: 1,
                flexDirection: 'column',
                my: 'auto',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  my: 'auto',
                }}
              >
                <Avatar
                  alt='Remy Sharp'
                  src='https://live.staticflickr.com/65535/52235254195_e710148a39_t.jpg'
                  sx={{ width: 85, height: 85, m: 2 }}
                />
              </Box>
              <Typography
                variant='body1'
                component='h1'
                sx={{
                  m: 2,
                  fontSize: '1.5rem',
                  fontWeight: 600,
                }}
              >
                {name}
              </Typography>
              <Typography
                variant='body1'
                component='h2'
                sx={{
                  m: 2,
                  color: '#70798B',
                  fontSize: 14,
                }}
              >
                {groupParticipant.length} Members
              </Typography>
            </Box>
            {userIsParticipant ? (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  my: 'auto',
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                  <Button
                    onClick={() => {
                      navigate(`/group/${id}`);
                    }}
                  >
                    <Typography variant='body1'>Revisit</Typography>
                    <ArrowRightAltOutlinedIcon />
                  </Button>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                  <Button onClick={handleLeaveGroup}>
                    <Typography variant='body1'>Leave</Typography>
                    <ArrowRightAltOutlinedIcon />
                  </Button>
                </Box>
              </Box>
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  my: 'auto',
                }}
              >
                <Button onClick={handleJoinGroup}>
                  <Typography variant='body1' sx={{ m: 'auto' }}>
                    Join
                  </Typography>
                  <ArrowRightAltOutlinedIcon />
                </Button>
              </Box>
            )}
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
};

export default StudentGroupCard;
