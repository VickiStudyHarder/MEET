import { Avatar, Button, Card, CardActionArea, CardContent, Divider, Fab, List, ListItem, ListItemAvatar, ListItemText, Modal, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useNavigate } from "react-router-dom";
import { Height } from "@mui/icons-material";
import GroupsIcon from '@mui/icons-material/Groups';
import Brand from "./Brand";

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
      <Brand></Brand>
      <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft:1 }}>
      <Typography variant="h6" component="div" fontWeight={'bold'} marginTop={-0.5} fontFamily={"Quicksand"}>
                      {title}
      </Typography>
      <Typography variant="body2" component="div" fontFamily={"Quicksand"} >
                      {content}
      </Typography>
      </Box>

    </Box>
  );
};