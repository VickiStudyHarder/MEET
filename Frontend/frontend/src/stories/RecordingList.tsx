import { Avatar, Button, Card, Divider, Fab, IconButton, List, ListItem, ListItemAvatar, ListItemText, Modal, TextField, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";
import { pink } from '@mui/material/colors';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import RecordingModal from './RecordingModal'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

interface ListProps {
  createdBy: string;
  meetingName: string;
  pic: string;
  // role: student/mentor
  role: string;
  description: string,
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
export default function RecordingList({

  meetingName = "",
  pic = "",
  role = 'student',
  description = '',
  ...props
}: ListProps) {

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper', minWidth: 1200 }}>
      <ListItem alignItems="center" >
        {
          role === 'student' && (
            <Box sx={{ width: '100%' }}>
              <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Avatar sx={{ width: 150, height: 150, margin: 6, marginLeft: 3 }} variant='circular' src={pic} />
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', maxWidth: '70%' }}>
                      <Box sx={{ flex: 1 }}>
                        <Typography component="div" variant="h5" marginTop={8}>
                          {meetingName}
                        </Typography>
                        <Typography variant="subtitle2" color="text.secondary" component="div" marginTop={2} marginBottom={5}>
                          {description}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: "center", marginRight: 5 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                      <Fab style={{ backgroundColor: '#6001D3', marginRight: 20 }} aria-label="delete recording" size="medium">
                        <PlayArrowIcon style={{ fontSize: 35, margin: 10, color: '#ffffff' }} />
                      </Fab>
                      <Fab style={{ backgroundColor: '#6001D3', marginLeft: 20 }} aria-label="delete recording" size="medium">
                        <CloudDownloadIcon style={{ fontSize: 30, margin: 10, color: '#ffffff' }} />
                      </Fab>
                    </Box>
                  </Box>
                </Box>
              </Card>
            </Box>
          )}
        {
          role === 'mentor' && (
            <Box sx={{ width: '100%' }}>
              <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Avatar sx={{ width: 150, height: 150, margin: 6, marginLeft: 3 }} variant='circular' src={pic} />
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1 }}>
                      <Box sx={{ flex: 1 }}>
                        <Typography component="div" variant="h5" marginTop={8}>
                          {meetingName}
                        </Typography>
                        <Typography variant="subtitle2" color="text.secondary" component="div" marginTop={2} marginBottom={5}>
                          {description}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: "center", marginRight: 5 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                      <Box marginRight={5}>
                        <RecordingModal
                          meetingName={meetingName}
                          pic={pic}
                          description={description}
                          type='delete'
                        ></RecordingModal>
                      </Box>
                      <RecordingModal
                        meetingName={meetingName}
                        pic={pic}
                        description={description}
                        type='edit'
                      ></RecordingModal>
                    </Box>
                  </Box>
                </Box>
              </Card>
            </Box>
          )
        }

      </ListItem >
      <Divider variant="inset" component="li" />
    </List >
  );
};