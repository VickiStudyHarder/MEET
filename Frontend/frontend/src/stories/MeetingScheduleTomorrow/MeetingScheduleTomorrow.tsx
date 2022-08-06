import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Avatar, CardActionArea } from "@mui/material";
import './MeetingScheduleTomorrow.scss';

export interface MeetingScheduleTomorrowInfo {
  date: Array<string>;
  meetingName?: string;
  time?: string;
}

export default function MeetingScheduleTomorrow(props: MeetingScheduleTomorrowInfo) {
  const theme = useTheme();
  return (
    <Box className="meeting-schdule-small-wrap">
      <Box className="l">
        <Box className="name">{props.meetingName}</Box>
        <Box className="line"></Box>
        <Box className="time">
          {props.time}
        </Box>
        <Box className="txt">
          <span>Agenda</span>
          <span>→</span>
        </Box>
      </Box>
      <Box className="r">
        <span className="d-1">{props.date[0]}</span>
        <span className="d-2">{props.date[1]}</span>
        <span className="d-3">{props.date[2]}</span>
      </Box>
    </Box>
  );
}
