import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { Avatar, CardActionArea } from "@mui/material";
import './CalendarUserCardMini.scss';
import Star from '../assets/Calender/star.png';


export interface CalendarUserCardMiniInfo {
  avator?: string;
  name?: string;
}

export default function PostingCard(props: CalendarUserCardMiniInfo) {
  const theme = useTheme();
  return (
    <Box className="calender-user-card-mini-wrap">
      <Box className="img-box">
        <Avatar className="avator" src={props.avator} />
      </Box>
      <Box className="main">
        <Box className="name"> 
          {props.name}
        </Box>
      </Box>
    </Box>
  );
}
