import React, { useState, useEffect } from "react";
import { Box, Rating, Typography, Divider, Button } from "@mui/material";
import { IMeetingAttendee } from "../../types/meetings";
import { rateMentor } from "../../api/users";

export interface IMentorMeetingRow {
  attendee: IMeetingAttendee;
}

const MentorMeetingRow: React.FC<IMentorMeetingRow> = ({ attendee }) => {
  const [value, setValue] = useState<number | null>(2);
  const [isRated, setIsRated] = useState(false);

  useEffect(() => {}, []);

  const submitRating = async () => {
    await rateMentor(value!, attendee.userId);
    setIsRated(true);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          flexDirection: "row",
          my: 4,
          mx: 12,
          maxHeight: "60px",
        }}
      >
        <Typography
          variant="h4"
          sx={{ display: "flex", m: "auto" }}
          style={{ fontFamily: "Quicksand" }}
        >
          {attendee?.user?.firstName} {attendee?.user?.firstName}
        </Typography>
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          sx={{
            m: "auto",
            display: "flex",
            flexGrow: 1,
            justifyContent: "center",
          }}
        />
        {isRated ? (
          <Button
            sx={{
              minWidth: "200px",
              minHeight: "40px",
              maxHeight: "40px",
              maxWidth: "100px",
              borderRadius: 5,
              backgroundColor: "#00b300",
              color: "#FFFFFF",
              fontSize: 12,
              my: "auto",
            }}
            variant="contained"
            style={{ fontFamily: "Quicksand" }}
          >
            Rating Submitted
          </Button>
        ) : (
          <Button
            sx={{
              minWidth: "200px",
              minHeight: "40px",
              maxHeight: "40px",
              maxWidth: "100px",
              borderRadius: 5,
              backgroundColor: "#ffd11a",
              color: "#FFFFFF",
              fontSize: 12,
              my: "auto",
              justifyContent: "center",
            }}
            variant="contained"
            onClick={submitRating}
            style={{ fontFamily: "Quicksand" }}
          >
            Submit Rating
          </Button>
        )}
      </Box>
      <Divider variant="middle" />
    </>
  );
};

export default MentorMeetingRow;
