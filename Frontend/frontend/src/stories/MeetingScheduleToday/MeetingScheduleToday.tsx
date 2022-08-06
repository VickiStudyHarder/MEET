import * as React from "react";
import Box from "@mui/material/Box";
import './MeetingScheduleToday.scss';
import { Button } from '@mui/material';


export interface MeetingScheduleTodayInfo {
  date: Array<string>;
  meetingName?: string;
  time?: string;
}

export default function MeetingScheduleToday(props: MeetingScheduleTodayInfo) {
  return (
    <Box className="meeting-schdule-big-wrap">
      <Box className="bg">
        <Box className="date">
          <span className="d-1">{props.date[0]}</span>
          <span className="d-2">{props.date[1]}</span>
          <span className="d-3">{props.date[2]}</span>
        </Box>
        <Box className="meeting-box">
          <Box className="name">
            {props.meetingName}
          </Box>
          <Box className="line"></Box>
          <Box className="time">
            {props.time}
          </Box>
        </Box>
        <Button className="btn">
          Start
        </Button>
      </Box>
    </Box>
  );
}
