import { Avatar, Button, Card, Divider, Fab, List, ListItem, ListItemAvatar, ListItemText, Modal, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

interface ListProps {
  createdBy: string;
  meetingName: string;
  pic: string;
  // role: student/mentor
  role: string;
  description: string,
  numberOfNotes: string
  onClick?: () => void;
}

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '95%',
  bgcolor: 'background.paper',
  boxShadow: 24,
};

/**
 * Primary UI component for user interaction
 */
export default function NoteListIndex({
  createdBy = "",
  meetingName = "",
  pic = "",
  role = 'student',
  description = '',
  numberOfNotes = '0',
  ...props
}: ListProps) {

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper', minWidth: 1200 }}>
      <ListItem alignItems="center" >
        {
          role === 'student' && (
            <Box sx={{ width: '100%' }}>
              <Card sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                  <Avatar sx={{ width: 380, height: 220, borderRadius: 5, margin: 6, marginLeft: 3 }} variant='rounded' src={pic} />
                  <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Box sx={{ flex: '1 100 auto' }}>
                      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        <Typography variant="subtitle2" style={{ color: '#6001D3' }} component="div" marginTop={8} marginBottom={5} fontWeight={'bold'}>
                          {numberOfNotes} Notes &nbsp;
                        </Typography>
                        <Typography variant="subtitle2" color="text.secondary" component="div" marginTop={8} marginBottom={5}>
                          By {createdBy}
                        </Typography>
                      </Box>

                      <Typography component="div" variant="h4" fontWeight={'bold'}>
                        {meetingName}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', marginRight: 10 }}>
                  <Fab style={{ backgroundColor: '#6001D3' }} aria-label="delete recording" size="medium">
                    <KeyboardArrowRightIcon style={{ fontSize: 40, margin: 10, color: '#ffffff' }} />
                  </Fab>

                </Box>
              </Card>
            </Box>
          )}
        {
          role === 'mentor' && (
            <Box sx={{ width: '100%' }}>
              <Card sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                  <Avatar sx={{ width: 380, height: 220, borderRadius: 5, margin: 6, marginLeft: 3 }} variant='rounded' src={pic} />
                  <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Box sx={{ flex: '1 100 auto' }}>
                      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        <Typography variant="subtitle2" style={{ color: '#6001D3' }} component="div" marginTop={8} marginBottom={5} fontWeight={'bold'}>
                          {numberOfNotes} Notes &nbsp;
                        </Typography>
                        <Typography variant="subtitle2" color="text.secondary" component="div" marginTop={8} marginBottom={5}>
                          By {createdBy}
                        </Typography>
                      </Box>
                      <Typography component="div" variant="h4" fontWeight={'bold'}>
                        {meetingName}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', marginRight: 10 }}>
                  <Fab style={{ backgroundColor: '#6001D3' }} aria-label="delete recording" size="medium">
                    <KeyboardArrowRightIcon style={{ fontSize: 40, margin: 10, color: '#ffffff' }} />
                  </Fab>
                </Box>
              </Card>
            </Box>
          )}

      </ListItem>
      <Divider variant="inset" component="li" />
    </List>
  );
};