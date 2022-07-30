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
import './AgendaCard.scss';
import Star from '../assets/Calender/star.png';


export interface AgendaCardInfo {
  number?: string;
  name?: string;
  description?: string;
}

export default function PostingAgendaCardInfo(props: AgendaCardInfo) {
  const theme = useTheme();
  return (
    <Box className="agenda-card-wrap">
      <Box className="l">
        {props.number}
      </Box>
      <Box className="c">
        <Box className="tit">
          {props.name}
        </Box>
        <Box className="desc">
          {props.description}
        </Box>
      </Box>
      <Box className="r">
        <Box className="btn btn-1">
          Change
        </Box>
        <Box className="btn btn-2">
          Create
        </Box>
      </Box>
    </Box>
  );
}
