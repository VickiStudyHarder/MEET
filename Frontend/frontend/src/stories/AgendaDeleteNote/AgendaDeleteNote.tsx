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
import './AgendaDeleteNote.scss';
import Star from '../assets/Calender/star.png';


export interface AgendaDeleteNoteInfo {
  title?: string;
  desc?: string;
  author?: string;
  time?: string;
}

export default function PostingAgendaDeleteNoteInfo(props: AgendaDeleteNoteInfo) {
  const theme = useTheme();
  return (
    <Box className="agenda-delete-note-wrap">
      <Box className="l"></Box>
      <Box className="c">
        <Box className="tit">
          {props.title}
        </Box>
        <Box className="desc">
          {props.desc}
        </Box>
      </Box>
      <Box className="r">
        Delete
      </Box>
      <Box className="tip">
        <span>By {props.author} .</span>
        <span>Posted {props.time} </span>
      </Box>
    </Box>
  );
}
