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
import './CalendarUserCardPrimary.scss';
import Rating from "@mui/material/Rating";
import Star from '../assets/Calender/star.png';


export interface CalendarUserCardPrimaryInfo {
  name?: string;
  job?: string;
  Rating?: number;
  avator?: string;
}

export default function CalendarUserCardPrimary(props: CalendarUserCardPrimaryInfo) {
  return (
    <Box className="calender-user-card-wrap">
      <Box className="l">
        <Box className="name">
          {props.name}
        </Box>
        <Box className="desc">
          <Box className="txt">
            {props.job}
          </Box>
          <Box className="line"></Box>
        </Box>
        <Box className="star-box">
          <Rating
            name="read-only"
            size="small"
            value={props.Rating}
            readOnly
          />
        </Box>
      </Box>
      <Box className="r">
        <Avatar className="avator" src={props.avator} />
      </Box>
    </Box>
  );
}
