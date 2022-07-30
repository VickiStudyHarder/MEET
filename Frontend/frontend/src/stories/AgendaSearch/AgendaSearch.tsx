import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { Avatar, CardActionArea } from "@mui/material";
import './AgendaSearch.scss';
import Star from '../assets/Calender/star.png';


export interface CalendarUserCardMiniInfo {
  avator?: string;
  name?: string;
}

export default function PostingCard(props: CalendarUserCardMiniInfo) {
  const theme = useTheme();
  return (
    <Box className="agenda-search-wrap">
      <input className="l" type="text" placeholder="zoom link here" />
      <Box className="r">
        Rating
      </Box>
    </Box>
  );
}
