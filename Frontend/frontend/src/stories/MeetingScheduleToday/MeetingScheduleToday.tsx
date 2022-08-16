import * as React from "react";
import Box from "@mui/material/Box";
import "./MeetingScheduleToday.scss";
import { Button, Typography } from "@mui/material";
import { IMeeting } from "../../types/meetings";
import { useNavigate } from "react-router-dom";

export interface ICurrentMeetingCard {
  meeting: IMeeting;
}

const CurrentMeetingCard: React.FC<ICurrentMeetingCard> = ({ meeting }) => {
  const navigate = useNavigate();
  const start = new Date(meeting.meetingStart).toLocaleString("en-AU", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const end = new Date(meeting.meetingEnd).toLocaleString("en-AU", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const month = new Date(meeting.meetingStart).toLocaleString("default", {
    month: "short",
  });
  return (
    <Box className="meeting-schdule-big-wrap" sx={{ m: 2 }}>
      <Box className="bg">
        <Box className="date">
          <span className="d-1">{new Date(meeting.meetingStart).getDay()}</span>
          <span className="d-2">{month}</span>
          <span className="d-3">
            {new Date(meeting.meetingStart).getFullYear()}
          </span>
        </Box>
        <Box className="meeting-box">
          <Box className="name">{meeting.summary}</Box>
          <Box className="line"></Box>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Box className="time">
              <Typography variant="subtitle2">
                <b style={{ fontFamily: "Quicksand" }}>Start: </b> {start}
              </Typography>
              <Typography variant="subtitle2">
                <b style={{ fontFamily: "Quicksand" }}>End: </b>
                {end}
              </Typography>
            </Box>
            <Button
              className="btn"
              onClick={() => navigate(`/meeting/${meeting.id}`)}
            >
              Start
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CurrentMeetingCard;
