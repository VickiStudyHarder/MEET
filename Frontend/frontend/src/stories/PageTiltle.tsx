import { Avatar, Button, Card, Divider, Fab, List, ListItem, ListItemAvatar, ListItemText, Modal, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";
import LiveTvIcon from '@mui/icons-material/LiveTv';
import GroupIcon from '@mui/icons-material/Group';
import DateRangeIcon from '@mui/icons-material/DateRange';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CommentIcon from '@mui/icons-material/Comment';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

interface TitleProps {
  content: string;
  // icon: 1/2/3/4
  icon: string;
}



/**
 * Primary UI component for user interaction
 */
export default function PageTitle({
  content,
  icon,
  ...props
}: TitleProps) {

  return (
    <>
      {
        icon === '1' && (
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Fab style={{ backgroundColor: '#FCDC00' }} aria-label="delete recording" size="medium">
              <LiveTvIcon style={{ fontSize: 30, color: '#ffffff' }} />
            </Fab>
            <Typography component="div" variant="h4" sx={{ marginTop: 0.5, marginLeft: 5 }} >
              {content}
            </Typography>
          </Box>
        )}
      {
        icon === '2' && (
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Fab style={{ backgroundColor: '#0CD68A' }} aria-label="delete recording" size="medium">
              <GroupIcon style={{ fontSize: 33, color: '#ffffff' }} />
            </Fab>
            <Typography component="div" variant="h4" sx={{ marginTop: 0.5, marginLeft: 5 }} >
              {content}
            </Typography>
          </Box>
        )}
      {
        icon === '3' && (
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Fab style={{ backgroundColor: '#FD346E' }} aria-label="delete recording" size="medium">
              <NotificationsIcon style={{ fontSize: 30, color: '#ffffff' }} />
            </Fab>
            <Typography component="div" variant="h4" sx={{ marginTop: 0.5, marginLeft: 5 }} >
              {content}
            </Typography>
          </Box>
        )}
      {
        icon === '4' && (
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Fab style={{ backgroundColor: '#6001D3' }} aria-label="delete recording" size="medium">
              <AttachFileIcon style={{ fontSize: 30, color: '#ffffff' }} />
            </Fab>
            <Typography component="div" variant="h4" sx={{ marginTop: 0.5, marginLeft: 5 }} >
              {content}
            </Typography>
          </Box>
        )}

      {
        icon === '5' && (
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Fab style={{ backgroundColor: '#6001D3' }} aria-label="delete recording" size="medium">
              <WorkspacePremiumIcon style={{ fontSize: 33, color: '#ffffff' }} />
            </Fab>
            <Typography component="div" variant="h4" sx={{ marginTop: 0.5, marginLeft: 5 }} >
              {content}
            </Typography>
          </Box>
        )}






    </>

  );
};