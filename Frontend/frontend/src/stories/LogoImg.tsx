import { Avatar, Button, Card, CardActionArea, CardContent, Divider, Fab, List, ListItem, ListItemAvatar, ListItemText, Modal, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useNavigate } from "react-router-dom";
import { Height } from "@mui/icons-material";
import GroupsIcon from '@mui/icons-material/Groups';

interface ListProps {
  title?: string,
  content?: string,

}


/**
 * Primary UI component for user interaction
 */
export default function Logo({
  title,
  content,
  ...props
}: ListProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row' }} >
      <Box sx={{ backgroundColor: '#6001D3', width: 45, height: 45, borderRadius: 3, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <GroupsIcon style={{ fontSize: 33, color: '#ffffff' }} />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft:1 }}>
      <Typography variant="h6" component="div" fontWeight={'bold'} marginTop={-0.5} >
                      {title}
      </Typography>
      <Typography variant="body2" component="div"  >
                      {content}
      </Typography>
      </Box>

    </Box>
  );
};