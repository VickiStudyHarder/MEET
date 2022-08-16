import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Button, Typography, Divider, Dialog } from "@mui/material";
import { IMeeting } from "../../types/meetings";
import MeetingsArrow from "../../assets/MeetingsArrow.png";
import EditMeetingForm from "./EditMeetingForm";

export interface IMeetingRow {
  meeting: IMeeting;
  getAllMeetings: any;
}

// function date
function add0(m: any) {
  return m < 10 ? "0" + m : m;
}

function format(input: any) {
  var time = new Date(input);
  var y = time.getFullYear();
  var m = time.getMonth() + 1;
  var d = time.getDate();
  var h = time.getHours();
  var mm = time.getMinutes();
  var s = time.getSeconds();
  return (
    add0(d) +
    "/" +
    add0(m) +
    "/" +
    y +
    " " +
    add0(h) +
    ":" +
    add0(mm) +
    ":" +
    add0(s)
  );
}

const MeetingRow: React.FC<IMeetingRow> = ({ meeting, getAllMeetings }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleClose = () => {
    setOpen(false);
  };
  console.log("meeting:", meeting);
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "row", m: 2 }}>
        <Button onClick={() => navigate(`/meeting/${meeting.id}`)}>
          <Box sx={{ m: 4, borderRadius: 20 }}>
            <img
              src={"./meeting.png"}
              alt="YourMeetingImage"
              style={{
                borderRadius: 20,
                boxShadow: "-15px 30px 30px rgba(8, 20, 32, 0.2)",
              }}
            />
          </Box>
        </Button>
        <Box
          sx={{ display: "flex", flexGrow: 1, flexDirection: "column", m: 4 }}
        >
          <Box sx={{ display: "flex", flexDirection: "row", mt: 2 }}>
            <Typography
              sx={{ color: "#6001D3", mr: 4, fontWeight: "bold" }}
              style={{ fontFamily: "Quicksand" }}
            >
              {meeting?.notes?.length ? meeting.notes.length : "0"} Notes
            </Typography>
            <Typography style={{ fontFamily: "Quicksand" }}>
              Start at {format(meeting.meetingStart)}
            </Typography>
          </Box>
          <Typography
            variant="h4"
            sx={{ mt: 6 }}
            style={{ fontFamily: "Quicksand" }}
          >
            {meeting.summary}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignContent: "space-between",
              mt: 6,
            }}
          >
            <a href={meeting.googleCalendarId}>
              <Button
                sx={{
                  minWidth: "140px",
                  minHeight: "40px",
                  maxHeight: "40px",
                  maxWidth: "100px",
                  borderRadius: 5,
                  backgroundColor: "#6001D3",
                  color: "#FFFFFF",
                  fontSize: 12,
                  fontWeight: "semibold",
                  my: "auto",
                  mr: 2,
                }}
                variant="contained"
              >
                Join Meeting
              </Button>
            </a>
            <Button
              onClick={() => {
                setOpen(true);
              }}
              sx={{
                minWidth: "140px",
                minHeight: "40px",
                maxHeight: "40px",
                maxWidth: "100px",
                borderRadius: 5,
                backgroundColor: "#6001D3",
                color: "#FFFFFF",
                fontSize: 12,
                fontWeight: "semibold",
                my: "auto",
                ml: 2,
              }}
              variant="contained"
            >
              Edit Meeting
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            m: "auto",
            width: "20%",
            gap: "12px",
          }}
        >
          <Button
            sx={{ mx: "auto", width: "100%" }}
            style={{ justifyContent: "flex-end" }}
            onClick={() => {
              navigate(`/agenda/${meeting.id}`);
            }}
          >
            <Typography
              sx={{ color: "black", mr: 2 }}
              style={{ fontFamily: "Quicksand" }}
            >
              Agenda
            </Typography>
            <img
              src={MeetingsArrow}
              alt="meeting-arrow"
              width="40"
              height="40"
            />
          </Button>
          <Button
            sx={{ mx: "auto", width: "100%" }}
            style={{ justifyContent: "flex-end" }}
            onClick={() => {
              navigate(`/notes/${meeting.id}`);
            }}
          >
            <Typography
              sx={{ color: "black", mr: 2 }}
              style={{ fontFamily: "Quicksand" }}
            >
              Notes
            </Typography>
            <img
              src={MeetingsArrow}
              alt="meeting-arrow"
              width="40"
              height="40"
            />
          </Button>
          <Button
            sx={{ mx: "auto", width: "100%" }}
            style={{ justifyContent: "flex-end" }}
            onClick={() => {
              navigate(`/todo/${meeting.id}`);
            }}
          >
            <Typography
              sx={{ color: "black", mr: 2 }}
              style={{ fontFamily: "Quicksand" }}
            >
              To Dos
            </Typography>
            <img
              src={MeetingsArrow}
              alt="meeting-arrow"
              width="40"
              height="40"
            />
          </Button>
          <Button
            sx={{ mx: "auto", width: "100%" }}
            style={{ justifyContent: "flex-end" }}
            onClick={() => {
              navigate(`/recording/${meeting.id}`);
            }}
          >
            <Typography
              sx={{ color: "black", mr: 2 }}
              style={{ fontFamily: "Quicksand" }}
            >
              Recording
            </Typography>
            <img
              src={MeetingsArrow}
              alt="meeting-arrow"
              width="40"
              height="40"
            />
          </Button>
        </Box>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        // sx={{ display: 'flex', flexGrow: 1 }}
        maxWidth="xl"
      >
        <EditMeetingForm
          setOpen={setOpen}
          handleGetMeeting={getAllMeetings}
          handleClose={handleClose}
          meeting={meeting}
        />
      </Dialog>
      <Divider variant="middle" sx={{ width: "100%" }} />
    </>
  );
};

export default MeetingRow;
