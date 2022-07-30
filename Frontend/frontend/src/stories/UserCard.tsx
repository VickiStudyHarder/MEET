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
import './UserCard.scss';
import Star from './assets/star.svg';

export interface userCardInfo {
  time?: string;
  name?: string;
  star: Array<number>;
  desc?: string;
}

export default function PostingCard(props: userCardInfo) {
  const theme = useTheme();
  return (
    <Box className="user-card-wrap">
      <Box className="avator-box">
        <Avatar className="avator" alt="Remy Sharp" src="" />
        <Box className="time-box">
          <Box className="tit">Metting</Box>
          <Box className="time">{props.time}</Box>
        </Box>
      </Box>
      <Box className="name">{props.name}</Box>
      <Box className="star-box">
        {props.star.map(() =>
          <img  className="star" src={Star} alt="Build" />
        )}
      </Box>
      <Box className="desc">
        {props.desc}
      </Box>
      <Box className="btn-box">
        <Box className="btn-l">Approve</Box>
        <Box className="btn-r">Deny</Box>
      </Box>
    </Box>
  );
}
